// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:io';

import 'package:dio/dio.dart';

class AddDocumentModel {
  final String documentName;
  final String folder;
  final File file;
  final CancelToken cancelToken;

  AddDocumentModel({
    required this.documentName,
    required this.folder,
    required this.file,
    required this.cancelToken,
  });

  Future<FormData> toFormData() async {
    final FormData formData = await FormData.fromMap({
      "documentName": documentName,
      "folder": folder,
      "file": MultipartFile.fromFileSync(
        file.path,
        filename: documentName,
      ),
    });

    return formData;
  }
}
