// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/app_config.dart';
import 'package:app/data/auth/models/confirm_otp_model.dart';
import 'package:app/presentation/auth/bloc/auth_bloc.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
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

  late TextEditingController codeController;

  @override
  void initState() {
    super.initState();
    codeController = TextEditingController();
  }

  @override
  void dispose() {
    super.dispose();
    codeController.dispose();
  }

  void submit() {
    getIt.get<AuthBloc>().add(
          ConfirmPasswordOtpRequested(
            ConfirmOtpModel(
              code: codeController.text,
              email: widget.email,
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
                  _buildOtpField(controller: codeController),
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
          "Confirm OTP",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 4),
        Text(
          "Confirm the password reset otp sent to your email address (${widget.email})",
          style: getTextTheme(context).bodySmall,
        ),
      ];

  _buildOtpField({required TextEditingController controller}) {
    return BlocBuilder<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      builder: (context, state) {
        return AppInputField(
          keyboardType: TextInputType.numberWithOptions(decimal: false),
          hintText: "Enter your 4 digits One Time Password",
          validator: (value) {
            String? error = AppValidators.defaultValidator(value);
            if (error == null && value.length != 4) {
              error = "Code must be 4 characters";
            }
            return error;
          },
          controller: controller,
          disabled: state is ConfirmPasswordResetOtpLoading,
        );
      },
    );
  }

  _buildButton({required VoidCallback submit}) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is ConfirmPasswordResetOtpSuccess) {
          context.pushNamed(
            AuthRoutes.resetPassword,
            extra: {
              "tempToken": state.tempToken,
            },
          );
        }
      },
      builder: (context, state) {
        return ContainedButton(
          width: double.maxFinite,
          child: Text("Confirm OTP"),
          loading: state is ConfirmPasswordResetOtpLoading,
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
