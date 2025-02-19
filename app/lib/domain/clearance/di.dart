import 'package:app/domain/clearance/clearance_repository.dart';
import 'package:app/shared/network/network_service.dart';
import 'package:get_it/get_it.dart';

void setupClearanceDomain(GetIt ioc) {
  ioc.registerSingleton<ClearanceRepository>(
    ClearanceRepository(
      networkService: NetworkService(),
    ),
  );
}
