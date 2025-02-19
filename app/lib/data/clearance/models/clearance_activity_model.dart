// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/student/models/user_model.dart';

class ClearanceActivityModel {
  final String id;
  final String content;
  final User? actor;
  final DateTime createdAt;

  ClearanceActivityModel({
    required this.id,
    required this.content,
    this.actor,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'content': content,
      'actor': actor?.toMap(),
      'createdAt': createdAt.millisecondsSinceEpoch,
    };
  }

  factory ClearanceActivityModel.fromMap(Map map) {
    return ClearanceActivityModel(
      id: map['id'] as String,
      content: map['content'] as String,
      actor: map['actor'] != null ? User.fromMap(map['actor']) : null,
      createdAt: DateTime.parse(map['createdAt'] as String),
    );
  }

  String toJson() => json.encode(toMap());

  factory ClearanceActivityModel.fromJson(String source) => ClearanceActivityModel.fromMap(json.decode(source));
}
