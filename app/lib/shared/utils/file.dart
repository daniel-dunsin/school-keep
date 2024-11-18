import 'dart:convert';
import 'dart:io';

import 'package:app/shared/network/network_toast.dart';

class FileUtils {
  static String convertImageToBase64(File file) {
    try {
      final bytes = file.readAsBytesSync();

      final encodedImage = base64Encode(bytes);

      return "data:image/png;base64,$encodedImage";
    } catch (e) {
      NetworkToast.handleError(e);
      rethrow;
    }
  }

  static File convertBase64ToImage(String base64String) {
    try {
      final decodedString = base64String.split(',').last;

      final bytes = base64Decode(decodedString);

      final file = File.fromRawPath(bytes);

      return file;
    } catch (e) {
      NetworkToast.handleError(e);
      rethrow;
    }
  }
}