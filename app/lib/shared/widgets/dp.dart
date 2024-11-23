import 'dart:io';

import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class Dp extends StatelessWidget {
  final double size;
  final String? image;
  final File? fileImage;
  final VoidCallback? onPressed;
  const Dp({
    super.key,
    this.size = 200,
    this.image,
    this.fileImage,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          border: Border.all(
            color: getColorScheme(context).surface,
            width: 3,
          ),
          borderRadius: BorderRadius.circular(size),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(size),
          child: Image(
            image: fileImage != null
                ? FileImage(fileImage!)
                : NetworkImage(
                    image ?? AppImages.noDp,
                  ),
            width: size,
            height: size,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
