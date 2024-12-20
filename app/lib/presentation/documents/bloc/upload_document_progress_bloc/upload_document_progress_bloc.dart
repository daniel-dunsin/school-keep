import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'upload_document_progress_events.dart';

class UploadDocumentProgressBloc extends Bloc<UploadDocumentProgressEvents, double> {
  UploadDocumentProgressBloc() : super(0) {
    on<ChangeUploadDocumentProgress>(
      (event, emit) {
        emit(event.progressCount);
      },
    );
  }
}
