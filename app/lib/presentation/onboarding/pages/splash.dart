import 'package:app/configs/app_config.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/domain/student/student_repository.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/presentation/home/routes/routes.dart';
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

  Future<bool> getUser() async {
    final accessToken = await AppStorage.getString(AppStorageKeys.accessToken);

    if (accessToken == null) {
      return false;
    }

    try {
      final response = await getIt.get<StudentRepository>().getUser();
      final userMap = response["data"] as Map?;

      if (response == null || userMap == null) {
        return false;
      }

      if (getIt.isRegistered<User>()) {
        getIt.unregister<User>();
      }

      getIt.registerSingleton<User>(User.fromMap(userMap));

      print(userMap["school"].runtimeType);

      return true;
    } catch (e) {
      return false;
    }
  }

  checkAuthState() async {
    final onboarded = await AppStorage.getBool(
      AppStorageKeys.onboarded,
    );

    if (onboarded != true) {
      context.goNamed(SplashRoutes.onboarding);
    } else {
      final isAuth = await getUser();
      if (isAuth) {
        context.goNamed(HomeRoutes.home);
      } else {
        context.goNamed(AuthRoutes.signIn);
      }
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
