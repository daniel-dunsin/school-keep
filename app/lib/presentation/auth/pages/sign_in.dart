import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/checkbox.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
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
                  ..._loginTitle,
                  SizedBox(height: 30),
                  _buildEmailField(),
                  SizedBox(height: 20),
                  _buildPasswordField(),
                  SizedBox(height: 20),
                  _buildExtras(),
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

  List<Widget> get _loginTitle => [
        Text(
          "Welcome back 👋🏽",
          style: getTextTheme(context).bodySmall,
        ),
        SizedBox(height: 10),
        Text(
          "Login",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 4),
        Text(
          "Sign in to continue managing your documents 📜",
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

  _buildPasswordField() {
    return AppInputField(
      label: "Password",
      keyboardType: TextInputType.none,
      hintText: "Enter your password",
      prefixIcon: Icon(Icons.lock_outlined),
      obscureText: true,
      validator: (value) => AppValidators.defaultValidator(value),
    );
  }

  _buildExtras() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        AppCheckbox(
          label: "Keep me logged in",
        ),
        SizedBox(width: 20),
        GestureDetector(
          onTap: () {
            context.push(AuthRoutes.forgotPassword);
          },
          child: Text(
            "Forgot Password",
            style: getTextTheme(context).labelMedium?.copyWith(
                  color: getColorSchema(context).brightness == Brightness.light
                      ? getColorSchema(
                          context,
                        ).surface
                      : getColorSchema(
                          context,
                        ).onPrimary,
                ),
          ),
        ),
      ],
    );
  }

  _buildButton() {
    return ContainedButton(
      width: double.maxFinite,
      child: Text("Sign In"),
      onPressed: () {
        if (formKey.currentState != null && formKey.currentState!.validate()) {}
      },
    );
  }

  _buildAlt() {
    return GestureDetector(
      onTap: () {
        context.pushNamed(AuthRoutes.signUp);
      },
      child: Center(
        child: Text(
          "Create an account",
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
