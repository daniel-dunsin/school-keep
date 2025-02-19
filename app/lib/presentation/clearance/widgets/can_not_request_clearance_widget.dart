// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/clearance/models/student_clearance_status_model.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class CanNotRequestClearanceWidget extends StatelessWidget {
  final StudentClearanceStatusModel clearanceStatus;

  const CanNotRequestClearanceWidget({
    Key? key,
    required this.clearanceStatus,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              AppImages.noFolder,
              width: 200,
              height: 200,
              fit: BoxFit.contain,
            ),
            SizedBox(height: 20),
            Text(
              clearanceStatus.message,
              style: getTextTheme(context).titleLarge,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
