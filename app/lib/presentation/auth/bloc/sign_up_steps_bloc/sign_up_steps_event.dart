part of 'sign_up_steps_bloc.dart';

@immutable
sealed class SignUpStepsEvent {}

class SignUpStepsNextRequested extends SignUpStepsEvent {
  final SignUpModel signUpModel;

  SignUpStepsNextRequested(this.signUpModel);
}

class SignUpStepsPreviousRequested extends SignUpStepsEvent {
  final SignUpModel? signUpModel;

  SignUpStepsPreviousRequested({this.signUpModel});
}

class SignUpStepsClearRequested extends SignUpStepsEvent {}

class SignUpStepsSetSameStepFieldRequested extends SignUpStepsEvent {
  final SignUpModel? signUpModel;

  SignUpStepsSetSameStepFieldRequested({this.signUpModel});
}
