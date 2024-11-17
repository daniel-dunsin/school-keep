import 'package:app/shared/constants/constants.dart';

class AppValidators {
  static String? defaultValidator(String? value, {String? message = "this field is required"}) {
    if (value == null || value.isEmpty) {
      return message;
    }

    return null;
  }

  static String? email(String? value, {String? message = "enter a valid email", bool? isRequired = true}) {
    if (isRequired == true) {
      if (value == null || value.isEmpty) {
        return "this field is required";
      }
    }

    if (value == null || !AppMatchers.email.hasMatch(value)) {
      return message;
    }

    return null;
  }

  static String? phoneNumber(String? value, {String? message = "enter a valid phone number", bool? isRequired = true}) {
    if (isRequired == true) {
      if (value == null || value.isEmpty) {
        return "this field is required";
      }
    }

    if (value == null || !AppMatchers.phoneNumber.hasMatch(value)) {
      return message;
    }

    return null;
  }

  static String? password(String? value, {String? message = "password must not be less than 8 characters", bool? isRequired = true}) {
    if (isRequired == true) {
      if (value == null || value.isEmpty) {
        return "this field is required";
      }
    }

    if (value == null || value.length < 8) {
      return message;
    }

    return null;
  }
}
