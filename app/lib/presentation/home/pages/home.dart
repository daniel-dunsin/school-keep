import 'package:app/configs/app_config.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/presentation/home/widgets/announcements_banner.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:app/shared/widgets/status_render.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final user = getIt.get<User>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppStyles.defaultPagePadding,
          child: Column(
            children: [
              _buildHeader(),
              SizedBox(height: 30),
              AnnouncementsBanner(),
            ],
          ),
        ),
      ),
    );
  }

  _buildHeader() {
    return Row(
      children: [
        Expanded(
          child: ListTile(
            leading: AppCircleAvatar(image: user.profilePicture),
            contentPadding: EdgeInsets.all(0),
            isThreeLine: true,
            title: Text(
              "Welcome, ${user.firstName} 👋🏽",
              overflow: TextOverflow.ellipsis,
            ),
            subtitle: Text.rich(
              TextSpan(
                style: getTextTheme(context).labelSmall,
                children: [
                  TextSpan(text: "Status: "),
                  WidgetSpan(
                    alignment: PlaceholderAlignment.middle,
                    child: StudentStatusWidget(
                      status: user.student!.status,
                      fontSize: getTextTheme(context).labelSmall?.fontSize,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        SizedBox(width: 50),
        AppCircleAvatar(
          image: user.school?.logo as String,
        )
      ],
    );
  }
}
