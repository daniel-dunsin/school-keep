import 'dart:convert';

// ignore_for_file: public_member_api_docs, sort_constructors_first
class FolderModel {
  String id;
  int level;
  String folderName;
  bool isCustom;
  FolderModel({
    required this.id,
    required this.level,
    required this.folderName,
    required this.isCustom,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'level': level,
      'folderName': folderName,
      'isCustom': isCustom,
    };
  }

  factory FolderModel.fromMap(Map map) {
    return FolderModel(
      id: map['_id'] as String,
      level: map['level'] as int,
      folderName: map['folderName'] as String,
      isCustom: map['isCustom'] as bool,
    );
  }

  String toJson() => json.encode(toMap());

  factory FolderModel.fromJson(String source) => FolderModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
