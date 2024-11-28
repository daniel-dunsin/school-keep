import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/cubits/app_state.dart';
import 'package:app/shared/utils/storage.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AppCubit extends Cubit<AppState> {
  AppCubit() : super(AppState()) {}

  changeTheme(AppTheme? theme) async {
    if (theme == null) {
      await AppStorage.removeKey(AppStorageKeys.theme);
      emit(
        state.copyWith(
          appTheme: null,
          enforceAppTheme: true,
        ),
      );
    } else {
      await AppStorage.saveString(
        key: AppStorageKeys.theme,
        value: theme.name,
      );
      emit(
        state.copyWith(
          appTheme: theme,
          enforceAppTheme: true,
        ),
      );
    }
  }

  Future<void> setAppTheme() async {
    final String? theme = await AppStorage.getString(AppStorageKeys.theme);

    if (theme == null) {
      emit(
        state.copyWith(
          appTheme: null,
          enforceAppTheme: true,
        ),
      );
      return;
    }

    final AppTheme themeEnum = AppTheme.values.firstWhere((t) => t.name == theme);

    switch (themeEnum) {
      case AppTheme.light:
        emit(
          state.copyWith(
            appTheme: themeEnum,
            enforceAppTheme: true,
          ),
        );
        break;

      case AppTheme.dark:
        emit(
          state.copyWith(
            appTheme: themeEnum,
            enforceAppTheme: true,
          ),
        );
        break;
    }
  }

  Map<AppTheme, AppTheme> getTheme(AppTheme? theme) {
    switch (theme) {
      case null:
        return {
          AppTheme.light: AppTheme.light,
          AppTheme.dark: AppTheme.dark,
        };

      case AppTheme.light:
        return {
          AppTheme.dark: AppTheme.light,
          AppTheme.light: AppTheme.light,
        };

      case AppTheme.dark:
        return {
          AppTheme.dark: AppTheme.dark,
          AppTheme.light: AppTheme.dark,
        };
    }
  }
}
