// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/data/student/models/user_model.dart';

class DocumentModel {
  String name;
  String id;
  int? version;
  String mediaType;
  String url;
  User uploadedBy;
  FolderModel? folder;
  String? folderId;
  DateTime? createdAt;
  String? reference;

  DocumentModel({
    required this.id,
    required this.name,
    required this.version,
    required this.mediaType,
    required this.url,
    required this.uploadedBy,
    required this.folder,
    this.folderId,
    this.reference,
    this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'version': version,
      'mediaType': mediaType,
      'url': url,
      'uploadedBy': uploadedBy.toMap(),
      'folder': folder?.toMap(),
      'createdAt': createdAt,
      'reference': reference,
    };
  }

  factory DocumentModel.fromMap(Map map) {
    return DocumentModel(
      id: map['_id'] as String,
      version: map['version'],
      mediaType: map['mediaType'] as String,
      url: map['url'] as String,
      uploadedBy: User.fromMap(map['uploadedBy'] as Map<String, dynamic>),
      folder: map["folder"] != null && map["folder"] is Map ? FolderModel.fromMap(map['folder']) : null,
      folderId: map["folder"] != null && map["folder"].runtimeType.toString() == "String" ? map["folder"] : null,
      name: map["documentName"] ?? "",
      createdAt: map["createdAt"] != null ? DateTime.parse(map["createdAt"]) : null,
      reference: map["reference"],
    );
  }

  String toJson() => json.encode(toMap());

  factory DocumentModel.fromJson(String source) => DocumentModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
