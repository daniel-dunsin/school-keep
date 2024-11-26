import 'package:app/data/announcements/models/announcement_model.dart';
import 'package:app/domain/announcements/announcements_repository.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'announcements_event.dart';
part 'announcements_state.dart';

class AnnouncementsBloc extends Bloc<AnnouncementsEvent, AnnouncementsState> {
  final AnnouncementsRepository announcementsRepository;

  AnnouncementsBloc({required this.announcementsRepository}) : super(AnnouncementsInitialState()) {
    on<GetAnnouncementsRequested>(
      (event, emit) async {
        emit(GetAnnouncementsLoading());
        try {
          final response = await this.announcementsRepository.getAnnouncements();
          final announcementsMap = response["data"] as List<dynamic>;

          final announcements = announcementsMap.map((a) => AnnouncementModel.fromMap(a)).toList();

          emit(GetAnnouncementsSuccess(announcements));
        } catch (e) {
          NetworkToast.handleError(e);
          emit(GetAnnouncementsError());
        }
      },
    );
  }
}
