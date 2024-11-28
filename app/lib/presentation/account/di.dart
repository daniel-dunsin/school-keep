import 'package:app/domain/auth/auth_repository.dart';
import 'package:app/presentation/account/blocs/account_bloc.dart';
import 'package:get_it/get_it.dart';

void setupAccountPresentation(GetIt ioc) {
  ioc.registerSingleton<AccountBloc>(
    AccountBloc(
      authRepository: ioc.get<AuthRepository>(),
    ),
  );
}
