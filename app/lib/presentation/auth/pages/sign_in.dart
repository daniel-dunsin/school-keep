import 'package:app/configs/app_config.dart';
import 'package:app/data/auth/models/login_model.dart';
import 'package:app/presentation/auth/bloc/auth_bloc.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/checkbox.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  bool rememberMe = false;
  late TextEditingController _emailController;
  late TextEditingController _passwordController;

  toggleRememberMe() {
    setState(() {
      rememberMe = !rememberMe;
    });
  }

  submit() {
    getIt.get<AuthBloc>().add(
          LoginRequested(
            LoginModel(
              email: _emailController.text,
              password: _passwordController.text,
              rememberMe: rememberMe,
            ),
          ),
        );
  }

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
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
                  ..._loginTitle,
                  SizedBox(height: 30),
                  _buildEmailField(controller: _emailController),
                  SizedBox(height: 20),
                  _buildPasswordField(controller: _passwordController),
                  SizedBox(height: 20),
                  _buildExtras(rememberMe: rememberMe, toggleRemember: toggleRememberMe),
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

  _buildEmailField({required TextEditingController controller, bool disabled = false}) {
    return AppInputField(
      label: "Email Address",
      keyboardType: TextInputType.emailAddress,
      hintText: "Enter your school registered email address",
      prefixIcon: Icon(Icons.mail_outline),
      validator: (value) => AppValidators.email(value),
      disabled: disabled,
      controller: controller,
    );
  }

  _buildPasswordField({required TextEditingController controller, bool disabled = false}) {
    return AppInputField(
      label: "Password",
      keyboardType: TextInputType.none,
      hintText: "Enter your password",
      prefixIcon: Icon(Icons.lock_outlined),
      obscureText: true,
      validator: (value) => AppValidators.defaultValidator(value),
      disabled: disabled,
      controller: controller,
    );
  }

  _buildExtras({required VoidCallback toggleRemember, required bool rememberMe}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        AppCheckbox(
          value: rememberMe,
          onChanged: (e) {
            toggleRemember();
          },
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

  _buildButton({required VoidCallback submit}) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is LoginSuccess) {
          NetworkToast.handleSuccess("Welcome ${state.user.firstName}");
        }
      },
      builder: (context, state) {
        return ContainedButton(
          width: double.maxFinite,
          child: Text("Sign In"),
          loading: state is LoginLoading,
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
