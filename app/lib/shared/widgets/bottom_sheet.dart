import 'dart:math';

import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class AppBottomSheet {
  static void display(BuildContext context, {required List<Widget> bottomSheetContents, double initialChildSize = .8}) async {
    showModalBottomSheet(
      context: context,
      useSafeArea: true,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Color.fromRGBO(46, 46, 46, 0.294),
      isDismissible: true,
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: initialChildSize,
          minChildSize: max(initialChildSize - .1, .1),
          builder: (context, scrollController) {
            return Container(
              decoration: BoxDecoration(
                color: getColorScheme(context).primary,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
              ),
              child: CustomScrollView(
                controller: scrollController,
                slivers: [
                  SliverToBoxAdapter(
                    child: Center(
                      child: Container(
                        decoration: BoxDecoration(
                          color: getColorScheme(context).onPrimary,
                          borderRadius: const BorderRadius.all(Radius.circular(10)),
                        ),
                        height: 4,
                        width: 40,
                        margin: const EdgeInsets.symmetric(vertical: 10),
                      ),
                    ),
                  ),
                  SliverList.list(
                    children: bottomSheetContents,
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  static ListTile buildTile(
    BuildContext context, {
    required String title,
    required IconData icon,
    required VoidCallback onTap,
    Color? color,
  }) {
    return ListTile(
      onTap: onTap,
      leading: Icon(
        icon,
        color: color,
      ),
      contentPadding: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
      title: Text(
        title,
        style: getTextTheme(context).bodyLarge?.copyWith(
              color: color,
            ),
      ),
    );
  }
}
