// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/documents/models/add_document_model.dart';
import 'package:app/data/documents/models/document_model.dart';
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
  }
}
