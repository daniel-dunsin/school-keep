import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
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
                  _buildEmailField(),
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
          "Password Reset",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 4),
        Text(
          "Reset your password with your school registered email address",
          style: getTextTheme(context).bodySmall,
        ),
      ];

  _buildEmailField() {
    return AppInputField(
      label: "Email Address",
      keyboardType: TextInputType.emailAddress,
      hintText: "Enter your school registered email address",
      prefixIcon: Icon(Icons.mail_outline),
      validator: (value) => AppValidators.email(value),
    );
  }

  _buildButton() {
    return ContainedButton(
      width: double.maxFinite,
      child: Text("Request OTP"),
      onPressed: () {
        if (formKey.currentState != null && formKey.currentState!.validate()) {
          context.pushNamed(
            AuthRoutes.confirmForgotPassword,
            extra: {
              "email": "adejaredaniel12@gmail.com"
            },
          );
        }
      },
    );
  }

  _buildAlt() {
    return GestureDetector(
      onTap: () {
        context.pop();
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
