import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';

class AppBottomSheet {
  static void display(BuildContext context, {required List<Widget> bottomSheetContents, double initialChildSize = .8}) {
    showModalBottomSheet(
      context: context,
      useSafeArea: true,
      backgroundColor: Colors.transparent,
      barrierColor: Color.fromRGBO(46, 46, 46, 0.294),
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: initialChildSize,
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
}
