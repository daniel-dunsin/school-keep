// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/documents/models/add_document_model.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/data/documents/models/update_document_model.dart';
import 'package:app/domain/documents/document_form_data_repository.dart';
import 'package:app/domain/documents/document_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'documents_events.dart';
part 'documents_states.dart';

class DocumentsBloc extends Bloc<DocumentsEvent, DocumentsState> {
  final DocumentFormDataRepository documentFormDataRepository;
  final DocumentRepository documentsJsonRepository;

  DocumentsBloc({
    required this.documentFormDataRepository,
    required this.documentsJsonRepository,
  }) : super(DocumentsInitialState()) {
    on<AddDocumentRequested>(
      (event, emit) async {
        emit(AddDocumentsLoading());

        try {
          await this.documentFormDataRepository.createDocument(event.addDocumentModel);

          emit(AddDocumentsSuccess());
        } catch (e) {
          emit(AddDocumentsError());
          NetworkToast.handleError(e);
        }
      },
    );

    on<GetDocumentsRequested>(
      (event, emit) async {
        emit(GetDocumentsLoading());

        try {
          final response = await this.documentsJsonRepository.getFolderDocuments(event.folderId);

          final data = response["data"] as List<dynamic>;

          final documents = data.map((d) => DocumentModel.fromMap(d)).toList();

          emit(GetDocumentsSuccess(documents));
        } catch (e) {
          emit(GetDocumentsError());
          NetworkToast.handleError(e);
        }
      },
    );

    on<GetSingleDocumentRequested>(
      (event, emit) async {
        emit(GetSingleDocumentLoading());
        try {
          final response = await this.documentsJsonRepository.getDocument(event.documentId);

          final data = DocumentModel.fromMap(response["data"]);
          final otherVersionsMap = response["meta"]["otherVersions"] as List<dynamic>;

          final otherVersions = otherVersionsMap.map((d) => DocumentModel.fromMap(d)).toList();

          emit(
            GetSingleDocumentSuccess(
              document: data,
              versions: otherVersions,
            ),
          );
        } catch (e) {
          emit(GetSingleDocumentError());
          NetworkToast.handleError(e);
        }
      },
    );

    on<UpdateDocumentRequested>(
      (event, emit) async {
        emit(UpdateDocumentsLoading());

        try {
          await this.documentFormDataRepository.updateDocument(
                event.documentReference,
                event.updateDocumentModel,
              );

          emit(UpdateDocumentsSuccess());
        } catch (e) {
          emit(UpdateDocumentsError());
          NetworkToast.handleError(e);
        }
      },
    );

    on<DeleteDocumentRequested>(
      (event, emit) async {
        emit(DeleteDocumentsLoading());

        try {
          await this.documentsJsonRepository.deleteDocument(event.documentId);

          emit(DeleteDocumentsSuccess());
        } catch (e) {
          emit(DeleteDocumentsError());
          NetworkToast.handleError(e);
        }
      },
    );
  }
}
