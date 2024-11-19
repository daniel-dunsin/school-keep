import 'package:app/shared/constants/constants.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:toastification/toastification.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class NetworkToast {
  static void handleError(dynamic error) {
    print(error);
    dynamic errorMessage = "Oops! an error occured";

    if (error?.runtimeType.toString() == "String") {
      errorMessage = error;
    }

    if (error is DioException) {
      switch (error.type) {
        case DioExceptionType.cancel:
          errorMessage = "Request Cancelled";
          break;
        case DioExceptionType.connectionError:
          errorMessage = "Network Error";
          break;
        case DioExceptionType.connectionTimeout:
        case DioExceptionType.receiveTimeout:
        case DioExceptionType.sendTimeout:
          errorMessage = "Request timeout";
          break;
        default:
          errorMessage = error.response?.data?["error"] ?? errorMessage;
      }
    }

    toastification.showCustom(
      autoCloseDuration: const Duration(seconds: 2),
      alignment: Alignment.topCenter,
      builder: (context, item) {
        return _buildMessage(message: errorMessage, isError: true);
      },
    );
  }

  static void handleSuccess(String message) {
    toastification.showCustom(
      autoCloseDuration: const Duration(seconds: 2),
      alignment: Alignment.topCenter,
      builder: (context, item) {
        return _buildMessage(message: message, isError: false);
      },
    );
  }
}

Widget _buildMessage({required String message, required bool isError}) {
  return Center(
    child: FractionallySizedBox(
      widthFactor: 0.9,
      alignment: Alignment.centerRight,
      child: Container(
        padding: const EdgeInsets.all(14),
        margin: const EdgeInsets.symmetric(vertical: 5),
        decoration: BoxDecoration(
          color: isError ? AppColors.error : AppColors.success,
          borderRadius: BorderRadius.circular(3),
        ),
        child: Text.rich(
          TextSpan(
            children: [
              WidgetSpan(
                alignment: PlaceholderAlignment.middle,
                child: Icon(
                  isError ? Icons.warning_amber : Icons.check_circle_outline,
                ),
              ),
              WidgetSpan(
                child: SizedBox(width: 10),
              ),
              TextSpan(
                text: message,
                style: TextStyle(
                  fontSize: 15.h,
                  color: AppColors.white,
                ),
              )
            ],
          ),
        ),
      ),
    ),
  );
}
