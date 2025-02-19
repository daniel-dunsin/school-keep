import 'package:app/domain/clearance/clearance_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'clearance_event.dart';
part 'clearance_state.dart';

class ClearanceBloc extends Bloc<ClearanceEvent, ClearanceState> {
  final ClearanceRepository clearanceRepository;

  ClearanceBloc({required this.clearanceRepository}) : super(ClearanceInitialState()) {
    on<RequestClearanceRequested>(
      (event, emit) async {
        emit(RequestClearanceLoading());

        try {
          await clearanceRepository.requestClearance();

          emit(RequestClearanceSuccess());
        } catch (e) {
          emit(RequestClearanceError());
          NetworkToast.handleError(e);
        }
      },
    );
  }
}
