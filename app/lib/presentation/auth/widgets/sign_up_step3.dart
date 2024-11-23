import 'package:app/configs/app_config.dart';
import 'package:app/presentation/auth/bloc/auth_bloc/auth_bloc.dart';
import 'package:app/presentation/auth/bloc/sign_up_steps_bloc/sign_up_steps_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/file.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/dp.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SignUpStep3 extends StatefulWidget {
  const SignUpStep3({super.key});

  @override
  State<SignUpStep3> createState() => _SignUpStep3State();
}

class _SignUpStep3State extends State<SignUpStep3> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: AppStyles.defaultPagePadding.copyWith(
            top: 50,
            bottom: 0,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              ..._title,
              Expanded(child: _buildProfilePictureSelector()),
              _buildNavigators(context),
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
          "Add profile picture (optional)",
          style: getTextTheme(context).bodySmall,
        ),
      ];

  _buildProfilePictureSelector() {
    return BlocBuilder<SignUpStepsBloc, SignUpStepsState>(
      bloc: getIt.get<SignUpStepsBloc>(),
      builder: (context, state) {
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Dp(
                size: 250,
                fileImage: state.signUpModel.profilePicture,
                onPressed: () async {
                  final image = await FileUtils.pickImage();

                  getIt.get<SignUpStepsBloc>().add(
                        SignUpStepsSetSameStepFieldRequested(
                          signUpModel: state.signUpModel.copyWith(
                            profilePicture: image,
                            forceUpdateProfilePicture: true,
                          ),
                        ),
                      );
                },
              ),
              SizedBox(height: 20),
              Visibility(
                child: ContainedButton(
                  onPressed: () {
                    getIt.get<SignUpStepsBloc>().add(
                          SignUpStepsSetSameStepFieldRequested(
                            signUpModel: state.signUpModel.copyWith(
                              profilePicture: null,
                              forceUpdateProfilePicture: true,
                            ),
                          ),
                        );
                  },
                  height: 40,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text("Remove"),
                      SizedBox(width: 10),
                      Icon(Icons.close),
                    ],
                  ),
                ),
                visible: state.signUpModel.profilePicture != null,
              )
            ],
          ),
        );
      },
    );
  }

  _buildNavigators(BuildContext context) {
    return BlocBuilder<SignUpStepsBloc, SignUpStepsState>(
      bloc: getIt.get<SignUpStepsBloc>(),
      builder: (context, signUpStepsState) {
        return BlocConsumer<AuthBloc, AuthState>(
          bloc: getIt.get<AuthBloc>(),
          listener: (context, state) {
            if (state is SignUpSuccess) {
              NetworkToast.handleSuccess("Welcome ${state.user.firstName}");
            }
          },
          builder: (context, state) {
            return Row(
              children: [
                Visibility(
                  child: Expanded(
                    child: GestureDetector(
                      onTap: () {
                        getIt.get<SignUpStepsBloc>().add(
                              SignUpStepsPreviousRequested(),
                            );
                      },
                      child: Text(
                        "back",
                      ),
                    ),
                    flex: 1,
                  ),
                  visible: state is! SignUpLoading,
                ),
                Expanded(
                  child: ContainedButton(
                    width: double.maxFinite,
                    height: 55,
                    iconAlignment: IconAlignment.end,
                    onPressed: () {
                      getIt.get<AuthBloc>().add(
                            SignUpRequested(
                              signUpStepsState.signUpModel,
                            ),
                          );
                    },
                    loading: state is SignUpLoading,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text("Register"),
                      ],
                    ),
                  ),
                  flex: 2,
                ),
              ],
            );
          },
        );
      },
    );
  }
}
