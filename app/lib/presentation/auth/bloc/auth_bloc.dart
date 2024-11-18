// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/app_config.dart';
import 'package:app/data/auth/models/confirm_otp_model.dart';
import 'package:app/data/auth/models/login_model.dart';
import 'package:app/data/auth/models/reset_password_model.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/domain/auth/auth_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository authRepository;

  AuthBloc({required this.authRepository}) : super(AuthInitialState()) {
    on<LoginRequested>(
      (event, emit) async {
        emit(LoginLoading());

        try {
          final response = await authRepository.login(event.loginDto);

          final token = response["meta"]["accessToken"];
          final userMap = response["data"] as Map;

          AppStorage.saveString(key: AppStorageKeys.accessToken, value: token);
          AppStorage.saveObject(key: AppStorageKeys.user, value: userMap);

          print(userMap["school"]);
          getIt.registerSingleton<User>(User.fromMap(userMap));
          emit(LoginSuccess(user: User.fromMap(userMap)));
        } catch (e) {
          NetworkToast.handleError(e);
          emit(LoginFailed());
        }
      },
    );

    on<ForgotPasswordRequested>((event, emit) async {
      emit(ForgotPasswordLoading());

      try {
        await authRepository.forgotPassword(event.email);

        emit(ForgotPasswordSuccess());
      } catch (e) {
        NetworkToast.handleError(e);
        emit(ForgotPasswordFailed());
      }
    });

    on<ConfirmPasswordOtpRequested>((event, emit) async {
      emit(ConfirmPasswordResetOtpLoading());

      try {
        final response = await authRepository.confirmPasswordResetOtp(event.confirmOtpDto);

        final tempToken = response["data"]?["tempToken"];

        emit(ConfirmPasswordResetOtpSuccess(tempToken: tempToken));
      } catch (e) {
        NetworkToast.handleError(e);
        emit(ConfirmPasswordResetOtpFailed());
      }
    });

    on<ResetPasswordRequested>((event, emit) async {
      emit(ResetPasswordLoading());
      try {
        await authRepository.resetPassword(event.resetPasswordDto);

        emit(ResetPasswordSuccess());
      } catch (e) {
        NetworkToast.handleError(e);
        emit(ResetPasswordFailed());
      }
    });
  }
}
