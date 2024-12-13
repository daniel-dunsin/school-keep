import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:app/shared/widgets/confirmation_modal.dart';
import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

class SingleFolder extends StatefulWidget {
  final FolderModel folder;
  const SingleFolder({
    super.key,
    required this.folder,
  });

  @override
  State<SingleFolder> createState() => _SingleFolderState();
}

class _SingleFolderState extends State<SingleFolder> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Icon(
            Icons.folder,
            size: 130,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  widget.folder.folderName,
                  textAlign: TextAlign.center,
                ),
              ),
              IconButton(
                onPressed: () {
                  AppBottomSheet.display(
                    context,
                    bottomSheetContents: [
                      _buildModalBottomSheet()
                    ],
                  );
                },
                icon: Icon(Icons.more_vert),
              ),
            ],
          )
        ],
      ),
    );
  }

  _buildModalBottomSheet() {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: BlocConsumer<FoldersBloc, FoldersState>(
        bloc: getIt.get<FoldersBloc>(),
        listener: (context, state) {
          if (state is DeleteFolderSuccess) {
            NetworkToast.handleSuccess("Folder deleted");
            getIt.get<FoldersBloc>().add(GetFoldersRequested());
            if (context.canPop()) context.pop();
          }
        },
        builder: (context, state) {
          return Column(
            children: [
              Text(
                widget.folder.folderName,
                style: getTextTheme(context).titleLarge,
              ),
              SizedBox(height: 30),
              ListTile(
                onTap: () {
                  if (!widget.folder.isCustom) {
                    NetworkToast.handleError("Only custom folders can be deleted");
                    return;
                  }

                  showDialog(
                    context: context,
                    builder: (context) => ConfirmationModal(
                      title: "Delete Folder",
                      content: "Are you sure you want to delete this folder? it may contain documents",
                      onNo: context.pop,
                      onYes: () {
                        context.pop();
                        getIt.get<FoldersBloc>().add(
                              DeleteFolderRequested(widget.folder.id),
                            );
                      },
                    ),
                  );
                },
                leading: state is DeleteFolderLoading
                    ? AppLoader()
                    : Icon(
                        Icons.delete,
                        color: getColorScheme(context).error.withOpacity(widget.folder.isCustom ? 1 : .5),
                      ),
                title: Text(
                  state is DeleteFolderLoading ? "Deleting folder" : "Delete Folder",
                  style: getTextTheme(context).titleSmall?.copyWith(
                        color: state is DeleteFolderLoading ? null : getColorScheme(context).error.withOpacity(widget.folder.isCustom ? 1 : .5),
                      ),
                ),
              )
            ],
          );
        },
      ),
    );
  }
}
