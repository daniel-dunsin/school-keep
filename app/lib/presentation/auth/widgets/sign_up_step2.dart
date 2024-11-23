import 'package:app/configs/app_config.dart';
import 'package:app/presentation/auth/bloc/sign_up_steps_bloc/sign_up_steps_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/utils/validators.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';

class SignUpStep2 extends StatefulWidget {
  const SignUpStep2({super.key});

  @override
  State<SignUpStep2> createState() => _SignUpStep2State();
}

class _SignUpStep2State extends State<SignUpStep2> {
  late TextEditingController firstNameController;
  late TextEditingController lastNameController;
  late TextEditingController emailController;
  late TextEditingController phoneNumberController;
  late TextEditingController matricNumberController;
  late TextEditingController passwordController;
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    loadInitialFields();
  }

  void loadInitialFields() {
    final data = getIt.get<SignUpStepsBloc>().state.signUpModel;

    firstNameController = TextEditingController(text: data.firstName);
    lastNameController = TextEditingController(text: data.lastName);
    emailController = TextEditingController(text: data.email);
    phoneNumberController = TextEditingController(text: data.phoneNumber);
    matricNumberController = TextEditingController(text: data.matricNumber);
    passwordController = TextEditingController(text: data.password);
  }

  void submit(bool isNext) {
    final currentData = getIt.get<SignUpStepsBloc>().state.signUpModel;

    final newData = currentData.copyWith(
      firstName: firstNameController.text,
      lastName: lastNameController.text,
      email: emailController.text,
      phoneNumber: phoneNumberController.text,
      matricNumber: matricNumberController.text,
      password: passwordController.text,
    );

    getIt.get<SignUpStepsBloc>().add(
          isNext ? SignUpStepsNextRequested(newData) : SignUpStepsPreviousRequested(signUpModel: newData),
        );
  }

  @override
  void dispose() {
    super.dispose();
    firstNameController.dispose();
    lastNameController.dispose();
    emailController.dispose();
    matricNumberController.dispose();
    passwordController.dispose();
    formKey.currentState?.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: AppStyles.defaultPagePadding.copyWith(
              top: 50,
              bottom: 0,
            ),
            child: Form(
              key: formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ..._title,
                  SizedBox(height: 20),
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: AppInputField(
                                  label: "First Name",
                                  hintText: "enter first name",
                                  validator: (value) => AppValidators.defaultValidator(value),
                                  controller: firstNameController,
                                ),
                              ),
                              SizedBox(width: 20),
                              Expanded(
                                child: AppInputField(
                                  label: "Last Name",
                                  hintText: "enter last name",
                                  validator: (value) => AppValidators.defaultValidator(value),
                                  controller: lastNameController,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 20),
                          AppInputField(
                            label: "Email",
                            hintText: "enter email",
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) => AppValidators.email(value),
                            controller: emailController,
                          ),
                          SizedBox(height: 20),
                          AppInputField(
                            label: "Phone Number",
                            hintText: "enter phone number",
                            keyboardType: TextInputType.phone,
                            validator: (value) => AppValidators.defaultValidator(value),
                            controller: phoneNumberController,
                          ),
                          SizedBox(height: 20),
                          AppInputField(
                            label: "Matric Number",
                            hintText: "enter matric number",
                            validator: (value) => AppValidators.defaultValidator(value),
                            controller: matricNumberController,
                          ),
                          SizedBox(height: 20),
                          AppInputField(
                            label: "Password",
                            hintText: "enter password",
                            obscureText: true,
                            validator: (value) => AppValidators.password(value),
                            controller: passwordController,
                          ),
                        ],
                      ),
                    ),
                  ),
                  _buildNavigators(context, submit: submit),
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
          "Sign Up",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 7),
        Text(
          "Add your personal information to continue 🏫",
          style: getTextTheme(context).bodySmall,
        ),
      ];

  _buildNavigators(BuildContext context, {required Function(bool isNext) submit}) {
    return Row(
      children: [
        Expanded(
          child: GestureDetector(
            onTap: () {
              submit(false);
              getIt.get<SignUpStepsBloc>().add(SignUpStepsPreviousRequested());
            },
            child: Text(
              "back",
            ),
          ),
          flex: 1,
        ),
        Expanded(
          child: ContainedButton(
            width: double.maxFinite,
            height: 55,
            iconAlignment: IconAlignment.end,
            onPressed: () {
              if (formKey.currentState != null && formKey.currentState!.validate()) {
                submit(true);
              }
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Icon(
                  Icons.arrow_forward_sharp,
                  size: 20,
                )
              ],
            ),
          ),
          flex: 3,
        ),
      ],
    );
  }
}
