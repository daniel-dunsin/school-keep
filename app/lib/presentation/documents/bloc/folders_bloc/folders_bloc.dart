// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/domain/documents/folder_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'folders_event.dart';
part 'folders_state.dart';

class FoldersBloc extends Bloc<FoldersEvent, FoldersState> {
  final FolderRepository folderRepository;

  FoldersBloc({
    required this.folderRepository,
  }) : super(FoldersInitialState()) {
    on<GetFoldersRequested>(
      (event, emit) async {
        emit(GetFoldersLoading());
        try {
          final response = await this.folderRepository.getFolders();

          final data = response["data"] as List<dynamic>;

          final folders = data.map((d) => FolderModel.fromMap(d)).toList();

          emit(GetFoldersSuccess(folders: folders));
        } catch (e) {
          emit(GetFoldersError());
          NetworkToast.handleError(e);
        }
      },
    );

    on<AddFolderRequested>(
      (event, emit) async {
        emit(AddFolderLoading());

        try {
          await this.folderRepository.createFolder(event.folderName);

          emit(AddFolderSuccess());
        } catch (e) {
          emit(AddFolderError());
          NetworkToast.handleError(e);
        }
      },
    );

    on<DeleteFolderRequested>(
      (event, emit) async {
        emit(DeleteFolderLoading());

        try {
          await this.folderRepository.deleteFolder(event.folderId);

          emit(DeleteFolderSuccess());
        } catch (e) {
          emit(DeleteFolderError());
          NetworkToast.handleError(e);
        }
      },
    );
  }
}
