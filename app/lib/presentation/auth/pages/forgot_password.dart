import 'package:app/configs/app_config.dart';
import 'package:app/presentation/auth/bloc/auth_bloc.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  late TextEditingController emailController;

  @override
  void initState() {
    super.initState();
    emailController = TextEditingController();
  }

  @override
  void dispose() {
    emailController.dispose();
    super.dispose();
  }

  void submit() {
    getIt.get<AuthBloc>().add(
          ForgotPasswordRequested(
            email: emailController.text,
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
                  _buildEmailField(controller: emailController),
                  SizedBox(height: 30),
                  _buildButton(submit: submit, emailController: emailController),
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

  _buildEmailField({required TextEditingController controller}) {
    return BlocBuilder<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      builder: (context, state) {
        return AppInputField(
          label: "Email Address",
          keyboardType: TextInputType.emailAddress,
          hintText: "Enter your school registered email address",
          prefixIcon: Icon(Icons.mail_outline),
          validator: (value) => AppValidators.email(value),
          disabled: state is ForgotPasswordLoading,
          controller: controller,
        );
      },
    );
  }

  _buildButton({required VoidCallback submit, required TextEditingController emailController}) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is ForgotPasswordSuccess) {
          NetworkToast.handleSuccess("Password reset otp sent");
          context.pushNamed(
            AuthRoutes.confirmForgotPassword,
            extra: {
              "email": emailController.text,
            },
          );
        }
      },
      builder: (context, state) {
        return ContainedButton(
          width: double.maxFinite,
          child: Text("Request OTP"),
          loading: state is ForgotPasswordLoading,
          onPressed: () {
            if (formKey.currentState != null && formKey.currentState!.validate()) {
              submit();
            }
          },
        );
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
