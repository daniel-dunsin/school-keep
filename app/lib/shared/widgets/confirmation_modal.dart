// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';

class ConfirmationModal extends StatelessWidget {
  final String title;
  final String? content;
  final VoidCallback onNo;
  final VoidCallback onYes;

  const ConfirmationModal({
    Key? key,
    required this.title,
    this.content,
    required this.onNo,
    required this.onYes,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        title,
        style: TextStyle(
          color: getColorScheme(context).onPrimary,
        ),
      ),
      content: content != null
          ? Text(
              content ?? "",
              style: TextStyle(
                color: getColorScheme(context).onPrimary,
              ),
            )
          : null,
      actions: [
        TextButton(
          onPressed: onNo,
          child: Text(
            "No",
            style: getTextTheme(context).bodySmall,
          ),
        ),
        ContainedButton(
          width: 80,
          height: 10,
          padding: EdgeInsets.all(10),
          child: Text(
            "Yes",
            style: getTextTheme(context).bodySmall?.copyWith(
                  color: AppColors.white,
                ),
          ),
          onPressed: onYes,
        ),
      ],
    );
  }
}
