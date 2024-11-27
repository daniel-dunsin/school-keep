import 'package:app/configs/app_config.dart';
import 'package:app/configs/route/route_config.dart';
import 'package:app/shared/themes/dark.dart';
import 'package:app/shared/themes/light.dart';
import 'package:flutter/material.dart';
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
            child: MaterialApp.router(
              title: "School Keep",
              routerConfig: goRouter,
              theme: lightTheme,
              darkTheme: darkTheme,
            ),
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
