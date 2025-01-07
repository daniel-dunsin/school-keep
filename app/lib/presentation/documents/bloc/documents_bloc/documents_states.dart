part of 'documents_bloc.dart';

@immutable
sealed class DocumentsState {}

class DocumentsInitialState extends DocumentsState {}

class AddDocumentsLoading extends DocumentsState {}

class AddDocumentsSuccess extends DocumentsState {}

class AddDocumentsError extends DocumentsState {}

class UpdateDocumentsLoading extends DocumentsState {}

class UpdateDocumentsSuccess extends DocumentsState {}

class UpdateDocumentsError extends DocumentsState {}

class GetDocumentsLoading extends DocumentsState {}

class GetDocumentsSuccess extends DocumentsState {
  final List<DocumentModel> documents;

  GetDocumentsSuccess(this.documents);
}

class GetDocumentsError extends DocumentsState {}

class GetSingleDocumentLoading extends DocumentsState {}

class GetSingleDocumentSuccess extends DocumentsState {
  final DocumentModel document;
  final List<DocumentModel> versions;

  GetSingleDocumentSuccess({required this.document, required this.versions});
}

class GetSingleDocumentError extends DocumentsState {}

class DeleteDocumentsLoading extends DocumentsState {}

class DeleteDocumentsSuccess extends DocumentsState {}

class DeleteDocumentsError extends DocumentsState {}
