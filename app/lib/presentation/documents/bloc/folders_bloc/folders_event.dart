part of 'folders_bloc.dart';

@immutable
sealed class FoldersEvent {}

class GetFoldersRequested extends FoldersEvent {}

class AddFolderRequested extends FoldersEvent {
  final String folderName;

  AddFolderRequested({required this.folderName});
}

class DeleteFolderRequested extends FoldersEvent {
  final String folderId;

  DeleteFolderRequested(this.folderId);
}
