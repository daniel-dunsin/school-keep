// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ResetPasswordScreen extends StatefulWidget {
  final String tempToken;

  const ResetPasswordScreen({
    Key? key,
    required this.tempToken,
  }) : super(key: key);

  @override
  State<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends State<ResetPasswordScreen> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppStyles.defaultPagePadding.copyWith(top: 100),
          child: Center(
            child: Form(
              key: formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ..._title,
                  SizedBox(height: 30),
                  _buildPasswordField(),
                  SizedBox(height: 20),
                  _buildConfirmPasswordField(),
                  SizedBox(height: 30),
                  _buildButton(),
                  SizedBox(height: 15),
                  _buildAlt(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> get _title => [
        Text(
          "Reset Password",
          style: getTextTheme(context).displayLarge,
        ),
      ];

  _buildPasswordField() {
    return AppInputField(
      label: "Password",
      keyboardType: TextInputType.none,
      hintText: "Enter your password",
      prefixIcon: Icon(Icons.lock_outlined),
      validator: (value) => AppValidators.password(value),
    );
  }

  _buildConfirmPasswordField() {
    return AppInputField(
      label: "Confirm Password",
      keyboardType: TextInputType.none,
      hintText: "Confirm your password",
      prefixIcon: Icon(Icons.lock_outlined),
      validator: (value) {
        String? errorMessage = AppValidators.password(value);

        if (errorMessage == null) {
          if (value == "") {
            errorMessage = "passwords do not match";
          }
        }

        return errorMessage;
      },
    );
  }

  _buildButton() {
    return ContainedButton(
      width: double.maxFinite,
      child: Text("Reset Password"),
      onPressed: () {
        if (formKey.currentState != null && formKey.currentState!.validate()) {
          context.goNamed(AuthRoutes.signIn);
        }
      },
    );
  }

  _buildAlt() {
    return GestureDetector(
      onTap: () {
        context.goNamed(AuthRoutes.signIn);
      },
      child: Center(
        child: Text(
          "Back to login",
          style: getTextTheme(context).bodyLarge?.copyWith(
                color: getColorSchema(context).brightness == Brightness.light
                    ? getColorSchema(
                        context,
                      ).surface
                    : getColorSchema(
                        context,
                      ).onPrimary,
              ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
