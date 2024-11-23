import 'package:app/domain/school/school_repository.dart';
import 'package:app/shared/network/network_service.dart';
import 'package:get_it/get_it.dart';

void setupSchoolDomain(GetIt ioc) {
  ioc.registerSingleton<SchoolRepository>(
    SchoolRepository(
      networkService: NetworkService(),
    ),
  );
}
