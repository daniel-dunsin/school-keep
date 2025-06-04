// ignore_for_file: public_member_api_docs, sort_constructors_first

import 'package:app/data/clearance/enums/clearance_enums.dart';
import 'package:app/data/clearance/models/school_clearance.dart';
import 'package:app/data/documents/models/document_model.dart';

class StudentSubClearanceModel {
  final String id;
  final SchoolClearanceModel? clearance;
  final String? schoolClearanceId;
  final StudentClearanceStatus? status;
  final DateTime? approvalDate;
  final String? approvalSignature;
  final String? rejectionReason;
  final DateTime? rejectionDate;
  final DateTime? lastRequestDate;
  final List? documents;

  StudentSubClearanceModel({
    required this.id,
    this.clearance,
    this.schoolClearanceId,
    this.status,
    this.approvalDate,
    this.approvalSignature,
    this.rejectionReason,
    this.rejectionDate,
    this.lastRequestDate,
    this.documents,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'clearance': clearance?.toMap(),
      'status': status?.name,
      'approvalDate': approvalDate?.millisecondsSinceEpoch,
      'approvalSignature': approvalSignature,
      'rejectionReason': rejectionReason,
      'rejectionDate': rejectionDate?.millisecondsSinceEpoch,
      'lastRequestDate': lastRequestDate?.millisecondsSinceEpoch,
      'documents': documents?.map((x) => x.toMap()).toList(),
    };
  }

  factory StudentSubClearanceModel.fromMap(Map map) {
    return StudentSubClearanceModel(
      id: map['id'] as String,
      clearance: map['clearance'] != null &&
              map['clearance'].runtimeType.toString() != "String"
          ? SchoolClearanceModel.fromMap(map['clearance'])
          : null,
      schoolClearanceId: map['clearance'] != null &&
              map["clearance"].runtimeType.toString() == "String"
          ? map['schoolClearanceId'] as String
          : null,
      status: map['status'] != null
          ? StudentClearanceStatus.values
              .firstWhere((v) => v.name == (map['status'] as String))
          : null,
      approvalDate: map['approvalDate'] != null
          ? DateTime.parse(map["approvalDate"] as String)
          : null,
      approvalSignature: map['approvalSignature'] != null
          ? map['approvalSignature'] as String
          : null,
      rejectionReason: map['rejectionReason'] != null
          ? map['rejectionReason'] as String
          : null,
      rejectionDate: map['rejectionDate'] != null
          ? DateTime.parse(map["rejectionDate"] as String)
          : null,
      lastRequestDate: map['lastRequestDate'] != null
          ? DateTime.parse(map["lastRequestDate"] as String)
          : null,
      documents: map['documents'] != null
          ? List.from(
              (map['documents']).map(
                (x) => x.runtimeType.toString() != "String"
                    ? DocumentModel.fromMap(x as Map<String, dynamic>)
                    : x,
              ),
            )
          : null,
    );
  }
}
