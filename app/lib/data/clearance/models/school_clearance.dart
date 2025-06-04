// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/documents/models/document_model.dart';

class SchoolClearanceModel {
  final String id;
  final String clearanceName;
  final bool paymentRequired;
  final double fee;
  final List<String>? requiredDocuments;

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
    List<String>? requiredDocuments,
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
      'requiredDocuments': requiredDocuments,
    };
  }

  factory SchoolClearanceModel.fromMap(Map map) {
    return SchoolClearanceModel(
      id: map['_id'] as String,
      clearanceName: map['clearance_name'] as String,
      paymentRequired: map['payment_required'] as bool,
      fee: double.parse((map['fee'] ?? "0").toString()),
      requiredDocuments: map["required_documents"] != null
          ? (map["required_documents"] as List)
              .map((s) => s.toString())
              .toList()
          : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory SchoolClearanceModel.fromJson(String source) =>
      SchoolClearanceModel.fromMap(json.decode(source));
}
