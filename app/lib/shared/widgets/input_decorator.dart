import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';

class AppInputDecorator extends StatefulWidget {
  final String? label;
  final String? value;
  final Widget? helper;
  final double? height;
  final double? width;
  final Widget? suffixIcon;
  final Color? suffixIconColor;
  final Widget? prefixIcon;
  final Color? prefixIconColor;
  final bool disabled;
  final VoidCallback? onTap;
  final bool loading;

  const AppInputDecorator({
    Key? key,
    this.label,
    this.value,
    this.helper,
    this.height,
    this.width,
    this.suffixIcon,
    this.prefixIcon,
    this.prefixIconColor,
    this.suffixIconColor,
    this.onTap,
    this.loading = false,
    this.disabled = false,
  }) : super(key: key);

  @override
  State<AppInputDecorator> createState() => _AppInputDecoratorState();
}

class _AppInputDecoratorState extends State<AppInputDecorator> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ...widget.label != null
            ? [
                Text(
                  widget.label ?? "",
                  style: getTextTheme(context).labelLarge,
                ),
                SizedBox(height: 10),
              ]
            : [],
        GestureDetector(
          onTap: widget.loading || widget.disabled ? null : widget.onTap,
          child: InputDecorator(
            child: widget.loading
                ? AppLoader()
                : Text(
                    widget.value ?? "",
                    style: getTextTheme(context).labelSmall?.copyWith(
                          color: getColorScheme(context).onSecondary,
                        ),
                  ),
            decoration: InputDecoration(
              helper: widget.helper,
              border: defaultBorder,
              enabledBorder: defaultBorder,
              focusedBorder: focusBorder,
              errorBorder: errorBorder,
              focusedErrorBorder: errorBorder,
              disabledBorder: defaultBorder,
              enabled: !widget.disabled,
              contentPadding: EdgeInsets.symmetric(
                vertical: 15,
                horizontal: 15,
              ),
              prefixIcon: widget.prefixIcon,
              suffixIcon: widget.suffixIcon ?? Icon(Icons.arrow_right),
              prefixIconColor: widget.prefixIconColor ?? getColorScheme(context).onSecondary,
              suffixIconColor: widget.suffixIconColor ?? getColorScheme(context).onSecondary,
            ),
          ),
        ),
      ],
    );
  }

  InputBorder get defaultBorder => OutlineInputBorder(
        borderSide: BorderSide(
          color: getColorScheme(context).onSecondary,
          width: 1,
        ),
        borderRadius: BorderRadius.circular(0),
      );

  InputBorder get focusBorder => OutlineInputBorder(
        borderSide: BorderSide(
          color: getColorScheme(context).surface,
          width: 1,
        ),
        borderRadius: BorderRadius.circular(0),
      );

  InputBorder get errorBorder => OutlineInputBorder(
        borderSide: BorderSide(
          color: getColorScheme(context).error,
          width: 1,
        ),
        borderRadius: BorderRadius.circular(0),
      );
}
