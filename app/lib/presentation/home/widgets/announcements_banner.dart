import 'package:app/configs/app_config.dart';
import 'package:app/data/announcements/models/announcement_model.dart';
import 'package:app/presentation/home/blocs/announcements_bloc/announcements_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shimmer/shimmer.dart';

class AnnouncementsBanner extends StatefulWidget {
  const AnnouncementsBanner({super.key});

  @override
  State<AnnouncementsBanner> createState() => _AnnouncementsBannerState();
}

class _AnnouncementsBannerState extends State<AnnouncementsBanner> {
  @override
  void initState() {
    getIt.get<AnnouncementsBloc>().add(GetAnnouncementsRequested());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AnnouncementsBloc, AnnouncementsState>(
      bloc: getIt.get<AnnouncementsBloc>(),
      builder: (context, state) {
        return SizedBox(
          height: 200,
          width: double.maxFinite,
          child: Visibility(
            child: Visibility(
              child: _buildAnnouncements(
                announcements: state is GetAnnouncementsSuccess ? state.announcements : [],
              ),
              replacement: _buildNoAnnouncement(),
              visible: state is GetAnnouncementsSuccess && state.announcements.length > 0,
            ),
            replacement: _buildAnnouncementShimmer(),
            visible: state is! GetAnnouncementsLoading,
          ),
        );
      },
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
            style: getTextTheme(context).headlineLarge?.copyWith(
                  color: AppColors.white,
                ),
          ),
          const SizedBox(height: 5),
          Text(
            "No announcement for now.",
            style: getTextTheme(context).bodyLarge?.copyWith(
                  color: AppColors.white,
                ),
          ),
          const SizedBox(height: 20),
          ContainedButton(
            height: 40,
            width: 120,
            child: Text("See more"),
            backgroundColor: getColorScheme(context).primary,
            foregroundColor: getColorScheme(context).onPrimary,
            icon: Icon(
              Icons.chevron_right,
              color: getColorScheme(context).onPrimary,
            ),
            iconAlignment: IconAlignment.end,
            padding: EdgeInsets.all(10),
          )
        ],
      ),
    );
  }

  _buildAnnouncements({List<AnnouncementModel>? announcements}) {
    return CarouselSlider(
      items: (announcements ?? []).map(
        (announcement) {
          return Container(
            margin: EdgeInsets.all(5.0),
            child: Stack(
              children: [
                Positioned(
                  child: (announcement.image != null
                      ? AppImage(
                          image: announcement.image!,
                          width: double.maxFinite,
                          height: double.maxFinite,
                        )
                      : Container(
                          width: double.maxFinite,
                          height: double.maxFinite,
                          color: getColorScheme(context).surface,
                        )),
                  bottom: 0.0,
                  left: 0.0,
                  right: 0.0,
                  top: 0.0,
                ),
                Positioned(
                  bottom: 0.0,
                  left: 0.0,
                  right: 0.0,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Color.fromARGB(200, 0, 0, 0),
                          announcement.image != null ? Color.fromARGB(74, 0, 0, 0) : Color.fromARGB(0, 0, 0, 0),
                        ],
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                      ),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          announcement.title,
                          style: getTextTheme(context).titleLarge?.copyWith(
                                color: AppColors.white,
                              ),
                        ),
                        ...(announcement.content != null
                            ? [
                                SizedBox(
                                  height: 10,
                                ),
                                Text(
                                  announcement.content!.length > 50 ? "${announcement.content!.substring(0, 50)}..." : announcement.content!,
                                  style: getTextTheme(context).bodySmall?.copyWith(
                                        color: AppColors.white,
                                      ),
                                )
                              ]
                            : [])
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ).toList(),
      options: CarouselOptions(
        autoPlay: true,
        autoPlayAnimationDuration: Duration(
          seconds: 2,
        ),
        enlargeCenterPage: true,
        enableInfiniteScroll: false,
        viewportFraction: 1,
      ),
    );
  }
}
