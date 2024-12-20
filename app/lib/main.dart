import 'package:app/configs/app_config.dart';
import 'package:app/configs/route/route_config.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/cubits/app_cubit.dart';
import 'package:app/shared/cubits/app_state.dart';
import 'package:app/shared/themes/dark.dart';
import 'package:app/shared/themes/light.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:toastification/toastification.dart';

void main() {
  final WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  setupApp();

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    startApp();
  }

  void startApp() async {
    getIt.get<AppCubit>().setAppTheme();
    Future.delayed(Duration(seconds: 1), FlutterNativeSplash.remove);
  }

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: Size(430, 932),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, _) {
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(textScaler: TextScaler.linear(1)),
          child: ToastificationWrapper(
            child: BlocConsumer<AppCubit, AppState>(
                bloc: getIt.get<AppCubit>(),
                listener: (context, state) {
                  if (state.appTheme != null) {
                    setStatusBarTheme(context, state.appTheme!);
                  } else {
                    final platformBrightness = MediaQuery.of(context).platformBrightness;

                    platformBrightness == Brightness.light ? setStatusBarTheme(context, AppTheme.light) : setStatusBarTheme(context, AppTheme.dark);
                  }
                },
                builder: (context, state) {
                  final AppTheme? appTheme = state.appTheme;

                  final ThemeMode themeMode = appTheme == null
                      ? ThemeMode.system
                      : appTheme == AppTheme.light
                          ? ThemeMode.light
                          : ThemeMode.dark;

                  return MaterialApp.router(
                    title: "School Keep",
                    routerConfig: goRouter,
                    theme: lightTheme,
                    darkTheme: darkTheme,
                    themeMode: themeMode,
                  );
                }),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);

    switch (state) {
      case AppLifecycleState.resumed:
        debugPrint("[LifeCycle]: App Resumed");
        break;
      case AppLifecycleState.hidden:
        debugPrint("[LifeCycle]: App Hidden");
        break;
      case AppLifecycleState.paused:
        debugPrint("[LifeCycle]: App Paused");
        break;
      case AppLifecycleState.detached:
        debugPrint("[LifeCycle]: App Detached");
        break;
      case AppLifecycleState.inactive:
        debugPrint("[LifeCycle]: App Inactive");
        break;
    }
  }
}
