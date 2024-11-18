// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/school/models/college_model.dart';

class DepartmentModel {
  final String id;
  final String name;
  final String? unionName;
  final String? logo;
  final int levelsCount;
  final CollegeModel? college;

  DepartmentModel({
    required this.id,
    required this.name,
    this.unionName,
    this.logo,
    required this.levelsCount,
    this.college,
  });

  DepartmentModel copyWith({
    String? id,
    String? name,
    String? unionName,
    String? logo,
    int? levelsCount,
    CollegeModel? college,
  }) {
    return DepartmentModel(
      id: id ?? this.id,
      name: name ?? this.name,
      unionName: unionName ?? this.unionName,
      logo: logo ?? this.logo,
      levelsCount: levelsCount ?? this.levelsCount,
      college: college ?? this.college,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'unionName': unionName,
      'logo': logo,
      'levelsCount': levelsCount,
      'college': college?.toMap(),
    };
  }

  factory DepartmentModel.fromMap(Map map) {
    return DepartmentModel(
      id: map['id'] as String,
      name: map['name'] as String,
      unionName: map['unionName'] != null ? map['unionName'] as String : null,
      logo: map['logo'] != null ? map['logo'] as String : null,
      levelsCount: map['levelsCount'] as int,
      college: map['college'] != null ? CollegeModel.fromMap(map['college']) : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory DepartmentModel.fromJson(String source) => DepartmentModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'DepartmentModel(id: $id, name: $name, unionName: $unionName, logo: $logo, levelsCount: $levelsCount, college: $college)';
  }

  @override
  bool operator ==(covariant DepartmentModel other) {
    if (identical(this, other)) return true;

    return other.id == id && other.name == name && other.unionName == unionName && other.logo == logo && other.levelsCount == levelsCount && other.college == college;
  }

  @override
  int get hashCode {
    return id.hashCode ^ name.hashCode ^ unionName.hashCode ^ logo.hashCode ^ levelsCount.hashCode ^ college.hashCode;
  }
}
