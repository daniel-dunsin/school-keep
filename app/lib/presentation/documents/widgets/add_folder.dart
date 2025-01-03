import 'package:app/configs/app_config.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class AddFolderBottomActionButton extends StatefulWidget {
  const AddFolderBottomActionButton({super.key});

  @override
  State<AddFolderBottomActionButton> createState() => _AddFolderBottomActionButtonState();
}

class _AddFolderBottomActionButtonState extends State<AddFolderBottomActionButton> {
  TextEditingController folderNameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    folderNameController.addListener(() {
      setState(() {});
    });
  }

  @override
  void dispose() {
    super.dispose();
    folderNameController.dispose();
  }

  void submit() {
    if (folderNameController.text.isEmpty) {
      NetworkToast.handleError("Folder name is required");
      return;
    }
    getIt.get<FoldersBloc>().add(
          AddFolderRequested(folderName: folderNameController.text),
        );
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      heroTag: "Folders List Floating Action Button",
      onPressed: () {
        AppBottomSheet.display(
          context,
          bottomSheetContents: [
            Padding(
              padding: AppStyles.defaultPagePadding,
              child: BlocConsumer<FoldersBloc, FoldersState>(
                  bloc: getIt.get<FoldersBloc>(),
                  listener: (context, state) {
                    if (state is AddFolderSuccess) {
                      NetworkToast.handleSuccess("Folder created successfully");
                      getIt.get<FoldersBloc>().add(GetFoldersRequested());
                      folderNameController.text = "";
                      context.pop();
                    } else if (state is AddFolderError) {
                      context.pop();
                    }
                  },
                  builder: (context, state) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          "Add Folder",
                          style: getTextTheme(context).titleLarge,
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 4),
                        Text(
                          "add a new custom folder",
                          style: getTextTheme(context).bodySmall,
                        ),
                        SizedBox(
                          height: 50,
                        ),
                        AppInputField(
                          hintText: "Folder name",
                          controller: folderNameController,
                          disabled: state is AddFolderLoading,
                        ),
                        SizedBox(
                          height: 40,
                        ),
                        ContainedButton(
                          width: double.maxFinite,
                          child: Text("Submit"),
                          loading: state is AddFolderLoading,
                          onPressed: submit,
                        ),
                        SizedBox(
                          height: 40,
                        ),
                      ],
                    );
                  }),
            ),
          ],
        );
      },
      child: Icon(
        Icons.add,
      ),
    );
  }
}
