import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:app/presentation/documents/widgets/add_document_bottom_sheet.dart';
import 'package:app/presentation/documents/widgets/folder_bottom_sheet.dart';
import 'package:app/presentation/documents/widgets/single_document.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:shimmer/shimmer.dart';

class FolderDetailScreen extends StatefulWidget {
  final FolderModel folder;

  const FolderDetailScreen({super.key, required this.folder});

  @override
  State<FolderDetailScreen> createState() => _FolderDetailScreenState();
}

class _FolderDetailScreenState extends State<FolderDetailScreen> {
  List<DocumentModel> documents = [];

  @override
  void initState() {
    super.initState();
    fetchDocuments();
  }

  void fetchDocuments() async {
    getIt.get<DocumentsBloc>().add(
          GetDocumentsRequested(folderId: widget.folder.id),
        );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: BlocConsumer<DocumentsBloc, DocumentsState>(
        bloc: getIt.get<DocumentsBloc>(),
        listener: (context, state) {
          if (state is GetDocumentsSuccess) {
            setState(() {
              documents = state.documents;
            });
          }
        },
        builder: (context, state) {
          return Padding(
            padding: AppStyles.defaultPagePadding,
            child: RefreshIndicator(
              onRefresh: () async => fetchDocuments(),
              child: Visibility(
                child: _buildDocsShimmer(),
                replacement: Visibility(
                  child: _buildDocs(context),
                  replacement: _buildNoDoc(context),
                  visible: documents.length > 0,
                ),
                visible: state is GetDocumentsLoading,
              ),
            ),
          );
        },
      ),
      floatingActionButton: _buildFloatingActionButton(context),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      leading: BackButton(
        style: ButtonStyle(
          iconSize: WidgetStatePropertyAll(20),
        ),
      ),
      title: Text(widget.folder.folderName),
      actions: [
        IconButton(
          onPressed: () {
            AppBottomSheet.display(
              context,
              bottomSheetContents: [
                FolderBottomSheet(
                  folder: widget.folder,
                  onComplete: context.pop,
                ),
              ],
            );
          },
          icon: Icon(Icons.more_vert),
        )
      ],
    );
  }

  _buildDocsShimmer() {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 20,
        crossAxisSpacing: 20,
      ),
      itemBuilder: (context, index) {
        return Shimmer.fromColors(
          baseColor: AppStyles.shimmerBaseColor,
          highlightColor: AppStyles.shipmmerHighlightColor,
          child: Container(
            width: double.maxFinite,
            height: 200,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: AppStyles.shimmerBaseColor,
            ),
          ),
        );
      },
      itemCount: 5,
    );
  }

  _buildNoDoc(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Image.asset(
            AppImages.noFolder,
            width: 200,
            height: 200,
            fit: BoxFit.contain,
          ),
          SizedBox(height: 20),
          Text(
            "This folder is empty",
            style: getTextTheme(context).titleLarge,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 7),
          Text(
            "Tap the + button to upload a file",
            style: getTextTheme(context).bodySmall,
          ),
        ],
      ),
    );
  }

  _buildDocs(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
        childAspectRatio: .9,
      ),
      itemBuilder: (context, index) => SingleDocument(document: documents[index]),
      itemCount: documents.length,
    );
  }

  _buildFloatingActionButton(BuildContext context) {
    return FloatingActionButton(
      heroTag: "Folder Details Floating Action Button",
      onPressed: () {
        AppBottomSheet.display(
          context,
          bottomSheetContents: [
            AddDocumentBottomSheet(
              folderId: widget.folder.id,
            ),
          ],
          initialChildSize: .5,
        );
      },
      child: Icon(Icons.add),
    );
  }
}
