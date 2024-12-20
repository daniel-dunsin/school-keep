import 'package:app/configs/app_config.dart';
import 'package:app/presentation/documents/bloc/upload_document_progress_bloc/upload_document_progress_bloc.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';

class UploadProgressDialog {
  static void display(BuildContext context, {CancelToken? cancelToken}) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: Colors.transparent,
        child: Align(
          alignment: Alignment.center,
          child: Container(
            width: 240.w,
            height: 240.w,
            decoration: BoxDecoration(
              color: getColorScheme(context).primary,
              borderRadius: BorderRadius.circular(30),
            ),
            child: Column(
              children: [
                SizedBox(height: 20),
                Expanded(
                  child: Stack(
                    children: [
                      Center(
                        child: SizedBox(
                          height: 90,
                          width: 90,
                          child: CircularProgressIndicator(
                            strokeWidth: 5,
                            color: getColorScheme(context).surface,
                          ),
                        ),
                      ),
                      Center(
                        child: BlocConsumer<UploadDocumentProgressBloc, double>(
                          bloc: getIt.get<UploadDocumentProgressBloc>(),
                          listener: (context, state) {
                            if (state >= 99.5) {
                              context.pop();
                            }
                          },
                          builder: (context, state) {
                            return Text(
                              "${state.toStringAsFixed(1)}%",
                              style: getTextTheme(context).headlineLarge,
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 20),
                TextButton(
                  onPressed: () {
                    if (cancelToken != null) {
                      cancelToken.cancel();
                    }
                    context.pop();
                  },
                  child: Text(
                    "Cancel",
                    style: getTextTheme(context).bodySmall?.copyWith(
                          color: getColorScheme(context).onPrimary,
                        ),
                  ),
                ),
                SizedBox(height: 20)
              ],
            ),
          ),
        ),
      ),
    );
  }
}
