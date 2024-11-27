// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/announcements/enums/announcement_enums.dart';
import 'package:app/data/announcements/models/announcement_model.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

class AnnouncementDetails extends StatelessWidget {
  final AnnouncementModel announcement;

  const AnnouncementDetails({
    Key? key,
    required this.announcement,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: FractionallySizedBox(
        widthFactor: .9,
        heightFactor: .8,
        child: Container(
          width: double.maxFinite,
          height: double.maxFinite,
          color: getColorScheme(context).primary,
          child: SingleChildScrollView(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(context),
                const SizedBox(height: 10),
                _buildImage(),
                const SizedBox(height: 10),
                _buildTitle(context),
                const SizedBox(height: 10),
                _buildContent(context),
                const SizedBox(height: 10),
                _buildDestination(context),
                const SizedBox(height: 10),
                _buildTimeline(context),
                const SizedBox(height: 30),
                _buildCloseButton(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  _buildHeader(BuildContext context) {
    return Align(
      alignment: Alignment.centerRight,
      child: IconButton(
        onPressed: context.pop,
        icon: Icon(
          Icons.close_outlined,
          color: getColorScheme(context).onPrimary,
        ),
      ),
    );
  }

  _buildImage() {
    return announcement.image != null
        ? AppImage(
            image: announcement.image!,
            width: double.maxFinite,
            height: 200,
          )
        : SizedBox.shrink();
  }

  _buildTitle(BuildContext context) {
    return Text(
      announcement.title,
      style: getTextTheme(context).titleLarge,
    );
  }

  _buildContent(BuildContext context) {
    return Text(
      announcement.content ?? "",
      style: getTextTheme(context).bodySmall,
    );
  }

  _buildDestination(BuildContext context) {
    return Text.rich(
      TextSpan(
        style: getTextTheme(context).bodySmall,
        children: [
          TextSpan(text: "Concerned Students: "),
          TextSpan(
            text: announcement.destinationType == AnnouncementDestination.General
                ? "All Students"
                : announcement.destinationType == AnnouncementDestination.Departments
                    ? announcement.department!.unionName
                    : announcement.college!.unionName,
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  _buildTimeline(BuildContext context) {
    return Text.rich(
      TextSpan(
        style: getTextTheme(context).bodySmall,
        children: [
          TextSpan(text: "Timeline:"),
          WidgetSpan(
            child: SizedBox(width: 5),
          ),
          TextSpan(
            style: TextStyle(fontWeight: FontWeight.bold),
            text: '${DateFormat.yMMMd().format(
              announcement.startDate,
            )} - ${DateFormat.yMMMd().format(
              announcement.endDate,
            )}',
          ),
        ],
      ),
    );
  }

  _buildCloseButton(BuildContext context) {
    return ContainedButton(
      onPressed: context.pop,
      child: Text("Close"),
      width: double.maxFinite,
      height: 30,
    );
  }
}
