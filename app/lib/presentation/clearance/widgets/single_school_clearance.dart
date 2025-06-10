import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/enums/clearance_enums.dart';
import 'package:app/data/clearance/models/school_clearance.dart';
import 'package:app/data/clearance/models/student_clearance_model.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit.dart';
import 'package:app/presentation/clearance/pages/submit_clearance_documents.dart';
import 'package:app/presentation/clearance/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SingleSchoolClearance extends StatefulWidget {
  final SchoolClearanceModel clearance;
  final List<String> requiredSchoolClearancesIds;
  final List<StudentSubClearanceModel> studentSubmittedClearances;

  const SingleSchoolClearance({
    super.key,
    required this.requiredSchoolClearancesIds,
    required this.studentSubmittedClearances,
    required this.clearance,
  });

  @override
  State<SingleSchoolClearance> createState() => _SingleSchoolClearanceState();
}

class _SingleSchoolClearanceState extends State<SingleSchoolClearance> {
  _openDocumentSelector() {
    showGeneralDialog(
      context: context,
      pageBuilder: (context, animation, animation_) {
        getIt.get<SubmitClearanceCubit>().init(widget.clearance);
        return SubmitClearanceDocumentsScreen(
          schoolClearance: widget.clearance,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.maxFinite,
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
          color: getColorScheme(context).secondary,
          border: Border.all(
              color: getColorScheme(context).onSecondary.withAlpha(50))),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.clearance.clearanceName,
                style: getTextTheme(context).titleMedium,
              ),
              SizedBox(
                width: 30,
              ),
              _buildIcon(),
            ],
          ),
          studentClearance != null ? _submissionExists() : _noSubmission()
        ],
      ),
    );
  }

  StudentSubClearanceModel? get studentClearance {
    return widget.studentSubmittedClearances
        .where((c) =>
            (c.schoolClearanceId ?? c.clearance?.id) == widget.clearance.id)
        .firstOrNull;
  }

  Widget _buildIcon() {
    if (studentClearance == null) return SizedBox();

    final Color bgColor =
        studentClearance!.status == StudentClearanceStatus.Requested
            ? getColorScheme(context).surface
            : studentClearance!.status == StudentClearanceStatus.Rejected
                ? getColorScheme(context).error
                : AppColors.success;

    final IconData icon =
        studentClearance!.status == StudentClearanceStatus.Requested
            ? Icons.question_mark_rounded
            : studentClearance!.status == StudentClearanceStatus.Approved
                ? Icons.check_circle_outline
                : Icons.close;

    return Icon(
      icon,
      color: bgColor,
    );
  }

  Widget _noSubmission() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 10,
        ),
        Text("No submission yet",
            style: getTextTheme(context)
                .labelMedium
                ?.copyWith(color: getColorScheme(context).error)),
        (widget.clearance.requiredDocuments ?? []).isNotEmpty
            ? Text(
                "Required Documents: ${widget.clearance.requiredDocuments?.map((doc) => doc).join(", ")}")
            : SizedBox(),
        SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ...(widget.clearance.paymentRequired
                ? [
                    Expanded(
                      child: Text("Fee: ${formatNaira(widget.clearance.fee)}"),
                    ),
                    SizedBox(width: 30),
                  ]
                : [
                    Spacer(),
                  ]),
            Expanded(
              child: ContainedButton(
                onPressed: _openDocumentSelector,
                width: 200,
                height: 20,
                padding: EdgeInsets.all(10),
                child: Text("Submit"),
              ),
            )
          ],
        ),
      ],
    );
  }

  Widget _submissionExists() {
    final Color statusColor =
        studentClearance!.status == StudentClearanceStatus.Approved
            ? AppColors.success
            : studentClearance!.status == StudentClearanceStatus.Rejected
                ? AppColors.error
                : getColorScheme(context).surface;

    final dateText = studentClearance!.status == StudentClearanceStatus.Approved
        ? "Date Approved: ${formatDate(studentClearance!.approvalDate!)}"
        : studentClearance!.status == StudentClearanceStatus.Rejected
            ? "Date Rejected: ${formatDate(studentClearance!.rejectionDate!)}"
            : "Date Requested: ${formatDate(studentClearance!.lastRequestDate!)}";

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 10,
        ),
        Text.rich(
          TextSpan(
            children: [
              TextSpan(text: "Status: "),
              TextSpan(
                text: studentClearance!.status?.name,
                style: TextStyle(color: statusColor),
              ),
            ],
          ),
        ),
        SizedBox(height: 5),
        Text(dateText),
        SizedBox(height: 5),
        studentClearance?.status == StudentClearanceStatus.Rejected &&
                studentClearance?.rejectionReason?.isNotEmpty == true
            ? Text("Rejection Reason: ${studentClearance!.rejectionReason}")
            : SizedBox(),
        (widget.clearance.requiredDocuments ?? []).isNotEmpty
            ? Text(
                "Required Documents: ${widget.clearance.requiredDocuments?.map((doc) => doc).join(", ")}")
            : SizedBox(),
        SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ...(widget.clearance.paymentRequired
                ? [
                    Expanded(
                      child: Text("Fee: ${formatNaira(widget.clearance.fee)}"),
                    ),
                    SizedBox(width: 30),
                  ]
                : [Spacer()]),
            Expanded(
              child: ContainedButton(
                onPressed: () {
                  GoRouter.of(context).pushNamed(
                    ClearanceRoutes.activities,
                    extra: {
                      "studentClearance": studentClearance,
                    },
                  );
                },
                width: 200,
                height: 20,
                padding: EdgeInsets.all(10),
                child: Text("View"),
              ),
            )
          ],
        ),
      ],
    );
  }
}
