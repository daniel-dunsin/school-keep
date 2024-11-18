// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/auth/models/confirm_otp_model.dart';
import 'package:app/data/auth/models/login_model.dart';
import 'package:app/data/auth/models/reset_password_model.dart';
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

          emit(LoginSuccess());
        } catch (e) {
          NetworkToast.handleError(e);
          emit(LoginFailed());
        }
      },
    );
  }
}
