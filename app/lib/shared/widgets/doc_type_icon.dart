// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:hugeicons/hugeicons.dart';

class DocTypeIcon extends StatelessWidget {
  final Color iconColor;
  final IconData icon;
  final double? size;

  const DocTypeIcon({
    Key? key,
    required this.iconColor,
    required this.icon,
    this.size = 20,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return HugeIcon(
      icon: icon,
      color: iconColor,
      size: size!,
    );
  }
}
