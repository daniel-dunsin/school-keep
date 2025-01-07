// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/app_config.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ConfirmationModal<BlocType extends Bloc, LoadingStateType> extends StatelessWidget {
  final String title;
  final String? content;
  final VoidCallback onNo;
  final VoidCallback onYes;
  final Bloc? bloc;

  const ConfirmationModal({
    Key? key,
    required this.title,
    required this.onNo,
    required this.onYes,
    this.content,
    this.bloc,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder(
      bloc: getIt.get<BlocType>(),
      builder: (context, state) {
        return AlertDialog(
          title: Text(
            title,
            style: TextStyle(
              color: getColorScheme(context).onPrimary,
            ),
          ),
          content: content != null
              ? Text(
                  content ?? "",
                  style: TextStyle(
                    color: getColorScheme(context).onPrimary,
                  ),
                )
              : null,
          actions: [
            TextButton(
              onPressed: state is LoadingStateType ? null : onNo,
              child: Text(
                "No",
                style: getTextTheme(context).bodySmall,
              ),
            ),
            ContainedButton(
              width: 80,
              height: 10,
              padding: EdgeInsets.all(10),
              loading: state is LoadingStateType,
              child: Text(
                "Yes",
                style: getTextTheme(context).bodySmall?.copyWith(
                      color: AppColors.white,
                    ),
              ),
              onPressed: onYes,
            ),
          ],
        );
      },
    );
  }
}
