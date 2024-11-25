import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class AnnouncementsBanner extends StatefulWidget {
  const AnnouncementsBanner({super.key});

  @override
  State<AnnouncementsBanner> createState() => _AnnouncementsBannerState();
}

class _AnnouncementsBannerState extends State<AnnouncementsBanner> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200,
      width: double.maxFinite,
      child: _buildNoAnnouncement(),
    );
  }

  _buildAnnouncementShimmer() {
    return Shimmer.fromColors(
      child: Container(
        width: double.maxFinite,
        height: double.maxFinite,
        color: Colors.white,
      ),
      baseColor: AppStyles.shimmerBaseColor,
      highlightColor: AppStyles.shipmmerHighlightColor,
    );
  }

  _buildNoAnnouncement() {
    return Container(
      width: double.maxFinite,
      height: double.maxFinite,
      color: getColorScheme(context).surface,
      padding: EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "You're caught up 😀",
            style: getTextTheme(context).headlineLarge,
          ),
          const SizedBox(height: 5),
          Text("No announcement for now."),
          const SizedBox(height: 20),
          ContainedButton(
            height: 40,
            width: 120,
            child: Text("See more"),
            backgroundColor: getColorScheme(context).primary,
            foregroundColor: getColorScheme(context).onPrimary,
            icon: Icon(Icons.chevron_right),
            iconAlignment: IconAlignment.end,
            padding: EdgeInsets.all(10),
          )
        ],
      ),
    );
  }

  _buildAnnouncements() {}
}
