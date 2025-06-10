part of 'clearance_bloc.dart';

@immutable
sealed class ClearanceEvent {}

class RequestClearanceRequested extends ClearanceEvent {}

class RequestSubClearanceRequested extends ClearanceEvent {}

class GetClearanceActivitiesRequested extends ClearanceEvent {}

class GetSubClearanceActivitiesRequested extends ClearanceEvent {
  final String studentClearanceId;

  GetSubClearanceActivitiesRequested(this.studentClearanceId);
}
