import 'package:app/configs/route/route_config.dart';
import 'package:app/shared/themes/light.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

void main() {
  final WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);

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
    Future.delayed(Duration(seconds: 5), FlutterNativeSplash.remove);
  }

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: Size(430, 932),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, _) {
        return MaterialApp.router(
          title: "School Keep",
          routerDelegate: goRouter.routerDelegate,
          routeInformationParser: goRouter.routeInformationParser,
          routeInformationProvider: goRouter.routeInformationProvider,
          theme: lightTheme,
          darkTheme: lightTheme,
        );
      },
    );
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
