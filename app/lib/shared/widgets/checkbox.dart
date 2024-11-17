// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class AppCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?>? onChanged;
  final String? label;

  const AppCheckbox({
    Key? key,
    this.value = false,
    this.onChanged,
    this.label,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Checkbox(
          value: value,
          onChanged: onChanged,
          semanticLabel: label,
          fillColor: WidgetStateProperty.all(
            value ? getColorSchema(context).surface : Colors.transparent,
          ),
          checkColor: AppColors.white,
          shape: RoundedRectangleBorder(),
        ),
        Visibility(
          child: Text(
            label ?? "",
            style: getTextTheme(context).labelMedium,
          ),
          visible: label != null,
        )
      ],
    );
  }
}
