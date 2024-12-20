// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:io';

import 'package:app/configs/route/route_config.dart';
import 'package:app/presentation/documents/widgets/add_document_details_bottom_sheet.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/file.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';

class AddDocumentBottomSheet extends StatefulWidget {
  final String folderId;
  const AddDocumentBottomSheet({
    Key? key,
    required this.folderId,
  }) : super(key: key);

  @override
  State<AddDocumentBottomSheet> createState() => _AddDocumentBottomSheetState();
}

class _AddDocumentBottomSheetState extends State<AddDocumentBottomSheet> {
  void selectFile({
    File? file,
  }) {
    if (file == null) {
      NetworkToast.handleError("Oops! no file was selected");
      return;
    }

    AppBottomSheet.display(
      appNavKey.currentContext ?? context,
      initialChildSize: 1.0,
      bottomSheetContents: [
        AddDocumentDetailsBottomSheet(
          file: file,
          folderId: widget.folderId,
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildPrimarySheet();
  }

  Widget _buildPrimarySheet() {
    return Column(
      children: [
        _buildTile(
          title: "Upload File",
          icon: Icons.upload_outlined,
          onTap: () {
            context.pop();
            AppBottomSheet.display(
              context,
              bottomSheetContents: [
                _buildSecondarySheet(),
              ],
              initialChildSize: .5,
            );
          },
        ),
        _buildTile(
          title: "Take Photo",
          icon: Icons.photo_camera_outlined,
          onTap: () async {
            selectFile(
              file: await FileUtils.pickImage(ImageSource.camera),
            );
          },
        ),
      ],
    );
  }

  Widget _buildSecondarySheet() {
    return Column(
      children: [
        _buildTile(
          title: "Photos and Videos",
          icon: Icons.video_file_outlined,
          onTap: () async {
            selectFile(
              file: await FileUtils.pickImage(ImageSource.gallery),
            );
          },
        ),
        _buildTile(
          title: "Browse",
          icon: Icons.more_horiz_outlined,
          onTap: () async {
            selectFile(
              file: await FileUtils.pickFile(),
            );
          },
        ),
      ],
    );
  }

  ListTile _buildTile({
    required String title,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return ListTile(
      onTap: onTap,
      leading: Icon(icon),
      contentPadding: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
      title: Text(
        title,
        style: getTextTheme(context).bodyLarge,
      ),
    );
  }
}
