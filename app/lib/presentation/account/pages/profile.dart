import 'package:app/configs/app_config.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/presentation/account/widgets/school_info_tile.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _defaultPadding = EdgeInsets.symmetric(vertical: 0, horizontal: 20).copyWith(bottom: 20);
  final user = getIt.get<User>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              ..._buildProfileInfo(),
            ],
          ),
        ),
      ),
    );
  }

  _buildHeader() {
    return Stack(
      children: [
        Container(
          height: 150,
          width: double.maxFinite,
          decoration: BoxDecoration(
            color: getColorScheme(context).surface,
          ),
        ),
        Container(
          width: double.maxFinite,
          margin: EdgeInsets.symmetric(vertical: 30, horizontal: 15),
          color: Colors.transparent,
          height: 250,
          child: Card(
            color: getColorScheme(context).primary,
            shadowColor: AppColors.white,
            child: Row(
              children: [
                Expanded(
                  child: Stack(
                    children: [
                      AppImage(
                        image: user.profilePicture,
                        width: double.maxFinite,
                        height: double.maxFinite,
                      ),
                      Container(
                        width: double.maxFinite,
                        height: double.maxFinite,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              Color.fromRGBO(0, 0, 0, 0.4),
                              Color.fromRGBO(0, 0, 0, 0.4),
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        top: 10,
                        left: 10,
                        child: IconButton(
                          onPressed: context.pop,
                          icon: Icon(
                            Icons.arrow_back,
                          ),
                        ),
                      ),
                    ],
                  ),
                  flex: 1,
                ),
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.all(15),
                    child: Stack(
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              "${user.firstName} ${user.lastName}",
                              style: getTextTheme(context).titleLarge,
                            ),
                            SizedBox(height: 20),
                            Text(
                              "${user.student?.matricNumber}",
                              style: getTextTheme(context).bodyMedium,
                            ),
                          ],
                        ),
                        Positioned(
                          child: CircleAvatar(
                            child: AppCircleAvatar(
                              image: user.school?.logo as String,
                            ),
                          ),
                          bottom: 0,
                          right: 0,
                        ),
                        Positioned(
                          top: 0,
                          right: 0,
                          child: GestureDetector(
                            onTap: () {
                              AppBottomSheet.display(
                                context,
                                bottomSheetContents: [
                                  Padding(
                                    padding: EdgeInsets.all(20),
                                    child: Column(
                                      children: [
                                        Text(
                                          "Update Profile",
                                          style: getTextTheme(context).titleLarge?.copyWith(
                                                color: getColorScheme(context).onPrimary,
                                              ),
                                        ),
                                        SizedBox(height: 30),
                                        Text(
                                          "Due to security and data-safety challenges, you can not edit your profile. Reach out to your school/department admin to handle that!",
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              );
                            },
                            child: Icon(
                              Icons.info_outline,
                              color: getColorScheme(context).onPrimary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  flex: 2,
                )
              ],
            ),
          ),
        )
      ],
    );
  }

  _buildProfileInfo() {
    return [
      Padding(
        padding: _defaultPadding,
        child: Text(
          "PERSONAL 🙂",
          style: getTextTheme(context).headlineLarge,
        ),
      ),
      _buildProfileTitleAndSubtitle(
        title: "Full Name",
        subtitleText: "${user.firstName} ${user.lastName}",
      ),
      _buildProfileTitleAndSubtitle(
        title: "Matric Number",
        subtitleText: "${user.student?.matricNumber}",
      ),
      _buildProfileTitleAndSubtitle(
        title: "Email Adress",
        subtitleText: "${user.email}",
      ),
      _buildProfileTitleAndSubtitle(
        title: "Phone Number",
        subtitleText: "${user.phoneNumber}",
      ),
      SizedBox(height: 20),
      Padding(
        padding: _defaultPadding,
        child: Text(
          "SCHOOL 🏫",
          style: getTextTheme(context).headlineLarge,
        ),
      ),
      _buildProfileTitleAndSubtitle(
        title: "School Name",
        subtitle: SchoolInfoTile(
          image: user.school?.logo as String,
          title: user.school?.name ?? "",
        ),
      ),
      _buildProfileTitleAndSubtitle(
        title: "Acronym",
        subtitleText: user.school?.acronym ?? "",
      ),
      _buildProfileTitleAndSubtitle(
        title: "Motto",
        subtitleText: user.school?.motto ?? "Not Recorded",
      ),
      if (user.school?.webUrl != null && user.school?.webUrl != "")
        _buildProfileTitleAndSubtitle(
          title: "Home Page",
          subtitle: GestureDetector(
            onTap: () {
              if (user.school?.webUrl != null) {
                launchUrl(
                  Uri.parse(
                    user.school?.webUrl as String,
                  ),
                );
              }
            },
            child: Text.rich(
              TextSpan(
                style: getTextTheme(context).labelSmall,
                children: [
                  TextSpan(
                    text: "Visit",
                    style: TextStyle(
                      color: getColorScheme(context).surface,
                    ),
                  ),
                  WidgetSpan(
                    alignment: PlaceholderAlignment.middle,
                    child: SizedBox(width: 5),
                  ),
                  WidgetSpan(
                    alignment: PlaceholderAlignment.middle,
                    child: Icon(
                      Icons.arrow_forward_outlined,
                      color: getColorScheme(context).surface,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      _buildProfileTitleAndSubtitle(
        title: "Department",
        subtitle: SchoolInfoTile(
          image: user.student?.department?.logo as String,
          title: user.student?.department?.name ?? "",
          subtitle: user.student?.department?.unionName ?? "",
        ),
      ),
      _buildProfileTitleAndSubtitle(
        title: "College/Faculty",
        subtitle: SchoolInfoTile(
          image: user.student?.department?.college?.logo as String,
          title: user.student?.department?.college?.name ?? "",
          subtitle: user.student?.department?.college?.unionName ?? "",
        ),
      ),
    ];
  }

  _buildProfileTitleAndSubtitle({
    required String title,
    String? subtitleText,
    Widget? subtitle,
  }) {
    if (subtitleText != null && subtitle != null) {
      throw ArgumentError("Cannot provide subtitleText and subtitle");
    }

    if (subtitleText == null && subtitle == null) {
      throw ArgumentError("Provide either subtitleText or subtitle");
    }

    return Padding(
      padding: _defaultPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: getTextTheme(context).titleLarge,
          ),
          SizedBox(height: 10),
          subtitleText != null
              ? Text(
                  subtitleText,
                  style: getTextTheme(context).bodySmall,
                )
              : subtitle!,
        ],
      ),
    );
  }
}
