// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/clearance/models/student_clearance_status_model.dart';
import 'package:app/presentation/clearance/widgets/clearance_status_header.dart';
import 'package:app/presentation/clearance/widgets/single_school_clearance.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class ClearanceInProgressWidget extends StatefulWidget {
  final StudentClearanceStatusModel clearanceStatus;
  const ClearanceInProgressWidget({
    Key? key,
    required this.clearanceStatus,
  }) : super(key: key);

  @override
  State<ClearanceInProgressWidget> createState() =>
      _ClearanceInProgressWidgetState();
}

class _ClearanceInProgressWidgetState extends State<ClearanceInProgressWidget> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: AppStyles.defaultPagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            ClearanceStatusHeader(clearanceStatus: widget.clearanceStatus),
            _buildSchoolClearanceList(),
          ],
        ),
      ),
    );
  }

  _buildSchoolClearanceList() {
    final clearances = widget.clearanceStatus.allSchoolClearances!;

    return Column(
      children: [
        for (int i = 0; i < clearances.length; i++) ...[
          SingleSchoolClearance(
              requiredSchoolClearancesIds:
                  widget.clearanceStatus.requiredSchoolClearancesIds ?? [],
              studentSubmittedClearances:
                  widget.clearanceStatus.studentSubmittedClearances ?? [],
              clearance: clearances[i]),
          SizedBox(
            height: 20,
          )
        ]
      ],
    );
  }
}
