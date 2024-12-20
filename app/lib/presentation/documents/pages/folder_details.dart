import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/documents/widgets/add_document_bottom_sheet.dart';
import 'package:app/presentation/documents/widgets/folder_bottom_sheet.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shimmer/shimmer.dart';

class FolderDetailScreen extends StatelessWidget {
  final FolderModel folder;

  const FolderDetailScreen({super.key, required this.folder});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: Padding(
        padding: AppStyles.defaultPagePadding,
        child: _buildNoDoc(context),
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
      title: Text(folder.folderName),
      actions: [
        IconButton(
          onPressed: () {
            AppBottomSheet.display(
              context,
              bottomSheetContents: [
                FolderBottomSheet(
                  folder: folder,
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

  _buildFloatingActionButton(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        AppBottomSheet.display(
          context,
          bottomSheetContents: [
            AddDocumentBottomSheet(
              folderId: folder.id,
            ),
          ],
          initialChildSize: .5,
        );
      },
      child: Icon(Icons.add),
    );
  }
}
