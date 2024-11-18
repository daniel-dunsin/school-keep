// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/school/models/department_model.dart';
import 'package:app/data/student/enums/student_enums.dart';

class StudentModel {
  final String id;
  final String matricNumber;
  final StudentStatus status;

  final DepartmentModel? department;
  StudentModel({
    required this.id,
    required this.matricNumber,
    required this.status,
    this.department,
  });

  StudentModel copyWith({
    String? id,
    String? matricNumber,
    StudentStatus? status,
    DepartmentModel? department,
  }) {
    return StudentModel(
      id: id ?? this.id,
      matricNumber: matricNumber ?? this.matricNumber,
      status: status ?? this.status,
      department: department ?? this.department,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'matricNumber': matricNumber,
      'status': status.name,
      'department': department?.toMap(),
    };
  }

  factory StudentModel.fromMap(Map map) {
    return StudentModel(
      id: map['id'] as String,
      matricNumber: map['matricNumber'] as String,
      status: StudentStatus.values.firstWhere((v) => v.name == map["status"]),
      department: map['department'] != null ? DepartmentModel.fromMap(map['department'] as Map<String, dynamic>) : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory StudentModel.fromJson(String source) => StudentModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'StudentModel(id: $id, matricNumber: $matricNumber, status: $status, department: $department)';
  }

  @override
  bool operator ==(covariant StudentModel other) {
    if (identical(this, other)) return true;

    return other.id == id && other.matricNumber == matricNumber && other.status == status && other.department == department;
  }

  @override
  int get hashCode {
    return id.hashCode ^ matricNumber.hashCode ^ status.hashCode ^ department.hashCode;
  }
}
