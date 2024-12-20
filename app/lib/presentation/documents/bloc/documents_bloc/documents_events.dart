part of 'documents_bloc.dart';

@immutable
sealed class DocumentsEvent {}

class AddDocumentRequested extends DocumentsEvent {
  final AddDocumentModel addDocumentModel;

  AddDocumentRequested(this.addDocumentModel);
}
