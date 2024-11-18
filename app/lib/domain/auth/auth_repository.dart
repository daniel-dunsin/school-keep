import 'package:app/data/auth/models/confirm_otp_model.dart';
import 'package:app/data/auth/models/login_model.dart';
import 'package:app/data/auth/models/reset_password_model.dart';
import 'package:app/shared/network/network_service.dart';

class AuthRepository {
  final NetworkService networkService;

  AuthRepository({required this.networkService}) {}

  login(LoginModel loginDto) async {
    final response = await this.networkService.post(
          "/auth/login",
          data: loginDto.toMap(),
        );

    return response?.data;
  }

  forgotPassword(String email) async {
    final response = await this.networkService.post(
      "/forgot-password",
      data: {
        "email": email
      },
    );

    return response?.data;
  }

  confirmPasswordResetOtp(ConfirmOtpModel confirmOtpDto) async {
    final response = await this.networkService.post(
          "/forgot-password/confirm",
          data: confirmOtpDto.toMap(),
        );

    return response?.data;
  }

  resetPassword(ResetPasswordModel resetPasswordDto) async {
    final response = await this.networkService.post(
          "/forgot-password/reset",
          data: resetPasswordDto.toMap(),
        );

    return response?.data;
  }
}