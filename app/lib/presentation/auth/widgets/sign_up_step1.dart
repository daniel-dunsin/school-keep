import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class SignUpStep1 extends StatefulWidget {
  const SignUpStep1({super.key});

  @override
  State<SignUpStep1> createState() => _SignUpStep1State();
}

class _SignUpStep1State extends State<SignUpStep1> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppStyles.defaultPagePadding.copyWith(
            top: 50,
            bottom: 0,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ..._title,
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  List<Widget> get _title => [
        Text(
          "Sign Up",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 7),
        Text(
          "Select your school information to continue 🏫",
          style: getTextTheme(context).bodySmall,
        ),
      ];
}
