// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/presentation/documents/routes/routes.dart';
import 'package:app/shared/utils/doc_type.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SingleDocument extends StatefulWidget {
  final DocumentModel document;

  const SingleDocument({
    Key? key,
    required this.document,
  }) : super(key: key);

  @override
  State<SingleDocument> createState() => _SingleDocumentState();
}

class _SingleDocumentState extends State<SingleDocument> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildDisplay(),
        SizedBox(height: 8),
        _buildName(),
      ],
    );
  }

  _buildDisplay() {
    return GestureDetector(
      onTap: () {
        context.push(
          DocumentRoutes.documentDetail,
          extra: {
            "document": widget.document,
            "showOptions": true,
          },
        );
      },
      child: Container(
        width: double.maxFinite,
        height: 100,
        decoration: BoxDecoration(
          border: Border.all(
            color: Colors.grey,
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: DocTypeUtils.getDocPreview(
            mimeType: widget.document.mediaType,
            document: widget.document,
            context: context,
          ),
        ),
      ),
    );
  }

  _buildName() {
    return Row(
      children: [
        DocTypeUtils.getDocTypeIcon(
          mimeType: widget.document.mediaType,
          context: context,
        ),
        SizedBox(width: 10),
        Expanded(
          child: Text(
            widget.document.name,
            style: getTextTheme(context).labelSmall,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        SizedBox(width: 10),
      ],
    );
  }
}
