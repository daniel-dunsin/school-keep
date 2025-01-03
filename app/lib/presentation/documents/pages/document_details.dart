// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:app/presentation/documents/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/doc_type.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:app/shared/widgets/confirmation_modal.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hugeicons/hugeicons.dart';

class DocumentDetailsScreen extends StatefulWidget {
  final DocumentModel document;
  final bool showOptions;

  const DocumentDetailsScreen({
    Key? key,
    required this.document,
    required this.showOptions,
  }) : super(key: key);

  @override
  State<DocumentDetailsScreen> createState() => _DocumentDetailsScreenState();
}

class _DocumentDetailsScreenState extends State<DocumentDetailsScreen> {
  late DocumentModel document;
  List<DocumentModel> otherVersions = [];

  @override
  void initState() {
    super.initState();
    document = widget.document;

    getDocument();
  }

  void getDocument() {
    getIt.get<DocumentsBloc>().add(
          GetSingleDocumentRequested(
            documentId: document.id,
          ),
        );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: RefreshIndicator(
          onRefresh: () async => getDocument(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              SizedBox(height: 20),
              _buildDetails(),
              _buildBloc(),
            ],
          ),
        ),
      ),
    );
  }

  _buildBloc() {
    return BlocListener<DocumentsBloc, DocumentsState>(
      bloc: getIt.get<DocumentsBloc>(),
      listener: (context, state) {
        if (state is GetSingleDocumentSuccess) {
          setState(() {
            document = state.document;
            otherVersions = state.versions;
          });
        }
      },
      child: SizedBox.shrink(),
    );
  }

  _buildHeader() {
    return SizedBox(
      width: double.maxFinite,
      height: MediaQuery.of(context).size.height * .4,
      child: Stack(
        children: [
          Container(
            width: double.maxFinite,
            height: double.maxFinite,
            child: DocTypeUtils.getDocPreview(
              mimeType: document.mediaType,
              document: document,
              context: context,
              previewVideo: true,
            ),
          ),
          Container(
            width: double.maxFinite,
            height: double.maxFinite,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Color.fromRGBO(0, 0, 0, 0.5),
                  Color.fromRGBO(0, 0, 0, 0.5),
                ],
              ),
            ),
          ),
          Positioned(
            top: 0,
            left: 0,
            child: SafeArea(
              child: IconButton(
                onPressed: context.pop,
                icon: Icon(Icons.arrow_back),
              ),
            ),
          ),
          if (widget.showOptions)
            Positioned(
              top: 0,
              right: 0,
              child: SafeArea(
                child: IconButton(
                  onPressed: () {
                    AppBottomSheet.display(
                      context,
                      bottomSheetContents: [
                        _buildDocumentOptionsBottomSheet(),
                      ],
                    );
                  },
                  icon: Icon(Icons.more_vert),
                ),
              ),
            ),
        ],
      ),
    );
  }

  _buildDetails() {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${document.name} (v${document.version})',
            style: getTextTheme(context).titleLarge?.copyWith(
                  fontSize: 25.sp,
                ),
          ),
          SizedBox(height: 10),
          if (widget.showOptions)
            Theme(
              data: Theme.of(context).copyWith(
                splashFactory: NoSplash.splashFactory,
                splashColor: Colors.transparent,
              ),
              child: ListTile(
                onTap: () {
                  context.push(
                    DocumentRoutes.documentVersions,
                    extra: {
                      "documentVersions": [
                        document,
                        ...otherVersions
                      ],
                    },
                  );
                },
                title: Text(
                  "All Versions",
                  style: getTextTheme(context).bodySmall,
                ),
                contentPadding: EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 0,
                ),
                trailing: Icon(Icons.chevron_right),
              ),
            ),
        ],
      ),
    );
  }

  _buildDocumentOptionsBottomSheet() {
    return Column(
      children: [
        AppBottomSheet.buildTile(
          context,
          title: "Edit document",
          icon: HugeIcons.strokeRoundedEdit01,
          onTap: () {
            AppBottomSheet.display(
              context,
              bottomSheetContents: [],
            );
          },
        ),
        AppBottomSheet.buildTile(
          context,
          title: "Move document to another folder",
          icon: HugeIcons.strokeRoundedCopy02,
          onTap: () {},
        ),
        AppBottomSheet.buildTile(
          context,
          title: "Delete document",
          icon: HugeIcons.strokeRoundedDelete01,
          color: getColorScheme(context).error,
          onTap: () {
            showDialog(
              context: context,
              builder: (context) => ConfirmationModal(
                title: "Delete Document",
                content: "Are you sure you want to delete this document?",
                onNo: () {
                  context.pop();
                },
                onYes: () {
                  context.pop();
                },
              ),
            );
          },
        ),
      ],
    );
  }
}
