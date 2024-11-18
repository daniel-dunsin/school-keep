// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class CollegeModel {
  final String? id;
  final String name;
  final String? unionName;
  final String? logo;

  CollegeModel({
    this.id,
    required this.name,
    this.unionName,
    this.logo,
  });

  CollegeModel copyWith({
    String? id,
    String? name,
    String? unionName,
    String? logo,
  }) {
    return CollegeModel(
      id: id ?? this.id,
      name: name ?? this.name,
      unionName: unionName ?? this.unionName,
      logo: logo ?? this.logo,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'unionName': unionName,
      'logo': logo,
    };
  }

  factory CollegeModel.fromMap(Map map) {
    return CollegeModel(
      id: map['id'] != null ? map['id'] as String : null,
      name: map['name'] as String,
      unionName: map['unionName'] != null ? map['unionName'] as String : null,
      logo: map['logo'] != null ? map['logo'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory CollegeModel.fromJson(String source) => CollegeModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'CollegeModel(id: $id, name: $name, unionName: $unionName, logo: $logo)';
  }

  @override
  bool operator ==(covariant CollegeModel other) {
    if (identical(this, other)) return true;

    return other.id == id && other.name == name && other.unionName == unionName && other.logo == logo;
  }

  @override
  int get hashCode {
    return id.hashCode ^ name.hashCode ^ unionName.hashCode ^ logo.hashCode;
  }
}
