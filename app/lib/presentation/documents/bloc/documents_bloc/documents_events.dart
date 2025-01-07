part of 'documents_bloc.dart';

@immutable
sealed class DocumentsEvent {}

class AddDocumentRequested extends DocumentsEvent {
  final AddDocumentModel addDocumentModel;

  AddDocumentRequested(this.addDocumentModel);
}

class UpdateDocumentRequested extends DocumentsEvent {
  final String documentReference;
  final UpdateDocumentModel updateDocumentModel;

  UpdateDocumentRequested(this.documentReference, this.updateDocumentModel);
}

class GetDocumentsRequested extends DocumentsEvent {
  final String folderId;

  GetDocumentsRequested({required this.folderId});
}

class GetSingleDocumentRequested extends DocumentsEvent {
  final String documentId;

  GetSingleDocumentRequested({required this.documentId});
}

class DeleteDocumentRequested extends DocumentsEvent {
  final String documentId;

  DeleteDocumentRequested({required this.documentId});
}
