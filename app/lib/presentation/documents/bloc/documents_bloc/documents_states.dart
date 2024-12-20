part of 'documents_bloc.dart';

@immutable
sealed class DocumentsState {}

class DocumentsInitialState extends DocumentsState {}

class AddDocumentsLoading extends DocumentsState {}

class AddDocumentsSuccess extends DocumentsState {}

class AddDocumentsError extends DocumentsState {}
