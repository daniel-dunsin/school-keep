import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';

import 'package:flutter_screenutil/flutter_screenutil.dart';

final defaultTheme = ThemeData(
  useMaterial3: true,
  fontFamily: AppFonts.circularstd,
  appBarTheme: AppBarTheme(
    centerTitle: true,
    backgroundColor: Colors.transparent,
    surfaceTintColor: Colors.transparent,
    titleTextStyle: TextStyle(
      fontSize: 18.sp,
    ),
    iconTheme: IconThemeData(
      size: 24,
    ),
    actionsIconTheme: IconThemeData(
      size: 24,
    ),
  ),
  floatingActionButtonTheme: FloatingActionButtonThemeData(
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(0),
    ),
    elevation: 3,
    backgroundColor: AppColors.mainLight,
    foregroundColor: AppColors.white,
  ),
  primaryColor: AppColors.mainLight,
  textTheme: TextTheme(
    displayLarge: TextStyle(
      fontSize: 42.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.bold,
    ),
    displayMedium: TextStyle(
      fontSize: 42.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w500,
    ),
    displaySmall: TextStyle(
      fontSize: 42.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w300,
    ),
    headlineLarge: TextStyle(
      fontSize: 30.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.bold,
    ),
    headlineMedium: TextStyle(
      fontSize: 30.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w500,
    ),
    headlineSmall: TextStyle(
      fontSize: 30.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w300,
    ),
    titleLarge: TextStyle(
      fontSize: 18.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.bold,
    ),
    titleMedium: TextStyle(
      fontSize: 18.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w500,
    ),
    titleSmall: TextStyle(
      fontSize: 18.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w300,
    ),
    bodyLarge: TextStyle(
      fontSize: 16.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.bold,
    ),
    bodyMedium: TextStyle(
      fontSize: 16.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w500,
    ),
    bodySmall: TextStyle(
      fontSize: 16.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w300,
    ),
    labelLarge: TextStyle(
      fontSize: 14.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.bold,
    ),
    labelMedium: TextStyle(
      fontSize: 14.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w500,
    ),
    labelSmall: TextStyle(
      fontSize: 14.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w300,
    ),
  ),
  disabledColor: Colors.grey[500],
  dialogTheme: DialogTheme(
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(0),
    ),
    alignment: Alignment.centerLeft,
    surfaceTintColor: Colors.transparent,
    titleTextStyle: TextStyle(
      fontSize: 18.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.bold,
    ),
    contentTextStyle: TextStyle(
      fontSize: 16.sp,
      fontFamily: AppFonts.circularstd,
      fontWeight: FontWeight.w500,
    ),
  ),
  listTileTheme: ListTileThemeData(
    minTileHeight: 30,
    minVerticalPadding: 0,
    contentPadding: EdgeInsets.symmetric(vertical: 2, horizontal: 15),
  ),
);
