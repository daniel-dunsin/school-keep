import 'package:app/data/clearance/models/student_clearance_status_model.dart';
import 'package:app/domain/clearance/clearance_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/widgets.dart';

part 'clearance_status_events.dart';
part 'clearance_status_state.dart';

class ClearanceStatusBloc extends Bloc<ClearanceStatusEvents, ClearanceStatusState> {
  final ClearanceRepository clearanceRepository;

  ClearanceStatusBloc({required this.clearanceRepository}) : super(ClearanceInitialState()) {
    on<GetClearanceStatusRequested>(
      (event, emit) async {
        emit(GetClearanceStatusLoading());

        try {
          final response = await clearanceRepository.getStudentClearanceStatus();

          final data = response?["data"] as Map;

          print(data);
          print(StudentClearanceStatusModel.fromMap(data));

          emit(
            GetClearanceStatusSuccess(
              StudentClearanceStatusModel.fromMap(data),
            ),
          );
        } catch (e) {
          emit(GetClearanceStatusError());
          NetworkToast.handleError(e);
        }
      },
    );
  }
}
