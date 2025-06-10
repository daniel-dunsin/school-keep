import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/models/clearance_activity_model.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ActivitiesList extends StatelessWidget {
  final List<ClearanceActivityModel> activities;
  const ActivitiesList({super.key, required this.activities});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: (context, index) {
        return _buildActivityItem(
          context,
          item: activities[index],
          lastItem: index == activities.length - 1,
        );
      },
      itemCount: activities.length,
    );
  }

  _buildActivityItem(BuildContext context,
      {required ClearanceActivityModel item, required bool lastItem}) {
    final loggedInUser = getIt.get<User>();
    final isYou = loggedInUser.id == item.actor?.id;
    final user = isYou ? loggedInUser : item.actor!;

    return Column(
      children: [
        ListTile(
          contentPadding: EdgeInsets.symmetric(horizontal: 0, vertical: 10),
          titleAlignment: ListTileTitleAlignment.top,
          isThreeLine: true,
          leading: AppCircleAvatar(image: user.profilePicture),
          title: Text(
            "${isYou ? "You" : '${user.firstName} ${user.lastName}'} ${item.content}",
            style: getTextTheme(context).bodyLarge,
          ),
          subtitle: Text(
            DateFormat.yMMMd().format(item.createdAt),
            style: getTextTheme(context).labelSmall,
          ),
        )
      ],
    );
  }
}
