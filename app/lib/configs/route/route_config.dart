import 'package:app/presentation/auth/pages/confirm_forgot_password_otp.dart';
import 'package:app/presentation/auth/pages/forgot_password.dart';
import 'package:app/presentation/auth/pages/reset_password.dart';
import 'package:app/presentation/auth/pages/sign_in.dart';
import 'package:app/presentation/auth/pages/sign_up.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/presentation/onboarding/pages/onboarding.dart';
import 'package:app/presentation/onboarding/pages/splash.dart';
import 'package:app/presentation/onboarding/routes/routes.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final GlobalKey<NavigatorState> appNavKey = GlobalKey<NavigatorState>();

final goRouter = GoRouter(
  navigatorKey: appNavKey,
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
    GoRoute(
      path: AuthRoutes.signIn,
      name: AuthRoutes.signIn,
      pageBuilder: (context, state) {
        return MaterialPage(child: SignInScreen());
      },
    ),
    GoRoute(
      path: AuthRoutes.signUp,
      name: AuthRoutes.signUp,
      pageBuilder: (context, state) {
        return MaterialPage(child: SignUpScreen());
      },
    ),
    GoRoute(
      path: AuthRoutes.forgotPassword,
      name: AuthRoutes.forgotPassword,
      pageBuilder: (context, state) {
        return MaterialPage(child: ForgotPasswordScreen());
      },
    ),
    GoRoute(
      path: AuthRoutes.confirmForgotPassword,
      name: AuthRoutes.confirmForgotPassword,
      pageBuilder: (context, state) {
        final args = state.extra as Map;
        return MaterialPage(
          child: ConfirmForgotPasswordOtpScreen(
            email: args["email"],
          ),
        );
      },
    ),
    GoRoute(
      path: AuthRoutes.resetPassword,
      name: AuthRoutes.resetPassword,
      pageBuilder: (context, state) {
        final args = state.extra as Map;
        return MaterialPage(
          child: ResetPasswordScreen(
            tempToken: args["tempToken"],
          ),
        );
      },
    ),
  ],
);
