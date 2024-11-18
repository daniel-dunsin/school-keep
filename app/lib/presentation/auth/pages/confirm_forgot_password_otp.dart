// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ConfirmForgotPasswordOtpScreen extends StatefulWidget {
  final String email;

  const ConfirmForgotPasswordOtpScreen({
    Key? key,
    required this.email,
  }) : super(key: key);

  @override
  State<ConfirmForgotPasswordOtpScreen> createState() => _ConfirmForgotPasswordOtpScreenState();
}

class _ConfirmForgotPasswordOtpScreenState extends State<ConfirmForgotPasswordOtpScreen> {
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
                  _buildOtpField(),
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
          "Confirm OTP",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 4),
        Text(
          "Confirm the password reset otp sent to your email address (${widget.email})",
          style: getTextTheme(context).bodySmall,
        ),
      ];

  _buildOtpField() {
    return AppInputField(
      keyboardType: TextInputType.numberWithOptions(decimal: false),
      hintText: "Enter your 4 digits One Time Password",
      validator: (value) => AppValidators.defaultValidator(value),
    );
  }

  _buildButton() {
    return ContainedButton(
      width: double.maxFinite,
      child: Text("Confirm OTP"),
      onPressed: () {
        if (formKey.currentState != null && formKey.currentState!.validate()) {
          context.pushNamed(
            AuthRoutes.resetPassword,
            extra: {
              "tempToken": "myToken",
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
          "Back",
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
