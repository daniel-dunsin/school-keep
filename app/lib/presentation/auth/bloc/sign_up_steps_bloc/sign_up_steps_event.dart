part of 'sign_up_steps_bloc.dart';

@immutable
sealed class SignUpStepsEvent {}

class SignUpStepsNextRequested extends SignUpStepsEvent {
  final SignUpModel signUpModel;

  SignUpStepsNextRequested(this.signUpModel);
}

class SignUpStepsPreviousRequested extends SignUpStepsEvent {}

class SignUpStepsClearRequested extends SignUpStepsEvent {}
