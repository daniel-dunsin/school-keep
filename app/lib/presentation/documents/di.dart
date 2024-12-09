import 'package:app/domain/documents/folder_repository.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:get_it/get_it.dart';

void setupDocumentsPresentation(GetIt ioc) {
  ioc.registerSingleton<FoldersBloc>(
    FoldersBloc(
      folderRepository: ioc.get<FolderRepository>(),
    ),
  );
}
