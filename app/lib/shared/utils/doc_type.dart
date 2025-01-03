import 'package:app/data/documents/models/document_model.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/doc_type_icon.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:app/shared/widgets/video_player.dart';
import 'package:flutter/material.dart';
import 'package:hugeicons/hugeicons.dart';

enum DocType {
  image,
  video,
  pdf,
  xlsx,
  pptx,
  csv,
  apk,
  json,
  doc,
  txt,
  unknown
}

class DocTypeUtils {
  static DocType getDocTypeFromMimeType(String mimeType) {
    switch (mimeType) {
      // Image MIME types
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/bmp':
      case 'image/webp':
        return DocType.image;

      // Video MIME types
      case 'video/mp4':
      case 'video/avi':
      case 'video/mpeg':
      case 'video/webm':
      case 'video/quicktime':
        return DocType.video;

      // PDF MIME type
      case 'application/pdf':
        return DocType.pdf;

      // Excel MIME types
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return DocType.xlsx;

      // PowerPoint MIME types
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      case 'application/vnd.ms-powerpoint':
        return DocType.pptx;

      case 'application/msword': // .doc
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // .docx
        return DocType.doc;

      case 'text/plain':
        return DocType.txt;

      // CSV MIME type
      case 'text/csv':
        return DocType.csv;

      // APK MIME type
      case 'application/vnd.android.package-archive':
        return DocType.apk;

      // JSON MIME type
      case 'application/json':
      case 'text/json':
        return DocType.json;

      // Unknown or unsupported types
      default:
        return DocType.unknown;
    }
  }

  static DocTypeIcon getDocTypeIcon({required String mimeType, required BuildContext context, double size = 20}) {
    final docType = getDocTypeFromMimeType(mimeType);

    switch (docType) {
      case DocType.image:
        return DocTypeIcon(
          size: size,
          iconColor: getColorScheme(context).onPrimary,
          icon: HugeIcons.strokeRoundedImage01,
        );
      case DocType.video:
        return DocTypeIcon(
          size: size,
          iconColor: getColorScheme(context).onPrimary,
          icon: HugeIcons.strokeRoundedVideo01,
        );
      case DocType.apk:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.green,
          icon: HugeIcons.strokeRoundedPlayStore,
        );
      case DocType.csv:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.blue,
          icon: HugeIcons.strokeRoundedCsv01,
        );
      case DocType.pdf:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.red,
          icon: HugeIcons.strokeRoundedPdf01,
        );
      case DocType.json:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.green,
          icon: HugeIcons.strokeRoundedThirdBracket,
        );
      case DocType.xlsx:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.green,
          icon: HugeIcons.strokeRoundedXls01,
        );
      case DocType.pptx:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.red,
          icon: HugeIcons.strokeRoundedPpt01,
        );
      case DocType.doc:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.blue,
          icon: HugeIcons.strokeRoundedDoc01,
        );
      case DocType.txt:
        return DocTypeIcon(
          size: size,
          iconColor: Colors.blue,
          icon: HugeIcons.strokeRoundedTxt01,
        );
      case DocType.unknown:
        return DocTypeIcon(
          size: size,
          iconColor: getColorScheme(context).onPrimary,
          icon: HugeIcons.strokeRoundedFileUnknown,
        );
    }
  }

  static Widget getDocPreview({
    required String mimeType,
    required DocumentModel document,
    required BuildContext context,
    bool previewVideo = false,
  }) {
    final docType = getDocTypeFromMimeType(mimeType);

    switch (docType) {
      case DocType.image:
        return AppImage(image: document.url);

      case DocType.video:
        return AppVideoPlayer(
          videoUrl: document.url,
          playOnStart: previewVideo,
        );

      default:
        return Center(
          child: getDocTypeIcon(
            mimeType: mimeType,
            context: context,
            size: 30,
          ),
        );
    }
  }
}
