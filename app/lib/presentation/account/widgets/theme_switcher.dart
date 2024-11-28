import 'package:app/configs/app_config.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/cubits/app_cubit.dart';
import 'package:app/shared/cubits/app_state.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class ThemeSwitcher extends StatefulWidget {
  const ThemeSwitcher({super.key});

  @override
  State<ThemeSwitcher> createState() => _ThemeSwitcherState();
}

class _ThemeSwitcherState extends State<ThemeSwitcher> {
  void changeTheme(AppTheme? theme) {
    getIt.get<AppCubit>().changeTheme(theme);
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        AppBottomSheet.display(
          context,
          bottomSheetContents: [
            Padding(
              padding: EdgeInsets.all(20),
              child: BlocBuilder<AppCubit, AppState>(
                bloc: getIt.get<AppCubit>(),
                builder: (context, state) {
                  final theme = state.appTheme;

                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Theme",
                        style: getTextTheme(context).titleLarge?.copyWith(
                              color: getColorScheme(context).onPrimary,
                            ),
                      ),
                      SizedBox(height: 30),
                      _buildThemeSelector(
                        selected: theme == AppTheme.light,
                        onSelect: () => changeTheme(AppTheme.light),
                        label: "Light Theme",
                      ),
                      SizedBox(height: 15),
                      _buildThemeSelector(
                        selected: theme == AppTheme.dark,
                        onSelect: () => changeTheme(AppTheme.dark),
                        label: "Dark Theme",
                      ),
                      SizedBox(height: 15),
                      _buildThemeSelector(
                        selected: theme == null,
                        onSelect: () => changeTheme(null),
                        label: "System Default",
                      ),
                      SizedBox(height: 15),
                    ],
                  );
                },
              ),
            ),
          ],
        );
      },
      child: Icon(
        Icons.dark_mode_outlined,
      ),
    );
  }

  _buildThemeSelector({
    required bool selected,
    required VoidCallback onSelect,
    required String label,
  }) {
    return SizedBox(
      width: double.maxFinite,
      child: InkWell(
        onTap: onSelect,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 20.0),
          decoration: BoxDecoration(
            color: selected ? AppColors.mainExtraLight : Colors.transparent,
            border: Border.all(
              style: BorderStyle.solid,
              width: 1.2,
              color: getColorScheme(context).onPrimary,
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label,
                style: getTextTheme(context).bodyLarge?.copyWith(
                      color: selected ? AppColors.mainDark : getColorScheme(context).onPrimary,
                    ),
              ),
              if (selected)
                Icon(
                  Icons.check_circle,
                  color: AppColors.mainDark,
                ),
              if (!selected)
                Icon(
                  Icons.circle_outlined,
                  color: getColorScheme(context).onPrimary,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
