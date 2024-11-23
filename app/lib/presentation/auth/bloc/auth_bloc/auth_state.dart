part of 'auth_bloc.dart';

@immutable
sealed class AuthState {}

class AuthInitialState extends AuthState {}

class LoginLoading extends AuthState {}

class LoginSuccess extends AuthState {
  final User user;

  LoginSuccess({required this.user});
}

class LoginFailed extends AuthState {}

class SignUpLoading extends AuthState {}

class SignUpSuccess extends AuthState {
  final User user;

  SignUpSuccess({required this.user});
}

class SignUpFailed extends AuthState {}

class ForgotPasswordLoading extends AuthState {}

class ForgotPasswordSuccess extends AuthState {}

class ForgotPasswordFailed extends AuthState {}

class ConfirmPasswordResetOtpLoading extends AuthState {}

class ConfirmPasswordResetOtpSuccess extends AuthState {
  final String tempToken;

  ConfirmPasswordResetOtpSuccess({required this.tempToken});
}

class ConfirmPasswordResetOtpFailed extends AuthState {}

class ResetPasswordLoading extends AuthState {}

class ResetPasswordSuccess extends AuthState {}

class ResetPasswordFailed extends AuthState {}

class GetSchoolsLoading extends AuthState {}

class GetSchoolsSuccess extends AuthState {
  final List<SchoolModel> schools;

  GetSchoolsSuccess(this.schools);
}

class GetSchoolsFailed extends AuthState {}

class GetCollegesLoading extends AuthState {}

class GetCollegesSuccess extends AuthState {
  final List<CollegeModel> colleges;

  GetCollegesSuccess(this.colleges);
}

class GetCollegesFailed extends AuthState {}

class GetDepartmentsLoading extends AuthState {}

class GetDepartmentsSuccess extends AuthState {
  final List<DepartmentModel> departments;

  GetDepartmentsSuccess(this.departments);
}

class GetDepartmentsFailed extends AuthState {}
