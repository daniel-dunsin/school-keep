part of 'announcements_bloc.dart';

@immutable
sealed class AnnouncementsEvent {}

class GetAnnouncementsRequested extends AnnouncementsEvent {}
