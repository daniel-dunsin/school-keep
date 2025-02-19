// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/clearance/enums/clearance_enums.dart';

class ClearanceModel {
  final String id;
  final ClearanceStatus status;
  final DateTime? approvalDate;
  final DateTime? rejectionDate;
  final String? rejectionReason;

  ClearanceModel({
    required this.id,
    required this.status,
    this.approvalDate,
    this.rejectionDate,
    this.rejectionReason,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'status': status,
      'approvalDate': approvalDate?.millisecondsSinceEpoch,
      'rejectionDate': rejectionDate?.millisecondsSinceEpoch,
      'rejectionReason': rejectionReason,
    };
  }

  factory ClearanceModel.fromMap(Map<String, dynamic> map) {
    return ClearanceModel(
      id: map["_id"] as String,
      status: ClearanceStatus.values.firstWhere((v) => v.name == (map["status"])),
      approvalDate: map['approvalDate'] != null ? DateTime.parse(map['approvalDate'] as String) : null,
      rejectionDate: map['rejectionDate'] != null ? DateTime.parse(map['rejectionDate'] as String) : null,
      rejectionReason: map['rejectionReason'] != null ? map['rejectionReason'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory ClearanceModel.fromJson(String source) => ClearanceModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
