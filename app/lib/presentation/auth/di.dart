import 'package:app/domain/auth/auth_repository.dart';
import 'package:app/domain/school/school_repository.dart';
import 'package:app/presentation/auth/bloc/auth_bloc/auth_bloc.dart';
import 'package:app/presentation/auth/bloc/sign_up_steps_bloc/sign_up_steps_bloc.dart';
import 'package:get_it/get_it.dart';

void setupAuthPresentation(GetIt ioc) {
  ioc.registerSingleton<AuthBloc>(
    AuthBloc(
      authRepository: ioc.get<AuthRepository>(),
      schoolRepository: ioc.get<SchoolRepository>(),
    ),
  );

  ioc.registerSingleton<SignUpStepsBloc>(SignUpStepsBloc());
}
