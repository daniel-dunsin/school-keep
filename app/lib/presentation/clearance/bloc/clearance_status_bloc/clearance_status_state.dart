part of 'clearance_status_bloc.dart';

@immutable
sealed class ClearanceStatusState {}

class ClearanceInitialState extends ClearanceStatusState {}

class GetClearanceStatusLoading extends ClearanceStatusState {}

class GetClearanceStatusSuccess extends ClearanceStatusState {
  final StudentClearanceStatusModel data;

  GetClearanceStatusSuccess(this.data);
}

class GetClearanceStatusError extends ClearanceStatusState {}
