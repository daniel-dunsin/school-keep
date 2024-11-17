import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/presentation/onboarding/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/storage.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    checkAuthState();
  }

  checkAuthState() async {
    final onboarded = await AppStorage.getBool(
      AppStorageKeys.onboarded,
    );

    if (onboarded != true) {
      context.goNamed(SplashRoutes.onboarding);
    } else {
      context.goNamed(AuthRoutes.signIn);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mainLight,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Image.asset(
            AppImages.logoWhite,
            width: 200,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}
