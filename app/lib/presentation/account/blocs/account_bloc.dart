import 'package:app/configs/app_config.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/domain/auth/auth_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'account_events.dart';
part 'account_state.dart';

class AccountBloc extends Bloc<AccountEvents, AccountState> {
  final AuthRepository authRepository;

  AccountBloc({
    required this.authRepository,
  }) : super(AccountInitialState()) {
    on<SignOutRequested>(
      (event, emit) async {
        emit(SignOutLoading());
        try {
          await authRepository.signOut();
          await AppStorage.removeKey(AppStorageKeys.accessToken);
          await AppStorage.removeKey(AppStorageKeys.user);
          await getIt.unregister<User>();

          emit(SignOutSuccessful());
          await Future.delayed(
            Duration(seconds: 1),
            () => emit(
              AccountInitialState(),
            ),
          );
        } catch (e) {
          NetworkToast.handleError(e);
          emit(SignOutError());
        }
      },
    );
  }
}
