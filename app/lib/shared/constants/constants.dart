import 'package:flutter/material.dart';

class AppColors {
  static const Color success = Color(0xFF006D4C);
  static const Color error = Color.fromARGB(255, 167, 2, 2);
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF0D0D0D);
  static const Color mainLight = Color(0xFF8A05FF);
  static const Color mainDark = Color(0xFF2A0052);
  static const Color mainExtraLight = Color(0xFFE7DBFF);
}

class AppFonts {
  static const String circularstd = "CircularStd";
}

const imagesRoute = "assets/images";

class AppImages {
  static const String logoWhite = '$imagesRoute/logo-white.png';
  static const String logoBlack = '$imagesRoute/logo-black.png';
  static const String logoPurple = '$imagesRoute/logo-purple.png';
}

class AppStyles {
  static EdgeInsets defaultPagePadding = EdgeInsets.fromLTRB(25, 20, 25, 20);
}

class AppMatchers {
  static RegExp email = RegExp(
    r"^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
  );

  static RegExp base64 = RegExp(r"/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)/");

  static RegExp phoneNumber = RegExp(r"^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$");

  static RegExp password = RegExp(r'^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,}).*$');
}
