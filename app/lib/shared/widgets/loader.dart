import 'dart:io';

import 'package:flutter/material.dart';

class AppLoader extends StatelessWidget {
  final double size;

  const AppLoader({
    super.key,
    this.size = 24,
  });

  @override
  Widget build(BuildContext context) {
    if (Platform.isIOS) {
      return SizedBox(
        width: size,
        height: size,
        child: CircularProgressIndicator.adaptive(
          strokeWidth: 4,
        ),
      );
    }

    if (Platform.isAndroid) {
      return SizedBox(
        width: size,
        height: size,
        child: CircularProgressIndicator(
          color: Colors.black54,
        ),
      );
    }

    return SizedBox.shrink();
  }
}
