part of 'folders_bloc.dart';

@immutable
sealed class FoldersState {}

class FoldersInitialState extends FoldersState {}

class GetFoldersLoading extends FoldersState {}

class GetFoldersSuccess extends FoldersState {
  final List<FolderModel> folders;

  GetFoldersSuccess({required this.folders});
}

class GetFoldersError extends FoldersState {}
