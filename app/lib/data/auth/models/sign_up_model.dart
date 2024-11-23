// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';
import 'dart:io';

import 'package:app/data/school/models/college_model.dart';
import 'package:app/data/school/models/department_model.dart';
import 'package:app/data/school/models/school_model.dart';
import 'package:app/shared/utils/file.dart';

class SignUpModel {
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? phoneNumber;
  final File? profilePicture;
  final SchoolModel? school;
  final String? matricNumber;
  final DepartmentModel? department;
  final CollegeModel? college;
  final String? password;

  SignUpModel({
    this.firstName,
    this.lastName,
    this.email,
    this.phoneNumber,
    this.profilePicture,
    this.school,
    this.matricNumber,
    this.department,
    this.college,
    this.password,
  });

  SignUpModel copyWith({
    String? firstName,
    String? lastName,
    String? email,
    String? phoneNumber,
    File? profilePicture,
    bool forceUpdateProfilePicture = false,
    SchoolModel? school,
    String? matricNumber,
    DepartmentModel? department,
    CollegeModel? college,
    String? password,
  }) {
    return SignUpModel(
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      profilePicture: forceUpdateProfilePicture ? profilePicture : profilePicture ?? this.profilePicture,
      school: school ?? this.school,
      matricNumber: matricNumber ?? this.matricNumber,
      department: department ?? this.department,
      college: college ?? this.college,
      password: password ?? this.password,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phoneNumber': phoneNumber,
      'school': school?.id,
      'matricNumber': matricNumber,
      'department': department?.id,
      'password': password,
      'profilePicture': profilePicture != null
          ? FileUtils.convertImageToBase64(
              profilePicture!,
            )
          : null,
    };
  }

  factory SignUpModel.fromMap(Map<String, dynamic> map) {
    return SignUpModel(
      firstName: map['firstName'] != null ? map['firstName'] as String : null,
      lastName: map['lastName'] != null ? map['lastName'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      phoneNumber: map['phoneNumber'] != null ? map['phoneNumber'] as String : null,
      profilePicture: map['profilePicture'] != null ? map["profilePicture"] : null,
      school: map['school'] != null ? SchoolModel.fromMap(map['school'] as Map<String, dynamic>) : null,
      matricNumber: map['matricNumber'] != null ? map['matricNumber'] as String : null,
      department: map['department'] != null ? DepartmentModel.fromMap(map['department'] as Map<String, dynamic>) : null,
      password: map['password'] != null ? map['password'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory SignUpModel.fromJson(String source) => SignUpModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'SignUpModel(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, profilePicture: $profilePicture, school: $school, matricNumber: $matricNumber, department: $department, password: $password)';
  }

  @override
  bool operator ==(covariant SignUpModel other) {
    if (identical(this, other)) return true;

    return other.firstName == firstName && other.lastName == lastName && other.email == email && other.phoneNumber == phoneNumber && other.profilePicture == profilePicture && other.school == school && other.matricNumber == matricNumber && other.department == department && other.password == password;
  }

  @override
  int get hashCode {
    return firstName.hashCode ^ lastName.hashCode ^ email.hashCode ^ phoneNumber.hashCode ^ profilePicture.hashCode ^ school.hashCode ^ matricNumber.hashCode ^ department.hashCode ^ password.hashCode;
  }
}
