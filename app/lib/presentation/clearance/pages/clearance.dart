import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/enums/clearance_enums.dart';
import 'package:app/presentation/clearance/bloc/clearance_status_bloc/clearance_status_bloc.dart';
import 'package:app/presentation/clearance/widgets/can_not_request_clearance_widget.dart';
import 'package:app/presentation/clearance/widgets/can_request_clearance_widget.dart';
import 'package:app/presentation/clearance/widgets/clearance_completed_widget.dart';
import 'package:app/presentation/clearance/widgets/clearance_error_widget.dart';
import 'package:app/presentation/clearance/widgets/clearance_in_progress_widget.dart';
import 'package:app/presentation/clearance/widgets/clearance_rejected_widget.dart';
import 'package:app/presentation/clearance/widgets/clearance_requested_widget.dart';
import 'package:app/presentation/clearance/widgets/clearance_status_skeleton.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hugeicons/hugeicons.dart';

class ClearanceScreen extends StatefulWidget {
  const ClearanceScreen({super.key});

  @override
  State<ClearanceScreen> createState() => _ClearanceScreenState();
}

class _ClearanceScreenState extends State<ClearanceScreen> {
  @override
  void initState() {
    super.initState();
    _getClearanceStatus();
  }

  void _getClearanceStatus() {
    getIt.get<ClearanceStatusBloc>().add(GetClearanceStatusRequested());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 40,
        actions: [
          IconButton(
            onPressed: _getClearanceStatus,
            icon: Text(
              "Refresh",
              style: getTextTheme(context).labelSmall?.copyWith(
                    color: getColorScheme(context).surface,
                  ),
            ),
          ),
        ],
      ),
      body: _buildDisplay(),
    );
  }

  _buildDisplay() {
    return BlocBuilder<ClearanceStatusBloc, ClearanceStatusState>(
      bloc: getIt.get<ClearanceStatusBloc>(),
      builder: (context, state) {
        if (state is GetClearanceStatusLoading) {
          return ClearanceStatusSkeleton();
        } else if (state is GetClearanceStatusError) {
          return ClearanceErrorWidget(
            title: "Unable to fetch clearance state",
            onRetry: _getClearanceStatus,
          );
        } else if (state is GetClearanceStatusSuccess) {
          switch (state.data.status) {
            case RequestClearanceStatus.CAN_NOT_REQUEST:
              return CanNotRequestClearanceWidget(clearanceStatus: state.data);
            case RequestClearanceStatus.CAN_REQUEST:
              return CanRequestClearanceWidget(clearanceStatus: state.data);
            case RequestClearanceStatus.REQUESTED:
              return ClearanceRequestedWidget(clearanceStatus: state.data);

            // not done
            case RequestClearanceStatus.REJECTED:
              return ClearanceRejectedWidget(clearanceStatus: state.data);

            // doing now
            case RequestClearanceStatus.IN_PROGRESS:
              return ClearanceInProgressWidget(clearanceStatus: state.data);

            // not done
            case RequestClearanceStatus.COMPLETED:
              return ClearanceCompletedWidget(clearanceStatus: state.data);
          }
        } else {
          return SizedBox.shrink();
        }
      },
    );
  }
}
