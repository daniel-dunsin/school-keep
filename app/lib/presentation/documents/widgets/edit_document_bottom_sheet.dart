// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:io';

import 'package:app/configs/app_config.dart';
import 'package:app/configs/route/route_config.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/data/documents/models/update_document_model.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:app/presentation/documents/routes/routes.dart';
import 'package:app/presentation/documents/widgets/upload_progress_dialog.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/file.dart';
import 'package:app/shared/utils/navigation.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input.dart';
import 'package:app/shared/widgets/input_decorator.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:path/path.dart';

class EditDocumentBottomSheet extends StatefulWidget {
  final DocumentModel document;
  const EditDocumentBottomSheet({
    Key? key,
    required this.document,
  }) : super(key: key);

  @override
  State<EditDocumentBottomSheet> createState() => _EditDocumentBottomSheetState();
}

class _EditDocumentBottomSheetState extends State<EditDocumentBottomSheet> {
  late TextEditingController documentNameController;
  File? newFile;

  @override
  void initState() {
    documentNameController = TextEditingController(
      text: widget.document.name,
    )..addListener(() {
        setState(() {});
      });
    super.initState();
  }

  void updateDocument() {
    final CancelToken cancelToken = CancelToken();

    final data = UpdateDocumentModel(
      cancelToken: cancelToken,
      documentName: documentNameController.text != widget.document.name ? documentNameController.text : null,
      file: newFile,
    );

    getIt.get<DocumentsBloc>().add(
          UpdateDocumentRequested(
            widget.document.reference!,
            data,
          ),
        );

    UploadProgressDialog.display(
      appNavKey.currentContext!,
      cancelToken: cancelToken,
    );
  }

  @override
  void dispose() {
    documentNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: BlocConsumer<DocumentsBloc, DocumentsState>(
        bloc: getIt.get<DocumentsBloc>(),
        listener: (context, state) {
          if (state is UpdateDocumentsSuccess) {
            NetworkToast.handleSuccess("Document updated successfully");
            CustomNavigations.popUntil(
              DocumentRoutes.documentDetail,
              extra: {
                "document": widget.document,
              },
            );
          }

          if (state is UpdateDocumentsError) {
            context.pop();
          }
        },
        builder: (context, state) {
          return Column(
            children: [
              AppInputField(
                controller: documentNameController,
                hintText: "Document Name",
                label: "Document Name",
              ),
              SizedBox(
                height: 30,
              ),
              AppInputDecorator(
                label: "Upload new file (optional)",
                value: newFile != null ? basename(newFile!.path) : "No new file selected",
                suffixIcon: newFile != null
                    ? GestureDetector(
                        child: Icon(Icons.close),
                        onTap: () {
                          setState(() {
                            newFile = null;
                          });
                        },
                      )
                    : null,
                onTap: () async {
                  final file = await FileUtils.pickImageAndVideo();

                  if (file != null) {
                    setState(() {
                      newFile = file;
                    });
                  }
                },
              ),
              SizedBox(height: 30),
              ContainedButton(
                child: Text(
                  "Edit Document",
                ),
                disabled: !(documentNameController.text != widget.document.name || newFile != null),
                width: double.maxFinite,
                height: 20,
                onPressed: () {
                  updateDocument();
                },
              )
            ],
          );
        },
      ),
    );
  }
}
