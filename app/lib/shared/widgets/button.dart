// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';

class ContainedButton extends StatelessWidget {
  final Widget? child;
  final VoidCallback? onPressed;
  final Widget? icon;
  final double? width;
  final double? height;
  final IconAlignment? iconAlignment;
  final FontWeight? fontWeight;
  final bool loading;
  final bool disabled;

  const ContainedButton({
    Key? key,
    this.child,
    this.icon,
    this.width,
    this.height,
    this.iconAlignment,
    this.onPressed,
    this.fontWeight,
    this.loading = false,
    this.disabled = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width ?? 200,
      child: ElevatedButton.icon(
        onPressed: loading || disabled ? null : onPressed ?? () {},
        label: loading ? AppLoader() : child ?? SizedBox.shrink(),
        icon: icon,
        iconAlignment: iconAlignment ?? IconAlignment.end,
        style: ElevatedButton.styleFrom(
          backgroundColor: getColorScheme(context).surface,
          foregroundColor: AppColors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(0),
          ),
          padding: EdgeInsets.all(15),
          minimumSize: Size(double.maxFinite, height ?? 60),
          iconColor: AppColors.white,
          disabledIconColor: Colors.black54,
          disabledBackgroundColor: getColorScheme(context).brightness == Brightness.dark ? Colors.grey[700] : Colors.grey[500],
          disabledForegroundColor: Colors.grey[300],
          textStyle: getTextTheme(context).bodyMedium?.copyWith(
                fontWeight: fontWeight,
              ),
        ),
      ),
    );
  }
}
