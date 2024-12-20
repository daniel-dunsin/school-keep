import 'package:app/presentation/account/pages/account.dart';
import 'package:app/presentation/account/pages/profile.dart';
import 'package:app/presentation/account/routes/routes.dart';
import 'package:app/presentation/activity/pages/activities.dart';
import 'package:app/presentation/activity/routes/routes.dart';
import 'package:app/presentation/auth/pages/confirm_forgot_password_otp.dart';
import 'package:app/presentation/auth/pages/forgot_password.dart';
import 'package:app/presentation/auth/pages/reset_password.dart';
import 'package:app/presentation/auth/pages/sign_in.dart';
import 'package:app/presentation/auth/pages/sign_up.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/presentation/clearance/pages/clearance.dart';
import 'package:app/presentation/clearance/routes/routes.dart';
import 'package:app/presentation/documents/pages/folders.dart';
import 'package:app/presentation/documents/pages/folder_details.dart';
import 'package:app/presentation/documents/routes/routes.dart';
import 'package:app/presentation/home/pages/home.dart';
import 'package:app/presentation/home/routes/routes.dart';
import 'package:app/presentation/onboarding/pages/onboarding.dart';
import 'package:app/presentation/onboarding/pages/splash.dart';
import 'package:app/presentation/onboarding/routes/routes.dart';
import 'package:app/shared/widgets/dashboard_layout.dart';
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
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) => DashboardLayout(shell: navigationShell),
      branches: [
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: HomeRoutes.home,
              name: HomeRoutes.home,
              pageBuilder: (context, state) {
                return MaterialPage(
                  child: HomeScreen(),
                );
              },
            )
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: ActivityRoutes.index,
              name: ActivityRoutes.index,
              pageBuilder: (context, state) {
                return MaterialPage(
                  child: ActivitiesScreen(),
                );
              },
            )
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: ClearanceRoutes.index,
              name: ClearanceRoutes.index,
              pageBuilder: (context, state) {
                return MaterialPage(
                  child: ClearanceScreen(),
                );
              },
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: DocumentRoutes.index,
              name: DocumentRoutes.index,
              pageBuilder: (context, state) {
                return MaterialPage(
                  child: DocumentsScreen(),
                );
              },
            ),
            GoRoute(
              path: DocumentRoutes.folderDetail,
              name: DocumentRoutes.folderDetail,
              pageBuilder: (context, state) {
                final Map args = state.extra as Map;
                return MaterialPage(
                  child: FolderDetailScreen(
                    folder: args["folder"],
                  ),
                );
              },
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: AccountRoutes.index,
              name: AccountRoutes.index,
              pageBuilder: (context, state) {
                return MaterialPage(
                  child: AccountScreen(),
                );
              },
            ),
            GoRoute(
              path: AccountRoutes.profile,
              name: AccountRoutes.profile,
              pageBuilder: (context, state) {
                return MaterialPage(
                  child: ProfileScreen(),
                );
              },
            )
          ],
        ),
      ],
    ),
  ],
);
