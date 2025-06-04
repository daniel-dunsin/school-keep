import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/models/school_clearance.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit_state.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SubmitClearanceCubit extends Cubit<SubmitClearanceCubitState> {
  SubmitClearanceCubit() : super(SubmitClearanceCubitState());

  reset() {
    emit(SubmitClearanceCubitState());
  }

  init(SchoolClearanceModel schoolClearance) {
    emit(SubmitClearanceCubitState(
        schoolClearance: schoolClearance, documents: []));
  }

  addDocument(DocumentModel document) {
    List<DocumentModel> documents = state.documents;

    final bool isIncluded =
        documents.where((doc) => doc.id == document.id).isEmpty ? false : true;

    if (!isIncluded) {
      documents.add(document);
    }

    emit(state.copyWith(documents: documents));
  }

  removeDocument(DocumentModel document) {
    List<DocumentModel> documents = state.documents;

    documents.removeWhere((doc) => doc.id == document.id);

    emit(state.copyWith(documents: documents));
  }

  openFolder(FolderModel folder) {
    getIt.get<DocumentsBloc>().add(GetDocumentsRequested(folderId: folder.id));
    emit(state.copyWith(folderInView: folder));
  }

  exitFolder() {
    emit(
      state.copyWith(
        folderInView: null,
        passFolderInView: true,
      ),
    );
  }

  bool isDocumentSelected(DocumentModel document) {
    return state.documents.where((doc) => doc.id == document.id).isNotEmpty
        ? true
        : false;
  }
}
