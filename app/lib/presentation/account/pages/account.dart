import 'package:app/configs/app_config.dart';
import 'package:app/data/student/models/user_model.dart';
import 'package:app/presentation/account/blocs/account_bloc.dart';
import 'package:app/presentation/account/widgets/theme_switcher.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  final user = getIt.get<User>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          _buildAvatarSection(),
          Expanded(
            child: _buildAccountOptions(),
          ),
        ],
      ),
      floatingActionButton: ThemeSwitcher(),
    );
  }

  _buildAvatarSection() {
    return Container(
      color: getColorScheme(context).surface,
      padding: EdgeInsets.all(20),
      width: double.maxFinite,
      child: SafeArea(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 120,
              height: 120,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Stack(
                  children: [
                    AppImage(
                      image: user.profilePicture,
                      width: double.maxFinite,
                      height: double.maxFinite,
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: IconButton(
                        onPressed: () {},
                        icon: Icon(
                          Icons.emoji_emotions_outlined,
                          color: AppColors.white,
                          size: 30,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(width: 30),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${user.firstName} ${user.lastName}",
                    style: getTextTheme(context).titleLarge?.copyWith(
                          color: AppColors.white,
                        ),
                  ),
                  SizedBox(height: 30),
                  Text(
                    "${user.student?.matricNumber}",
                    style: getTextTheme(context).titleSmall?.copyWith(
                          color: AppColors.white,
                        ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  _buildAccountOptions() {
    return SingleChildScrollView(
      padding: AppStyles.defaultPagePadding.copyWith(left: 20, right: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSingleAccountOption(
            leadingIcon: Icons.person_2_outlined,
            title: "Profile Details",
            onClick: () {},
          ),
          SizedBox(height: 10),
          _buildSingleAccountOption(
            leadingIcon: Icons.help_outline_outlined,
            title: "Get Help",
            onClick: () {},
          ),
          SizedBox(height: 18),
          _buildSignOut(),
        ],
      ),
    );
  }

  _buildSingleAccountOption({
    required IconData leadingIcon,
    required String title,
    required VoidCallback onClick,
  }) {
    return ListTile(
      onTap: onClick,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(5),
      ),
      contentPadding: EdgeInsets.symmetric(
        vertical: 8,
      ),
      leading: Icon(
        leadingIcon,
      ),
      title: Text(
        title,
        style: getTextTheme(context).titleMedium,
      ),
      trailing: Icon(
        Icons.arrow_forward_ios_outlined,
        size: 20.sp,
      ),
    );
  }

  _buildSignOut() {
    void signOut() {
      print("hiii");
      getIt.get<AccountBloc>().add(SignOutRequested());
    }

    return BlocConsumer<AccountBloc, AccountState>(
      bloc: getIt.get<AccountBloc>(),
      listener: (context, state) {
        if (state is SignOutSuccessful) {
          NetworkToast.handleSuccess("Signed out successfully");
          context.goNamed(AuthRoutes.signIn);
        }
      },
      builder: (context, state) {
        return GestureDetector(
          onTap: state is! SignOutLoading ? signOut : null,
          child: Text.rich(
            TextSpan(
              style: getTextTheme(context).titleLarge?.copyWith(
                    color: getColorScheme(context).onPrimary,
                  ),
              children: [
                WidgetSpan(
                  alignment: PlaceholderAlignment.middle,
                  child: state is SignOutLoading
                      ? AppLoader()
                      : Icon(
                          Icons.logout_outlined,
                          color: getColorScheme(context).onPrimary,
                        ),
                ),
                WidgetSpan(
                  child: SizedBox(width: 18),
                ),
                TextSpan(
                  text: state is SignOutLoading ? "Signing Out" : "Sign Out",
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
