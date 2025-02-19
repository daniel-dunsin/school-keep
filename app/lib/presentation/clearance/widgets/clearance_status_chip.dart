import 'package:app/data/clearance/enums/clearance_enums.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ClearanceStatusChip extends StatelessWidget {
  final RequestClearanceStatus status;
  final double? fontSize;

  const ClearanceStatusChip({
    super.key,
    required this.status,
    this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    Color? color;

    switch (status) {
      case RequestClearanceStatus.IN_PROGRESS:
      case RequestClearanceStatus.COMPLETED:
        color = AppColors.success;
        break;
      case RequestClearanceStatus.REJECTED:
        color = AppColors.error;
        break;
      case RequestClearanceStatus.REQUESTED:
        color = Colors.blue;
        break;
      default:
        break;
    }

    return Container(
      padding: EdgeInsets.symmetric(vertical: 3, horizontal: 5),
      decoration: BoxDecoration(
        color: color,
      ),
      child: Text(
        status == RequestClearanceStatus.COMPLETED ? "${status.name.toUpperCase()} 🎉" : status.name.toUpperCase(),
        style: TextStyle(
          color: AppColors.white,
          fontSize: fontSize ?? 14.h,
        ),
      ),
    );
  }
}
