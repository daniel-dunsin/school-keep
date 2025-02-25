// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/presentation/documents/widgets/single_document_version.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';

class DocumentsVersion extends StatelessWidget {
  late final List<DocumentModel> documentVersions;

  DocumentsVersion({
    Key? key,
    required List<DocumentModel> documentVersions,
  }) : super(key: key) {
    documentVersions.sort((a, b) => a.version!.compareTo(b.version!));
    this.documentVersions = documentVersions;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: Padding(
        padding: AppStyles.defaultPagePadding,
        child: ListView.builder(
          reverse: true,
          shrinkWrap: true,
          itemBuilder: (context, index) => SingleDocumentVersion(
            currentVersion: documentVersions[index],
            previousVersion: index != 0 ? documentVersions[index - 1] : null,
            nextVersion: index != documentVersions.length - 1 ? documentVersions[index + 1] : null,
          ),
          itemCount: documentVersions.length,
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      leading: BackButton(
        style: ButtonStyle(
          iconSize: WidgetStatePropertyAll(20),
        ),
      ),
    );
  }
}
