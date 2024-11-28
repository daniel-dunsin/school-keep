// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/constants/constants.dart';

class AppState {
  final AppTheme? appTheme;

  AppState({this.appTheme});

  AppState copyWith({
    AppTheme? appTheme,
    bool? enforceAppTheme,
  }) {
    return AppState(
      appTheme: enforceAppTheme == true ? appTheme : appTheme ?? this.appTheme,
    );
  }
}
