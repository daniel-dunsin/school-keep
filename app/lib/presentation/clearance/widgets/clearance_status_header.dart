// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/clearance/enums/clearance_enums.dart';
import 'package:app/data/clearance/models/student_clearance_status_model.dart';
import 'package:app/presentation/clearance/widgets/clearance_status_chip.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ClearanceStatusHeader extends StatelessWidget {
  final StudentClearanceStatusModel clearanceStatus;

  const ClearanceStatusHeader({
    Key? key,
    required this.clearanceStatus,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.maxFinite,
          height: 150,
          padding: AppStyles.defaultPagePadding,
          decoration: BoxDecoration(
            color: AppColors.mainLight,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClearanceStatusChip(status: clearanceStatus.status),
              SizedBox(height: 10),
              if (clearanceStatus.status == RequestClearanceStatus.REQUESTED)
                Text(
                  "Date Requested: ${DateFormat.yMMMd().format(clearanceStatus.lastRequestedDate!)}",
                  style: getTextTheme(context).labelLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
              if (clearanceStatus.status == RequestClearanceStatus.REJECTED) ...[
                Text(
                  "Date Rejected: ${DateFormat.yMMMd().format(clearanceStatus.rejectionDate!)}",
                  style: getTextTheme(context).labelLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
                Text(
                  "Rejection Reason: ${clearanceStatus.rejectionReason}",
                  style: getTextTheme(context).labelLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
              ],
              if (clearanceStatus.status == RequestClearanceStatus.IN_PROGRESS)
                Text(
                  "Date Approved: ${DateFormat.yMMMd().format(clearanceStatus.approvalDate!)}",
                  style: getTextTheme(context).labelLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
              if (clearanceStatus.status == RequestClearanceStatus.COMPLETED)
                Text(
                  "Date Completed: ${DateFormat.yMMMd().format(clearanceStatus.completionDate!)}",
                  style: getTextTheme(context).labelLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
            ],
          ),
        ),
        SizedBox(height: 20),
        Divider(),
        SizedBox(height: 20),
      ],
    );
  }
}
