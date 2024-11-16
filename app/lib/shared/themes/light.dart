import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/themes/default.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

final lightTheme = defaultTheme.copyWith(
  appBarTheme: defaultTheme.appBarTheme.copyWith(
    systemOverlayStyle: SystemUiOverlayStyle.dark,
    foregroundColor: AppColors.black,
    titleTextStyle: defaultTheme.appBarTheme.titleTextStyle?.copyWith(
      color: AppColors.black,
    ),
    iconTheme: defaultTheme.appBarTheme.iconTheme?.copyWith(
      color: AppColors.black,
    ),
    actionsIconTheme: defaultTheme.appBarTheme.actionsIconTheme?.copyWith(
      color: AppColors.black,
    ),
  ),
  iconTheme: IconThemeData(
    color: AppColors.white,
  ),
  scaffoldBackgroundColor: AppColors.white,
  dialogBackgroundColor: AppColors.white,
  dialogTheme: defaultTheme.dialogTheme.copyWith(
    barrierColor: Color.fromRGBO(0, 0, 0, 0.4),
  ),
  colorScheme: ColorScheme(
    brightness: Brightness.light,
    primary: AppColors.white,
    onPrimary: AppColors.black,
    secondary: Colors.grey[300]!,
    onSecondary: Colors.black54,
    surface: AppColors.white,
    onSurface: AppColors.black,
    error: AppColors.error,
    onError: AppColors.white,
  ),
  dividerColor: Colors.grey[300]!,
  indicatorColor: AppColors.mainLight,
  splashColor: AppColors.mainExtraLight,
  hintColor: Colors.grey[300]!,
  textTheme: TextTheme(
    displayLarge: defaultTheme.textTheme.displayLarge?.copyWith(
      color: AppColors.black,
    ),
    displayMedium: defaultTheme.textTheme.displayMedium?.copyWith(
      color: AppColors.black,
    ),
    displaySmall: defaultTheme.textTheme.displaySmall?.copyWith(
      color: AppColors.black,
    ),
    headlineLarge: defaultTheme.textTheme.headlineLarge?.copyWith(
      color: AppColors.black,
    ),
    headlineMedium: defaultTheme.textTheme.headlineMedium?.copyWith(
      color: AppColors.black,
    ),
    headlineSmall: defaultTheme.textTheme.headlineSmall?.copyWith(
      color: AppColors.black,
    ),
    titleLarge: defaultTheme.textTheme.titleLarge?.copyWith(
      color: AppColors.black,
    ),
    titleMedium: defaultTheme.textTheme.titleMedium?.copyWith(
      color: AppColors.black,
    ),
    titleSmall: defaultTheme.textTheme.titleSmall?.copyWith(
      color: AppColors.black,
    ),
    bodyLarge: defaultTheme.textTheme.bodyLarge?.copyWith(
      color: AppColors.black,
    ),
    bodyMedium: defaultTheme.textTheme.bodyMedium?.copyWith(
      color: AppColors.black,
    ),
    bodySmall: defaultTheme.textTheme.bodySmall?.copyWith(
      color: AppColors.black,
    ),
    labelLarge: defaultTheme.textTheme.labelLarge?.copyWith(
      color: AppColors.black,
    ),
    labelMedium: defaultTheme.textTheme.labelMedium?.copyWith(
      color: AppColors.black,
    ),
    labelSmall: defaultTheme.textTheme.labelSmall?.copyWith(
      color: AppColors.black,
    ),
  ),
);
