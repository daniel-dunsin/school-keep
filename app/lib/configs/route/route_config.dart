import 'package:app/presentation/onboarding/pages/onboarding.dart';
import 'package:app/presentation/onboarding/pages/splash.dart';
import 'package:app/presentation/onboarding/routes/routes.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final goRouter = GoRouter(
  initialLocation: SplashRoutes.splashScreen,
  routes: [
    GoRoute(
      name: SplashRoutes.splashScreen,
      path: SplashRoutes.splashScreen,
      pageBuilder: (context, state) {
        return MaterialPage(child: SplashScreen());
      },
    ),
    GoRoute(
      name: SplashRoutes.onboarding,
      path: SplashRoutes.onboarding,
      pageBuilder: (context, state) {
        return MaterialPage(child: OnboardingScreen());
      },
    ),
  ],
);
