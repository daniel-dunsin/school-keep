// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/documents/models/document_model.dart';

class SchoolClearanceModel {
  final String id;
  final String clearanceName;
  final bool paymentRequired;
  final double fee;
  final List<DocumentModel>? requiredDocuments;

  SchoolClearanceModel({
    required this.id,
    required this.clearanceName,
    required this.paymentRequired,
    required this.fee,
    this.requiredDocuments,
  });

  SchoolClearanceModel copyWith({
    String? clearanceName,
    bool? paymentRequired,
    double? fee,
    List<DocumentModel>? requiredDocuments,
  }) {
    return SchoolClearanceModel(
      id: id,
      clearanceName: clearanceName ?? this.clearanceName,
      paymentRequired: paymentRequired ?? this.paymentRequired,
      fee: fee ?? this.fee,
      requiredDocuments: requiredDocuments ?? this.requiredDocuments,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'clearanceName': clearanceName,
      'paymentRequired': paymentRequired,
      'fee': fee,
      'requiredDocuments': requiredDocuments?.map((x) => x.toMap()).toList(),
    };
  }

  factory SchoolClearanceModel.fromMap(Map map) {
    return SchoolClearanceModel(
      id: map['_id'] as String,
      clearanceName: map['clearance_name'] as String,
      paymentRequired: map['payment_required'] as bool,
      fee: map['fee'] as double,
      requiredDocuments: map['required_documents'] != null
          ? List<DocumentModel>.from(
              (map['required_documents'] as List<int>).map<DocumentModel?>(
                (x) => DocumentModel.fromMap(x as Map<String, dynamic>),
              ),
            )
          : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory SchoolClearanceModel.fromJson(String source) => SchoolClearanceModel.fromMap(json.decode(source));
}
