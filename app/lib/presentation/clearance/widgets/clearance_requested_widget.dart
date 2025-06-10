// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/clearance/models/student_clearance_status_model.dart';
import 'package:app/presentation/clearance/widgets/activities_list.dart';
import 'package:app/presentation/clearance/widgets/clearance_status_header.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';

class ClearanceRequestedWidget extends StatelessWidget {
  final StudentClearanceStatusModel clearanceStatus;

  const ClearanceRequestedWidget({
    Key? key,
    required this.clearanceStatus,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print(clearanceStatus.activities);
    return Scaffold(
      body: Padding(
        padding: AppStyles.defaultPagePadding,
        child: Column(
          children: [
            ClearanceStatusHeader(
              clearanceStatus: clearanceStatus,
            ),
            Expanded(
              child:
                  ActivitiesList(activities: clearanceStatus.activities ?? []),
            )
          ],
        ),
      ),
    );
  }
}
