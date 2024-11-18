// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/app_config.dart';
import 'package:app/data/auth/models/reset_password_model.dart';
import 'package:app/presentation/auth/bloc/auth_bloc/auth_bloc.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
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

  late TextEditingController passwordController;
  late TextEditingController confirmPasswordController;

  @override
  void initState() {
    super.initState();
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();
  }

  @override
  void dispose() {
    super.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
  }

  void submit() {
    getIt.get<AuthBloc>().add(
          ResetPasswordRequested(
            ResetPasswordModel(
              password: passwordController.text,
              tempToken: widget.tempToken,
            ),
          ),
        );
  }

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
                  _buildPasswordField(controller: passwordController),
                  SizedBox(height: 20),
                  _buildConfirmPasswordField(controller: confirmPasswordController),
                  SizedBox(height: 30),
                  _buildButton(submit: submit),
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

  _buildPasswordField({required TextEditingController controller}) {
    return BlocBuilder<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      builder: (context, state) {
        return AppInputField(
          label: "Password",
          keyboardType: TextInputType.none,
          hintText: "Enter your password",
          prefixIcon: Icon(Icons.lock_outlined),
          validator: (value) => AppValidators.password(value),
          controller: controller,
          disabled: state is ResetPasswordLoading,
          obscureText: true,
        );
      },
    );
  }

  _buildConfirmPasswordField({required TextEditingController controller}) {
    return BlocBuilder<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      builder: (context, state) {
        return AppInputField(
          label: "Confirm Password",
          keyboardType: TextInputType.none,
          hintText: "Confirm your password",
          prefixIcon: Icon(Icons.lock_outlined),
          disabled: state is ResetPasswordLoading,
          controller: controller,
          validator: (value) {
            String? errorMessage = AppValidators.password(value);

            if (errorMessage == null) {
              if (value == "") {
                errorMessage = "passwords do not match";
              }
            }

            return errorMessage;
          },
          obscureText: true,
        );
      },
    );
  }

  _buildButton({required VoidCallback submit}) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is ResetPasswordSuccess) {
          context.goNamed(AuthRoutes.signIn);
        }
      },
      builder: (context, state) {
        return ContainedButton(
          width: double.maxFinite,
          child: Text("Reset Password"),
          onPressed: () {
            if (formKey.currentState != null && formKey.currentState!.validate()) {
              submit();
            }
          },
          loading: state is ResetPasswordLoading,
        );
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
