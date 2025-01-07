// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:io';

import 'package:dio/dio.dart';

class UpdateDocumentModel {
  final String? documentName;
  final File? file;
  final CancelToken cancelToken;
  UpdateDocumentModel({
    this.documentName,
    this.file,
    required this.cancelToken,
  });

  Future<FormData> toFormData() async {
    final Map<String, dynamic> formDataMap = {};

    if (documentName != null) {
      formDataMap["documentName"] = documentName;
    }

    if (file != null) {
      formDataMap["file"] = await MultipartFile.fromFile(file!.path);
    }

    final FormData formData = await FormData.fromMap(formDataMap);

    return formData;
  }
}
