import 'package:app/shared/network/network_service.dart';

class AnnouncementsRepository {
  final NetworkService networkService;

  AnnouncementsRepository({required this.networkService});

  getAnnouncements() async {
    final response = await this.networkService.get("/announcement/student");

    return response?.data;
  }
}
