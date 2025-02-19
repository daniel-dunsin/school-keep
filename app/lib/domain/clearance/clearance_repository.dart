import 'package:app/shared/network/network_service.dart';

class ClearanceRepository {
  final NetworkService networkService;

  ClearanceRepository({required this.networkService});

  Future getStudentClearanceStatus() async {
    final response = await networkService.get("/clearance/student");

    return response?.data;
  }

  Future requestClearance() async {
    final response = await networkService.post("/clearance/request");

    return response?.data;
  }
}
