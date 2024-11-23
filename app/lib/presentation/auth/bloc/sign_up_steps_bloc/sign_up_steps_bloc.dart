import 'package:app/data/auth/models/sign_up_model.dart';
import 'package:app/presentation/auth/pages/sign_up.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'sign_up_steps_event.dart';
part 'sign_up_steps_state.dart';

class SignUpStepsBloc extends Bloc<SignUpStepsEvent, SignUpStepsState> {
  SignUpStepsBloc() : super(SignUpStepsState(signUpModel: SignUpModel())) {
    on<SignUpStepsNextRequested>(
      (event, emit) {
        if (state.count != signUpPages.length - 1) {
          emit(
            SignUpStepsState(
              count: state.count + 1,
              signUpModel: event.signUpModel,
            ),
          );
        }
      },
    );

    on<SignUpStepsPreviousRequested>(
      (event, emit) {
        if (state.count != 0) {
          emit(
            SignUpStepsState(
              signUpModel: event.signUpModel ?? state.signUpModel,
              count: state.count - 1,
            ),
          );
        }
      },
    );

    on<SignUpStepsClearRequested>(
      (event, emit) {
        emit(
          SignUpStepsState(
            signUpModel: SignUpModel(),
            count: 0,
          ),
        );
      },
    );

    on<SignUpStepsSetSameStepFieldRequested>(
      (event, emit) {
        emit(
          SignUpStepsState(
            signUpModel: event.signUpModel ?? state.signUpModel,
            count: state.count,
          ),
        );
      },
    );
  }
}
