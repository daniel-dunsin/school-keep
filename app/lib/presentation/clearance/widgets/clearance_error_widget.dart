// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';

class ClearanceErrorWidget extends StatelessWidget {
  final String title;
  final VoidCallback onRetry;

  const ClearanceErrorWidget({
    Key? key,
    required this.title,
    required this.onRetry,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Image.asset(
            AppImages.noFolder,
            width: 200,
            height: 200,
            fit: BoxFit.contain,
          ),
          SizedBox(height: 20),
          Text(
            title,
            style: getTextTheme(context).titleLarge,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 30),
          ContainedButton(
            width: 150,
            height: 30,
            child: Text("Try again"),
            onPressed: onRetry,
          )
        ],
      ),
    );
  }
}
