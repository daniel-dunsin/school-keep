// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/student/models/user_model.dart';

class SchoolModel {
  final String id;
  final String acronym;
  final String name;
  final String logo;
  final String motto;
  final String webUrl;

  SchoolModel({
    required this.id,
    required this.acronym,
    required this.name,
    required this.logo,
    required this.motto,
    required this.webUrl,
  });

  SchoolModel copyWith({
    String? id,
    String? acronym,
    String? name,
    String? logo,
    String? motto,
    String? webUrl,
    User? manager,
  }) {
    return SchoolModel(
      id: id ?? this.id,
      acronym: acronym ?? this.acronym,
      name: name ?? this.name,
      logo: logo ?? this.logo,
      motto: motto ?? this.motto,
      webUrl: webUrl ?? this.webUrl,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'acronym': acronym,
      'name': name,
      'logo': logo,
      'motto': motto,
      'webUrl': webUrl,
    };
  }

  factory SchoolModel.fromMap(Map map) {
    return SchoolModel(
      id: map['_id'] as String,
      acronym: map['acronym'] as String,
      name: map['name'] as String,
      logo: map['logo'] as String,
      motto: map['motto'] as String,
      webUrl: map['webUrl'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory SchoolModel.fromJson(String source) => SchoolModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'SchoolModel(id: $id, acronym: $acronym, name: $name, logo: $logo, motto: $motto, webUrl: $webUrl)';
  }
}
