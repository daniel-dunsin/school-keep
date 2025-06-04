import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit_state.dart';
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

  Future requestSubClearance(SubmitClearanceCubitState requestBody) async {
    final response = await networkService.post(
        requestBody.schoolClearance!.paymentRequired
            ? "/clearance/student-clearance/request/paid"
            : "/clearance/student-clearance/request",
        data: requestBody.toApiMap());

    return response?.data;
  }
}
