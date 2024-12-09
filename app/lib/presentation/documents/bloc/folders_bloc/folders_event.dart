part of 'folders_bloc.dart';

@immutable
sealed class FoldersEvent {}

class GetFoldersRequested extends FoldersEvent {}
