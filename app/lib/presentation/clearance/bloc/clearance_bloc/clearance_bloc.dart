import 'package:app/configs/app_config.dart';
import 'package:app/domain/clearance/clearance_repository.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit_state.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'clearance_event.dart';
part 'clearance_state.dart';

class ClearanceBloc extends Bloc<ClearanceEvent, ClearanceState> {
  final ClearanceRepository clearanceRepository;

  ClearanceBloc({required this.clearanceRepository})
      : super(ClearanceInitialState()) {
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

    on<RequestSubClearanceRequested>((event, emit) async {
      emit(RequestSubClearanceLoading());

      try {
        final SubmitClearanceCubitState requestBody =
            getIt.get<SubmitClearanceCubit>().state;
        final response =
            await clearanceRepository.requestSubClearance(requestBody);

        final String? authUrl = response["data"]?["auth_url"];

        emit(
          RequestSubClearanceSuccess(
              goToPayment: authUrl != null, authUrl: authUrl),
        );
      } catch (e) {
        emit(RequestSubClearanceError());
        NetworkToast.handleError(e);
      }
    });
  }
}
