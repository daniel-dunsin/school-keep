import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

ColorScheme getColorScheme(BuildContext context) {
  return Theme.of(context).colorScheme;
}

TextTheme getTextTheme(BuildContext context) {
  return Theme.of(context).textTheme;
}

void setStatusBarTheme(BuildContext context, AppTheme appTheme) {
  if (appTheme == AppTheme.light) {
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarBrightness: Brightness.light,
        statusBarIconBrightness: Brightness.light,
        statusBarColor: AppColors.black,
      ),
    );
  } else if (appTheme == AppTheme.dark) {
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarBrightness: Brightness.dark,
        statusBarIconBrightness: Brightness.dark,
        statusBarColor: AppColors.white,
      ),
    );
  }
}
