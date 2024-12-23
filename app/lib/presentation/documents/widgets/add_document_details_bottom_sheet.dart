import 'dart:io';

import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/add_document_model.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:app/presentation/documents/bloc/upload_document_progress_bloc/upload_document_progress_bloc.dart';
import 'package:app/presentation/documents/widgets/upload_progress_dialog.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:app/shared/widgets/input_decorator.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:path/path.dart' as path;

class AddDocumentDetailsBottomSheet extends StatefulWidget {
  final File file;
  final String folderId;

  const AddDocumentDetailsBottomSheet({
    super.key,
    required this.file,
    required this.folderId,
  });

  @override
  State<AddDocumentDetailsBottomSheet> createState() => _AddDocumentDetailsBottomSheetState();
}

class _AddDocumentDetailsBottomSheetState extends State<AddDocumentDetailsBottomSheet> {
  late TextEditingController documentNameController;

  @override
  void initState() {
    super.initState();
    documentNameController = TextEditingController();
  }

  @override
  void dispose() {
    super.dispose();
    documentNameController.dispose();
  }

  void submit() {
    getIt.get<UploadDocumentProgressBloc>().add(
          ChangeUploadDocumentProgress(
            0,
          ),
        );

    final CancelToken cancelToken = CancelToken();
    final String documentName = documentNameController.text.isEmpty ? path.basename(widget.file.path) : documentNameController.text;

    getIt.get<DocumentsBloc>().add(
          AddDocumentRequested(
            AddDocumentModel(
              file: widget.file,
              documentName: documentName,
              folder: widget.folderId,
              cancelToken: cancelToken,
            ),
          ),
        );

    UploadProgressDialog.display(context, cancelToken: cancelToken);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: BlocListener<DocumentsBloc, DocumentsState>(
        bloc: getIt.get<DocumentsBloc>(),
        listener: (context, state) {
          print(state);
          if (state is AddDocumentsError) {
            // for the upload progress
            context.pop();
          }

          if (state is AddDocumentsSuccess) {
            context.pop();
            context.pop();
            NetworkToast.handleSuccess("Document uploaded successfully");
            getIt.get<DocumentsBloc>().add(
                  GetDocumentsRequested(folderId: widget.folderId),
                );
          }
        },
        child: Column(
          children: [
            Text(
              "Document details",
              style: getTextTheme(context).titleLarge,
            ),
            SizedBox(height: 30),
            AppInputDecorator(
              label: "Selected file",
              value: path.basename(widget.file.path),
              suffixIcon: Icon(Icons.close),
              onTap: () {
                context.pop();
              },
            ),
            SizedBox(height: 20),
            AppInputField(
              label: "Document name (optional)",
              hintText: "Enter document name",
              controller: documentNameController,
            ),
            SizedBox(height: 30),
            ContainedButton(
              child: Text("Submit"),
              height: 30,
              width: double.maxFinite,
              onPressed: submit,
            ),
          ],
        ),
      ),
    );
  }
}
