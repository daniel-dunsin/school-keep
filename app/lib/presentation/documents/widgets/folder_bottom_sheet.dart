import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/confirmation_modal.dart';
import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class FolderBottomSheet extends StatelessWidget {
  final FolderModel folder;
  final VoidCallback? onComplete;

  const FolderBottomSheet({
    super.key,
    required this.folder,
    this.onComplete,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: BlocConsumer<FoldersBloc, FoldersState>(
        bloc: getIt.get<FoldersBloc>(),
        listener: (context, state) {
          if (state is DeleteFolderSuccess) {
            NetworkToast.handleSuccess("Folder deleted");
            getIt.get<FoldersBloc>().add(GetFoldersRequested());
            if (context.canPop()) context.pop();
            if (this.onComplete != null) this.onComplete!();
          }
        },
        builder: (context, state) {
          return Column(
            children: [
              Text(
                folder.folderName,
                style: getTextTheme(context).titleLarge,
              ),
              SizedBox(height: 30),
              ListTile(
                onTap: () {
                  if (!folder.isCustom!) {
                    NetworkToast.handleError("Only custom folders can be deleted");
                    return;
                  }

                  showDialog(
                    context: context,
                    builder: (context) => ConfirmationModal<FoldersBloc, DeleteFolderLoading>(
                      title: "Delete Folder",
                      content: "Are you sure you want to delete this folder? it may contain documents",
                      onNo: context.pop,
                      onYes: () {
                        context.pop();
                        getIt.get<FoldersBloc>().add(
                              DeleteFolderRequested(folder.id),
                            );
                      },
                    ),
                  );
                },
                leading: state is DeleteFolderLoading
                    ? AppLoader()
                    : Icon(
                        Icons.delete,
                        color: getColorScheme(context).error.withOpacity(folder.isCustom! ? 1 : .5),
                      ),
                title: Text(
                  state is DeleteFolderLoading ? "Deleting folder" : "Delete Folder",
                  style: getTextTheme(context).titleSmall?.copyWith(
                        color: state is DeleteFolderLoading ? null : getColorScheme(context).error.withOpacity(folder.isCustom! ? 1 : .5),
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
