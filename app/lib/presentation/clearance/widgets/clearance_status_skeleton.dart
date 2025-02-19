import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class ClearanceStatusSkeleton extends StatelessWidget {
  const ClearanceStatusSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppStyles.defaultPagePadding,
          child: Shimmer.fromColors(
            baseColor: AppStyles.shimmerBaseColor,
            highlightColor: AppStyles.shipmmerHighlightColor,
            child: Column(
              children: [
                Container(
                  height: 200,
                  width: double.maxFinite,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                  ),
                ),
                SizedBox(height: 20),
                Container(
                  height: 10,
                  width: double.maxFinite,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                  ),
                ),
                SizedBox(height: 20),
                for (int i = 0; i < 5; i++)
                  Container(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ListTile(
                          minTileHeight: 50,
                          minVerticalPadding: 0,
                          contentPadding: EdgeInsets.symmetric(vertical: 0, horizontal: 0),
                          leading: Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(100),
                              color: Colors.grey.shade200,
                            ),
                          ),
                          title: Container(
                            width: double.maxFinite,
                            height: 50,
                            decoration: BoxDecoration(
                              color: Colors.grey.shade200,
                            ),
                          ),
                        ),
                        i != 4
                            ? Container(
                                height: 60,
                                width: 5,
                                margin: EdgeInsets.only(left: 25),
                                decoration: BoxDecoration(
                                  color: Colors.grey.shade200,
                                ),
                              )
                            : SizedBox.shrink()
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
