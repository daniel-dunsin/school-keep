// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/image.dart';
import 'package:flutter/material.dart';

class SchoolInfoTile extends StatelessWidget {
  final String image;
  final String title;
  final String? subtitle;

  const SchoolInfoTile({
    Key? key,
    required this.image,
    required this.title,
    this.subtitle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: AppCircleAvatar(
        image: image,
      ),
      contentPadding: EdgeInsets.symmetric(
        horizontal: 0,
        vertical: 10,
      ),
      title: Text(
        title,
        style: getTextTheme(context).bodySmall,
      ),
      subtitle: subtitle != null
          ? Text(
              subtitle ?? "",
              style: getTextTheme(context).labelSmall,
            )
          : null,
      isThreeLine: subtitle != null,
    );
  }
}
