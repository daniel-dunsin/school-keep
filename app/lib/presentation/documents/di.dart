import 'package:app/domain/documents/document_form_data_repository.dart';
import 'package:app/domain/documents/document_repository.dart';
import 'package:app/domain/documents/folder_repository.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:app/presentation/documents/bloc/upload_document_progress_bloc/upload_document_progress_bloc.dart';
import 'package:get_it/get_it.dart';

void setupDocumentsPresentation(GetIt ioc) {
  ioc.registerSingleton<FoldersBloc>(
    FoldersBloc(
      folderRepository: ioc.get<FolderRepository>(),
    ),
  );

  ioc.registerSingleton<UploadDocumentProgressBloc>(
    UploadDocumentProgressBloc(),
  );

  ioc.registerSingleton<DocumentsBloc>(
    DocumentsBloc(
      documentFormDataRepository: ioc.get<DocumentFormDataRepository>(),
      documentsJsonRepository: ioc.get<DocumentRepository>(),
    ),
  );
}
