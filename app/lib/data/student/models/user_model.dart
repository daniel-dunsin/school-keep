// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/school/models/school_model.dart';

class User {
  final String id;
  final String firstName;
  final String lastName;
  final String email;
  final String profilePicture;
  final SchoolModel? school;

  User({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.profilePicture,
    this.school,
  });

  User copyWith({
    String? id,
    String? firstName,
    String? lastName,
    String? email,
    String? profilePicture,
    SchoolModel? school,
  }) {
    return User(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      profilePicture: profilePicture ?? this.profilePicture,
      school: school ?? this.school,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'profilePicture': profilePicture,
      'school': school?.toMap(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] as String,
      firstName: map['firstName'] as String,
      lastName: map['lastName'] as String,
      email: map['email'] as String,
      profilePicture: map['profilePicture'] as String,
      school: map['school'] != null ? SchoolModel.fromMap(map['school'] as Map<String, dynamic>) : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'User(id: $id, firstName: $firstName, lastName: $lastName, email: $email, profilePicture: $profilePicture, school: $school)';
  }

  @override
  bool operator ==(covariant User other) {
    if (identical(this, other)) return true;

    return other.id == id && other.firstName == firstName && other.lastName == lastName && other.email == email && other.profilePicture == profilePicture && other.school == school;
  }

  @override
  int get hashCode {
    return id.hashCode ^ firstName.hashCode ^ lastName.hashCode ^ email.hashCode ^ profilePicture.hashCode ^ school.hashCode;
  }
}
