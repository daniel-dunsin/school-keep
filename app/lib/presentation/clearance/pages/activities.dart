import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/models/student_clearance_model.dart';
import 'package:app/presentation/clearance/bloc/clearance_bloc/clearance_bloc.dart';
import 'package:app/presentation/clearance/widgets/activities_list.dart';
import 'package:app/presentation/clearance/widgets/clearance_status_skeleton.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ClearanceActivitiesScreen extends StatefulWidget {
  final StudentSubClearanceModel? studentSubClearance;
  const ClearanceActivitiesScreen({super.key, this.studentSubClearance});

  @override
  State<ClearanceActivitiesScreen> createState() =>
      _ClearanceActivitiesScreenState();
}

class _ClearanceActivitiesScreenState extends State<ClearanceActivitiesScreen> {
  late final bool isSubClearance;

  @override
  void initState() {
    super.initState();
    isSubClearance = widget.studentSubClearance != null ? true : false;

    if (!isSubClearance) {
      getIt.get<ClearanceBloc>().add(GetClearanceActivitiesRequested());
    } else {
      getIt.get<ClearanceBloc>().add(
          GetSubClearanceActivitiesRequested(widget.studentSubClearance!.id));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(),
        title: Text(isSubClearance
            ? "${widget.studentSubClearance!.clearance?.clearanceName}"
            : "Your clearance"),
      ),
      body: BlocConsumer<ClearanceBloc, ClearanceState>(
        bloc: getIt.get<ClearanceBloc>(),
        listener: (context, state) {},
        builder: (context, state) {
          if (state is GetClearanceActivitiesLoading) {
            return ClearanceStatusSkeleton();
          } else if (state is GetClearanceActivitiesSuccess) {
            return Padding(
              padding: AppStyles.defaultPagePadding,
              child: ActivitiesList(activities: state.clearanceActivities),
            );
          } else {
            return Center(
              child: Text("Errorrrrrrrr"),
            );
          }
        },
      ),
    );
  }
}
