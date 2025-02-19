// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/clearance/enums/clearance_enums.dart';
import 'package:app/data/clearance/models/clearance_activity_model.dart';
import 'package:app/data/clearance/models/school_clearance.dart';
import 'package:app/data/clearance/models/student_clearance_model.dart';

class StudentClearanceStatusModel {
  final String message;
  final RequestClearanceStatus status;
  final String? clearanceId;
  final List<ClearanceActivityModel>? activities;
  final List<SchoolClearanceModel>? allSchoolClearances;
  final List<String>? requiredSchoolClearancesIds;
  final List<StudentSubClearanceModel>? studentSubmittedClearances;

  StudentClearanceStatusModel({
    required this.message,
    required this.status,
    this.clearanceId,
    this.activities,
    this.allSchoolClearances,
    this.requiredSchoolClearancesIds,
    this.studentSubmittedClearances,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'message': message,
      'status': status.name,
      'clearanceId': clearanceId,
      'activities': activities?.map((x) => x.toMap()).toList(),
      'allSchoolClearances': allSchoolClearances?.map((x) => x.toMap()).toList(),
      'requiredSchoolClearancesIds': requiredSchoolClearancesIds,
      'studentSubmittedClearances': studentSubmittedClearances?.map((x) => x.toMap()).toList(),
    };
  }

  factory StudentClearanceStatusModel.fromMap(Map<String, dynamic> map) {
    return StudentClearanceStatusModel(
      message: map['message'] as String,
      status: RequestClearanceStatus.values.firstWhere((v) => v.name == (map['status'] as String)),
      clearanceId: map['clearanceId'],
      activities: map['activities'] != null
          ? List<ClearanceActivityModel>.from(
              (map['activities'] as List<Map>).map<ClearanceActivityModel?>(
                (x) => ClearanceActivityModel.fromMap(x),
              ),
            )
          : null,
      allSchoolClearances: map['clearanceDetails']?["all"] != null
          ? List<SchoolClearanceModel>.from(
              (map['clearanceDetails']?["all"] as List<Map>).map<SchoolClearanceModel?>(
                (x) => SchoolClearanceModel.fromMap(x),
              ),
            )
          : null,
      requiredSchoolClearancesIds: map["clearanceDetails"]?["requiredIds"] != null ? List<String>.from(map["clearanceDetails"]["requiredIds"] as List<String>) : null,
      studentSubmittedClearances: map["clearanceDetails"]?["submitted"] != null
          ? List<StudentSubClearanceModel>.from(
              (map["clearanceDetails"]?["submitted"] as List<Map>).map<StudentSubClearanceModel?>(
                (x) => StudentSubClearanceModel.fromMap(x),
              ),
            )
          : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory StudentClearanceStatusModel.fromJson(String source) => StudentClearanceStatusModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
