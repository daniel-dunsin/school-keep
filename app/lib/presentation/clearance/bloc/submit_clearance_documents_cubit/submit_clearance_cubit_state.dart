// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/clearance/models/school_clearance.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/data/documents/models/folder_model.dart';

class SubmitClearanceCubitState {
  SchoolClearanceModel? schoolClearance;
  List<DocumentModel> documents;
  FolderModel? folderInView;

  SubmitClearanceCubitState({
    this.schoolClearance,
    this.documents = const [],
    this.folderInView,
  });

  SubmitClearanceCubitState copyWith({
    SchoolClearanceModel? schoolClearance,
    List<DocumentModel>? documents,
    FolderModel? folderInView,
    bool? passFolderInView,
  }) {
    return SubmitClearanceCubitState(
        schoolClearance: schoolClearance ?? this.schoolClearance,
        documents: documents ?? this.documents,
        folderInView: passFolderInView == true
            ? folderInView
            : (folderInView ?? this.folderInView));
  }

  Map<String, dynamic> toApiMap() {
    return <String, dynamic>{
      'schoolClearanceId': schoolClearance?.id,
      'documents': documents.map((x) => x.id).toList(),
    };
  }
}
