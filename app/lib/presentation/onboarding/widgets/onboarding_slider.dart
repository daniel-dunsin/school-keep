import 'package:app/data/onboarding/placeholders/onboarding_placeholders.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class OnboardingSlider extends StatelessWidget {
  final PageController pageController;
  final Function(int page) onPageChanged;

  const OnboardingSlider({
    Key? key,
    required this.pageController,
    required this.onPageChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PageView.builder(
      itemCount: onboardingPages.length,
      onPageChanged: (page) {
        pageController.animateToPage(
          page,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeOutCubic,
        );
        onPageChanged(page);
      },
      controller: pageController,
      itemBuilder: (context, index) {
        final pageDetails = onboardingPages[index];
        return Center(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                _buildImage(pageDetails.image),
                SizedBox(height: 20),
                _buildTitle(context: context, title: pageDetails.title),
                SizedBox(height: 10),
                _buildDescription(context: context, description: pageDetails.desciption),
              ],
            ),
          ),
        );
      },
    );
  }

  _buildImage(String imagePath) {
    return Image.asset(
      imagePath,
      fit: BoxFit.contain,
      width: 100.sw,
      height: 260,
    );
  }

  _buildTitle({required BuildContext context, required String title}) {
    return Text(
      title,
      textAlign: TextAlign.center,
      style: getTextTheme(context).headlineLarge,
    );
  }

  _buildDescription({required BuildContext context, required String description}) {
    return Text(
      description,
      textAlign: TextAlign.center,
      style: getTextTheme(context).bodySmall,
    );
  }
}
