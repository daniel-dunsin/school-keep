import 'package:app/data/documents/models/document_model.dart';
import 'package:app/presentation/documents/routes/routes.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

class SingleDocumentVersion extends StatelessWidget {
  final DocumentModel? nextVersion;
  final DocumentModel currentVersion;
  final DocumentModel? previousVersion;

  const SingleDocumentVersion({
    super.key,
    required this.currentVersion,
    required this.previousVersion,
    required this.nextVersion,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildChangeIndicator(context),
        GestureDetector(
          onTap: () {
            context.push(
              DocumentRoutes.documentDetail,
              extra: {
                "document": currentVersion,
                "showOptions": false,
              },
            );
          },
          child: Card(
            margin: EdgeInsets.all(0),
            color: getColorScheme(context).primary,
            child: Container(
              width: double.maxFinite,
              padding: EdgeInsets.all(15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildVersionNumberAndChanges(context),
                  SizedBox(height: 20),
                  _buildUser(context),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildChangeIndicator(context) {
    if (nextVersion != null) {
      return Container(
        width: 2,
        height: 50,
        margin: EdgeInsets.only(left: 15),
        color: getColorScheme(context).onSecondary,
      );
    }
    return SizedBox();
  }

  Widget _buildVersionNumberAndChanges(BuildContext context) {
    return RichText(
      text: TextSpan(children: [
        WidgetSpan(
          alignment: PlaceholderAlignment.middle,
          child: Container(
            width: 40,
            height: 30,
            decoration: BoxDecoration(
              color: AppColors.mainLight,
              borderRadius: BorderRadius.circular(50),
            ),
            child: Center(
              child: Text(
                "v${currentVersion.version}",
                style: getTextTheme(context).bodyLarge?.copyWith(
                      color: AppColors.white,
                    ),
              ),
            ),
          ),
        ),
        WidgetSpan(
          child: SizedBox(
            width: 15,
          ),
        ),
        TextSpan(
          style: getTextTheme(context).bodyLarge?.copyWith(
                color: getColorScheme(context).onPrimary,
              ),
          text: getVersionChanges(),
        ),
      ]),
    );
  }

  getVersionChanges() {
    if (currentVersion == 1 || previousVersion == null) {
      return "Created ${currentVersion.name}";
    } else {
      if (currentVersion.name != previousVersion?.name && currentVersion.url != previousVersion?.url) {
        return "Uploaded new file and updated document name";
      } else if (currentVersion.name != previousVersion?.name) {
        return "Updated document name";
      } else if (currentVersion.url != previousVersion?.url) {
        return "Uploaded new file";
      }
    }
  }

  _buildUser(BuildContext context) {
    return RichText(
      text: TextSpan(
        style: getTextTheme(context).bodySmall?.copyWith(
              color: getColorScheme(context).onPrimary,
            ),
        children: [
          WidgetSpan(
            alignment: PlaceholderAlignment.middle,
            child: AppCircleAvatar(
              radius: 15,
              image: currentVersion.uploadedBy.profilePicture,
            ),
          ),
          WidgetSpan(
            child: SizedBox(width: 10),
          ),
          TextSpan(text: "${currentVersion.uploadedBy.firstName} ${currentVersion.uploadedBy.lastName} • ${DateFormat.yMMMd().format(currentVersion.createdAt!)}")
        ],
      ),
    );
  }
}
