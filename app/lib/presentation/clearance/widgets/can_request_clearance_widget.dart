// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/models/student_clearance_status_model.dart';
import 'package:app/presentation/clearance/bloc/clearance_bloc/clearance_bloc.dart';
import 'package:app/presentation/clearance/bloc/clearance_status_bloc/clearance_status_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CanRequestClearanceWidget extends StatelessWidget {
  final StudentClearanceStatusModel clearanceStatus;

  const CanRequestClearanceWidget({
    Key? key,
    required this.clearanceStatus,
  }) : super(key: key);

  void submit() {
    getIt.get<ClearanceBloc>().add(RequestClearanceRequested());
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: AppStyles.defaultPagePadding,
      child: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              clearanceStatus.message,
              style: getTextTheme(context).titleLarge,
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 30),
            BlocConsumer<ClearanceBloc, ClearanceState>(
              bloc: getIt.get<ClearanceBloc>(),
              listener: (context, state) {
                if (state is RequestClearanceSuccess) {
                  getIt.get<ClearanceStatusBloc>().add(GetClearanceStatusRequested());
                }
              },
              builder: (context, state) {
                return ContainedButton(
                  height: 30,
                  child: Text("Request Clearance"),
                  onPressed: submit,
                  loading: state is RequestClearanceLoading,
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
