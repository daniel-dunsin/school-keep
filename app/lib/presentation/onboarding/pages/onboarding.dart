import 'package:app/data/onboarding/placeholders/onboarding_placeholders.dart';
import 'package:app/presentation/onboarding/widgets/onboarding_slider.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: OnboardingSlider(
                pageController: pageController,
              ),
            ),
            const SizedBox(height: 30),
            _buildPagesIndicator(),
            const SizedBox(height: 30),
            _buildNavigators(),
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

  _buildNavigators() {
    final lastPage = currentPage == onboardingPages.length - 1;
    return Padding(
      padding: EdgeInsets.fromLTRB(20, 0, 20, 30),
      child: Row(
        children: [
          Expanded(
            child: Text(
              "skip",
            ),
            flex: 1,
          ),
          Expanded(
            child: ContainedButton(
              width: double.maxFinite,
              height: 55,
              iconAlignment: IconAlignment.end,
              child: Visibility(
                visible: !lastPage,
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
