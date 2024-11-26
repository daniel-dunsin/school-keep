import 'package:app/domain/announcements/announcements_repository.dart';
import 'package:app/shared/network/network_service.dart';
import 'package:get_it/get_it.dart';

void setupAnnouncementDomain(GetIt ioc) {
  ioc.registerSingleton<AnnouncementsRepository>(
    AnnouncementsRepository(
      networkService: NetworkService(
        hasAuth: true,
      ),
    ),
  );
}
