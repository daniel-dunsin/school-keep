part of 'auth_bloc.dart';

@immutable
sealed class AuthEvent {}

class LoginRequested extends AuthEvent {
  final LoginModel loginDto;

  LoginRequested(this.loginDto);
}

class ForgotPasswordRequested extends AuthEvent {
  final String email;

  ForgotPasswordRequested({required this.email});
}

class ConfirmPasswordOtpRequested extends AuthEvent {
  final ConfirmOtpModel confirmOtpDto;

  ConfirmPasswordOtpRequested(this.confirmOtpDto);
}

class ResetPasswordRequested extends AuthEvent {
  final ResetPasswordModel resetPasswordDto;

  ResetPasswordRequested(this.resetPasswordDto);
}

class GetSchoolsRequested extends AuthEvent {}

class GetCollegesRequested extends AuthEvent {
  final String schoolId;

  GetCollegesRequested({required this.schoolId});
}

class GetDepartmentsRequested extends AuthEvent {
  final String collegeId;

  GetDepartmentsRequested({required this.collegeId});
}

class SignUpRequested extends AuthEvent {
  final SignUpModel signUpDto;

  SignUpRequested(this.signUpDto);
}
