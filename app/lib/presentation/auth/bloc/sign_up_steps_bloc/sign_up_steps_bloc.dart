import 'package:app/data/auth/models/sign_up_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'sign_up_steps_event.dart';
part 'sign_up_steps_state.dart';

class SignUpStepsBloc extends Bloc<SignUpStepsEvent, SignUpStepsState> {
  SignUpStepsBloc() : super(SignUpStepsState(signUpModel: SignUpModel())) {
    on<SignUpStepsNextRequested>(
      (event, emit) {
        emit(
          SignUpStepsState(
            count: state.count + 1,
            signUpModel: event.signUpModel,
          ),
        );
      },
    );

    on<SignUpStepsPreviousRequested>(
      (event, emit) {
        emit(
          SignUpStepsState(
            signUpModel: state.signUpModel,
            count: state.count - 1,
          ),
        );
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
  }
}
