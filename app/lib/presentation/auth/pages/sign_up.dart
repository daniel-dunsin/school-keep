import 'package:app/configs/app_config.dart';
import 'package:app/presentation/auth/bloc/sign_up_steps_bloc/sign_up_steps_bloc.dart';
import 'package:app/presentation/auth/widgets/sign_up_step1.dart';
import 'package:app/presentation/auth/widgets/sign_up_step2.dart';
import 'package:app/presentation/auth/widgets/sign_up_step3.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const signUpPages = <Widget>[
  SignUpStep1(),
  SignUpStep2(),
  SignUpStep3(),
];

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  @override
  void initState() {
    super.initState();
    getIt.get<SignUpStepsBloc>().add(SignUpStepsClearRequested());
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SignUpStepsBloc, SignUpStepsState>(
      bloc: getIt.get<SignUpStepsBloc>(),
      builder: (context, state) {
        return Scaffold(
          body: signUpPages[state.count],
        );
      },
    );
  }
}
