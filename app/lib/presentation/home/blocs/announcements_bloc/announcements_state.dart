part of 'announcements_bloc.dart';

@immutable
sealed class AnnouncementsState {}

class AnnouncementsInitialState extends AnnouncementsState {}

class GetAnnouncementsLoading extends AnnouncementsState {}

class GetAnnouncementsSuccess extends AnnouncementsState {
  final List<AnnouncementModel> announcements;

  GetAnnouncementsSuccess(this.announcements);
}

class GetAnnouncementsError extends AnnouncementsState {}
