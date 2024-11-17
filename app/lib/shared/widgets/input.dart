// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class AppInputField extends StatefulWidget {
  final String? label;
  final String? hintText;
  final Widget? helper;
  final double? height;
  final double? width;
  final TextEditingController? controller;
  final FormFieldValidator? validator;
  final Widget? suffixIcon;
  final Color? suffixIconColor;
  final Widget? prefixIcon;
  final Color? prefixIconColor;
  final bool? obscureText;
  final bool? isTextArea;
  final TextInputType? keyboardType;
  final bool disabled;

  const AppInputField({
    Key? key,
    this.label,
    this.hintText,
    this.helper,
    this.height,
    this.width,
    this.controller,
    this.validator,
    this.suffixIcon,
    this.prefixIcon,
    this.obscureText,
    this.isTextArea,
    this.keyboardType,
    this.prefixIconColor,
    this.suffixIconColor,
    this.disabled = false,
  }) : super(key: key);

  @override
  State<AppInputField> createState() => _AppInputFieldState();
}

class _AppInputFieldState extends State<AppInputField> {
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
        TextFormField(
          showCursor: true,
          cursorWidth: 1,
          cursorColor: getColorSchema(context).onPrimary,
          controller: widget.controller,
          validator: widget.validator,
          obscureText: widget.obscureText ?? false,
          minLines: widget.isTextArea != true ? 1 : 4,
          maxLines: widget.isTextArea != true ? 1 : 10,
          keyboardType: widget.keyboardType,
          style: getTextTheme(context).bodyMedium,
          decoration: InputDecoration(
            hintText: widget.hintText,
            hintStyle: getTextTheme(context).labelSmall?.copyWith(
                  color: getColorSchema(context).onSecondary,
                ),
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
            suffixIcon: widget.suffixIcon,
            prefixIconColor: widget.prefixIconColor ?? getColorSchema(context).onSecondary,
            suffixIconColor: widget.suffixIconColor ?? getColorSchema(context).onSecondary,
          ),
        ),
      ],
    );
  }

  InputBorder get defaultBorder => OutlineInputBorder(
        borderSide: BorderSide(
          color: getColorSchema(context).onSecondary,
          width: 1,
        ),
        borderRadius: BorderRadius.circular(0),
      );

  InputBorder get focusBorder => OutlineInputBorder(
        borderSide: BorderSide(
          color: getColorSchema(context).surface,
          width: 1,
        ),
        borderRadius: BorderRadius.circular(0),
      );

  InputBorder get errorBorder => OutlineInputBorder(
        borderSide: BorderSide(
          color: getColorSchema(context).error,
          width: 1,
        ),
        borderRadius: BorderRadius.circular(0),
      );
}
