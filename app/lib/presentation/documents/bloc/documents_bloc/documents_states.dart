part of 'documents_bloc.dart';

@immutable
sealed class DocumentsState {}

class DocumentsInitialState extends DocumentsState {}

class AddDocumentsLoading extends DocumentsState {}

class AddDocumentsSuccess extends DocumentsState {}

class AddDocumentsError extends DocumentsState {}

class GetDocumentsLoading extends DocumentsState {}

class GetDocumentsSuccess extends DocumentsState {
  final List<DocumentModel> documents;

  GetDocumentsSuccess(this.documents);
}

class GetDocumentsError extends DocumentsState {}
