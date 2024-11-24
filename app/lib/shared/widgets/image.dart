import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/loader.dart';
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class AppImage extends StatelessWidget {
  final String image;
  final double width;
  final double height;

  const AppImage({
    super.key,
    required this.image,
    this.width = 40,
    this.height = 40,
  });

  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: image,
      width: width,
      height: height,
      fit: BoxFit.cover,
      useOldImageOnUrlChange: true,
      placeholder: (context, _) {
        return Container(
          width: width,
          height: height,
          color: getColorScheme(context).secondary,
          child: AppLoader(size: 12),
        );
      },
      errorWidget: (context, _, __) {
        return Icon(
          Icons.warning_outlined,
          color: getColorScheme(context).error,
          size: 12.h,
        );
      },
    );
  }
}

class AppCircleAvatar extends StatelessWidget {
  final String image;
  final double radius;

  const AppCircleAvatar({
    super.key,
    required this.image,
    this.radius = 20,
  });

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      backgroundImage: CachedNetworkImageProvider(
        image,
      ),
      radius: radius,
    );
  }
}
