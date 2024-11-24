import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/themes/default.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

final darkTheme = defaultTheme.copyWith(
  appBarTheme: defaultTheme.appBarTheme.copyWith(
    systemOverlayStyle: SystemUiOverlayStyle.light,
    foregroundColor: AppColors.white,
    titleTextStyle: defaultTheme.appBarTheme.titleTextStyle?.copyWith(
      color: AppColors.white,
    ),
    iconTheme: defaultTheme.appBarTheme.iconTheme?.copyWith(
      color: AppColors.white,
    ),
    actionsIconTheme: defaultTheme.appBarTheme.actionsIconTheme?.copyWith(
      color: AppColors.white,
    ),
  ),
  iconTheme: IconThemeData(
    color: AppColors.white,
  ),
  scaffoldBackgroundColor: AppColors.black,
  dialogBackgroundColor: AppColors.black,
  dialogTheme: defaultTheme.dialogTheme.copyWith(
    barrierColor: Color.fromRGBO(93, 93, 93, 0.4),
  ),
  colorScheme: ColorScheme(
    brightness: Brightness.dark,
    primary: AppColors.black,
    onPrimary: AppColors.white,
    secondary: Colors.black54,
    onSecondary: Colors.grey[200]!,
    surface: AppColors.mainLight,
    onSurface: AppColors.white,
    error: AppColors.error,
    onError: AppColors.white,
  ),
  dividerColor: Colors.black54,
  indicatorColor: AppColors.mainDark,
  splashColor: AppColors.mainExtraLight,
  hintColor: Colors.grey[300]!,
  textTheme: TextTheme(
    displayLarge: defaultTheme.textTheme.displayLarge?.copyWith(
      color: AppColors.white,
    ),
    displayMedium: defaultTheme.textTheme.displayMedium?.copyWith(
      color: AppColors.white,
    ),
    displaySmall: defaultTheme.textTheme.displaySmall?.copyWith(
      color: AppColors.white,
    ),
    headlineLarge: defaultTheme.textTheme.headlineLarge?.copyWith(
      color: AppColors.white,
    ),
    headlineMedium: defaultTheme.textTheme.headlineMedium?.copyWith(
      color: AppColors.white,
    ),
    headlineSmall: defaultTheme.textTheme.headlineSmall?.copyWith(
      color: AppColors.white,
    ),
    titleLarge: defaultTheme.textTheme.titleLarge?.copyWith(
      color: AppColors.white,
    ),
    titleMedium: defaultTheme.textTheme.titleMedium?.copyWith(
      color: AppColors.white,
    ),
    titleSmall: defaultTheme.textTheme.titleSmall?.copyWith(
      color: AppColors.white,
    ),
    bodyLarge: defaultTheme.textTheme.bodyLarge?.copyWith(
      color: AppColors.white,
    ),
    bodyMedium: defaultTheme.textTheme.bodyMedium?.copyWith(
      color: AppColors.white,
    ),
    bodySmall: defaultTheme.textTheme.bodySmall?.copyWith(
      color: AppColors.white,
    ),
    labelLarge: defaultTheme.textTheme.labelLarge?.copyWith(
      color: AppColors.white,
    ),
    labelMedium: defaultTheme.textTheme.labelMedium?.copyWith(
      color: AppColors.white,
    ),
    labelSmall: defaultTheme.textTheme.labelSmall?.copyWith(
      color: AppColors.white,
    ),
  ),
  bottomNavigationBarTheme: defaultTheme.bottomNavigationBarTheme.copyWith(
    selectedLabelStyle: defaultTheme.bottomNavigationBarTheme.selectedLabelStyle?.copyWith(
      color: AppColors.mainLight,
    ),
    unselectedLabelStyle: defaultTheme.bottomNavigationBarTheme.unselectedLabelStyle?.copyWith(
      color: AppColors.white,
    ),
    selectedIconTheme: IconThemeData(
      color: AppColors.mainLight,
    ),
    unselectedIconTheme: IconThemeData(
      color: AppColors.white,
    ),
    backgroundColor: AppColors.black,
    selectedItemColor: AppColors.mainLight,
    unselectedItemColor: AppColors.white,
  ),
);
