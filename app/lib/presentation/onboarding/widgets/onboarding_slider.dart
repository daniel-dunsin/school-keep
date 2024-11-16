// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/onboarding/placeholders/onboarding_placeholders.dart';
import 'package:flutter/material.dart';

class OnboardingSlider extends StatelessWidget {
  final PageController pageController;

  const OnboardingSlider({
    Key? key,
    required this.pageController,
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
      },
      controller: pageController,
      itemBuilder: (context, index) {
        final pageDetails = onboardingPages[index];
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [],
          ),
        );
      },
    );
  }

  _buildImage(String imagePath) {
    return SizedBox();
  }

  _buildTitle(String title) {}

  _buildDescription(String description) {}
}
