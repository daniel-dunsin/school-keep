part of 'upload_document_progress_bloc.dart';

@immutable
sealed class UploadDocumentProgressEvents {}

class ChangeUploadDocumentProgress extends UploadDocumentProgressEvents {
  final double progressCount;

  ChangeUploadDocumentProgress(this.progressCount);
}
