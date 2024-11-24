import 'package:app/domain/student/student_repository.dart';
import 'package:app/shared/network/network_service.dart';
import 'package:get_it/get_it.dart';

void setupStudentDomain(GetIt ioc) {
  ioc.registerSingleton<StudentRepository>(
    StudentRepository(
      networkService: NetworkService(
        hasAuth: true,
      ),
    ),
  );
}
