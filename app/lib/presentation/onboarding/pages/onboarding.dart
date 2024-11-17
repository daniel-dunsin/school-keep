import 'package:app/data/onboarding/placeholders/onboarding_placeholders.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/presentation/onboarding/widgets/onboarding_slider.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/storage.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  late PageController pageController;
  int currentPage = 0;

  @override
  void initState() {
    super.initState();
    pageController = PageController();
  }

  @override
  void dispose() {
    super.dispose();
    pageController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: OnboardingSlider(
                pageController: pageController,
                onPageChanged: (page) {
                  setState(() {
                    currentPage = page;
                  });
                },
              ),
            ),
            const SizedBox(height: 30),
            _buildPagesIndicator(),
            const SizedBox(height: 30),
            _buildNavigators(context),
          ],
        ),
      ),
    );
  }

  _buildPagesIndicator() {
    return Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(
          onboardingPages.length,
          (page) {
            return Container(
              width: 10.sp,
              height: 10.sp,
              margin: EdgeInsets.symmetric(vertical: 0, horizontal: 5),
              decoration: BoxDecoration(
                color: page == currentPage ? AppColors.mainLight : AppColors.mainExtraLight,
                borderRadius: BorderRadius.circular(50),
              ),
            );
          },
        ),
      ),
    );
  }

  _buildNavigators(BuildContext context) {
    final lastPage = currentPage == onboardingPages.length - 1;

    void endOnboarding() async {
      await AppStorage.saveBool(
        key: AppStorageKeys.onboarded,
        value: true,
      );
      context.goNamed(AuthRoutes.signUp);
    }

    return Padding(
      padding: EdgeInsets.fromLTRB(20, 0, 20, 30),
      child: Row(
        children: [
          Expanded(
            child: GestureDetector(
              onTap: endOnboarding,
              child: Text(
                "skip",
              ),
            ),
            flex: 1,
          ),
          Expanded(
            child: ContainedButton(
              width: double.maxFinite,
              height: 55,
              iconAlignment: IconAlignment.end,
              onPressed: () {
                if (currentPage != onboardingPages.length - 1) {
                  pageController.nextPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeInOut,
                  );
                } else {
                  endOnboarding();
                }
              },
              child: Visibility(
                visible: lastPage,
                replacement: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Icon(
                      Icons.arrow_forward_sharp,
                      size: 20,
                    )
                  ],
                ),
                child: Text("Register"),
              ),
            ),
            flex: 3,
          ),
        ],
      ),
    );
  }
}
