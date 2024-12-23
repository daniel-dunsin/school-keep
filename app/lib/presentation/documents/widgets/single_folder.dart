import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/documents/routes/routes.dart';
import 'package:app/presentation/documents/widgets/folder_bottom_sheet.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SingleFolder extends StatefulWidget {
  final FolderModel folder;
  const SingleFolder({
    super.key,
    required this.folder,
  });

  @override
  State<SingleFolder> createState() => _SingleFolderState();
}

class _SingleFolderState extends State<SingleFolder> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        context.pushNamed(
          DocumentRoutes.folderDetail,
          extra: {
            "folder": widget.folder,
          },
        );
      },
      child: Container(
        child: Column(
          children: [
            Icon(
              Icons.folder,
              size: 100,
              color: Colors.grey,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    widget.folder.folderName,
                    textAlign: TextAlign.center,
                  ),
                ),
                IconButton(
                  onPressed: () {
                    AppBottomSheet.display(
                      context,
                      bottomSheetContents: [
                        FolderBottomSheet(folder: widget.folder),
                      ],
                    );
                  },
                  icon: Icon(
                    Icons.more_vert,
                    color: getColorScheme(context).onPrimary,
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
