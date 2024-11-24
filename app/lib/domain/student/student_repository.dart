import 'package:app/shared/network/network_service.dart';

class StudentRepository {
  final NetworkService networkService;

  StudentRepository({required this.networkService});

  getUser() async {
    final response = await networkService.get("/user");

    return response?.data;
  }
}
