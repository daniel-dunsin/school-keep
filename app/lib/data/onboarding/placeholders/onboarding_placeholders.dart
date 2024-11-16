import 'package:app/data/onboarding/models/onboarding_model.dart';

final List<OnboardingModel> onboardingPages = <OnboardingModel>[
  OnboardingModel(
    lottieJson: "assets/animations/onboarding1.json",
    title: "Manage School Documents In One Place",
    desciption: "Easily upload, organize, and manage all your important academic documents in one place. Say goodbye to paperwork hassles.",
  ),
  OnboardingModel(
    lottieJson: "assets/animations/onboarding2.json",
    title: "Request and Track Clearance",
    desciption: "Submit your documents for clearance with just a few clicks. Stay updated with real-time tracking until your clearance is approved.",
  ),
  OnboardingModel(
    lottieJson: "assets/animations/onboarding3.json",
    title: "Get Verified With Ease",
    desciption: "Receive a secure QR code upon clearance approval. Verify and share your clearance details seamlessly.",
  )
];
