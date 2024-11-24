import 'package:app/data/student/enums/student_enums.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class StudentStatusWidget extends StatelessWidget {
  final StudentStatus status;
  final double? fontSize;

  const StudentStatusWidget({
    super.key,
    required this.status,
    this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    Color? color;

    switch (status) {
      case StudentStatus.active:
      case StudentStatus.cleared:
        color = AppColors.success;
        break;
      case StudentStatus.suspended:
        color = AppColors.error;
        break;
    }

    return Container(
      padding: EdgeInsets.symmetric(vertical: 3, horizontal: 5),
      decoration: BoxDecoration(
        color: color,
      ),
      child: Text(
        status.name.toUpperCase(),
        style: TextStyle(
          color: AppColors.white,
          fontSize: fontSize ?? 14.h,
        ),
      ),
    );
  }
}
