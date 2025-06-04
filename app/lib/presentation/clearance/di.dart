import 'package:app/domain/clearance/clearance_repository.dart';
import 'package:app/presentation/clearance/bloc/clearance_bloc/clearance_bloc.dart';
import 'package:app/presentation/clearance/bloc/clearance_status_bloc/clearance_status_bloc.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit.dart';
import 'package:get_it/get_it.dart';

void setupClearancePresentation(GetIt ioc) {
  ioc.registerSingleton<ClearanceStatusBloc>(
    ClearanceStatusBloc(
      clearanceRepository: ioc.get<ClearanceRepository>(),
    ),
  );

  ioc.registerSingleton<ClearanceBloc>(
    ClearanceBloc(
      clearanceRepository: ioc.get<ClearanceRepository>(),
    ),
  );

  ioc.registerSingleton<SubmitClearanceCubit>(SubmitClearanceCubit());
}
