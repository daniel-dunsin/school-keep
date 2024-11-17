import 'package:shared_preferences/shared_preferences.dart';

class AppStorage {
  static saveString({required String key, required String value}) async {
    await SharedPreferencesAsync().setString(key, value);
  }

  static saveBool({required String key, required bool value}) async {
    await SharedPreferencesAsync().setBool(key, value);
  }

  static saveDouble({required String key, required double value}) async {
    await SharedPreferencesAsync().setDouble(key, value);
  }

  static saveStringList({required String key, required List<String> value}) async {
    await SharedPreferencesAsync().setStringList(key, value);
  }

  static Future<String?> getString(String key) async {
    return await SharedPreferencesAsync().getString(key);
  }

  static Future<bool?> getBool(String key) async {
    return await SharedPreferencesAsync().getBool(key);
  }

  static Future<double?> getDouble(String key) async {
    return await SharedPreferencesAsync().getDouble(key);
  }

  static Future<List<String>?> getStringList(String key) async {
    return await SharedPreferencesAsync().getStringList(key);
  }

  static removeKey(String key) async {
    await SharedPreferencesAsync().remove(key);
  }
}

class AppStorageKeys {
  static String onboarded = "onboarded";
  static String accessToken = "accessToken";
}
