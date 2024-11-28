import 'package:app/domain/auth/auth_repository.dart';
import 'package:app/shared/network/network_service.dart';
import 'package:get_it/get_it.dart';

void setupAuthDomain(GetIt ioc) {
  ioc.registerSingleton<AuthRepository>(
    AuthRepository(
      networkService: NetworkService(
        hasAuth: true,
      ),
    ),
  );
}
