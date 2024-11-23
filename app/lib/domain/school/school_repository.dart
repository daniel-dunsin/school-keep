import 'package:app/shared/network/network_service.dart';

class SchoolRepository {
  final NetworkService networkService;

  SchoolRepository({required this.networkService});

  getSchools() async {
    final response = await this.networkService.get("/school");

    return response?.data;
  }

  getColleges(String schoolId) async {
    final response = await this.networkService.get("/school/$schoolId/college");

    return response?.data;
  }

  getDepartments(String collegeId) async {
    final response = await this.networkService.get("/school/college/$collegeId/department");

    return response?.data;
  }
}
