part of 'documents_bloc.dart';

@immutable
sealed class DocumentsEvent {}

class AddDocumentRequested extends DocumentsEvent {
  final AddDocumentModel addDocumentModel;

  AddDocumentRequested(this.addDocumentModel);
}

class GetDocumentsRequested extends DocumentsEvent {
  final String folderId;

  GetDocumentsRequested({required this.folderId});
}

class GetSingleDocumentRequested extends DocumentsEvent {
  final String documentId;

  GetSingleDocumentRequested({required this.documentId});
}
