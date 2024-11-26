import 'package:app/domain/announcements/announcements_repository.dart';
import 'package:app/presentation/home/blocs/announcements_bloc/announcements_bloc.dart';
import 'package:get_it/get_it.dart';

void setupHomePresentation(GetIt ioc) {
  ioc.registerSingleton<AnnouncementsBloc>(
    AnnouncementsBloc(
      announcementsRepository: ioc.get<AnnouncementsRepository>(),
    ),
  );
}
