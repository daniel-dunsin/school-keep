part of 'clearance_bloc.dart';

@immutable
sealed class ClearanceState {}

class ClearanceInitialState extends ClearanceState {}

class RequestClearanceLoading extends ClearanceState {}

class RequestClearanceSuccess extends ClearanceState {}

class RequestClearanceError extends ClearanceState {}

class RequestSubClearanceLoading extends ClearanceState {}

class RequestSubClearanceSuccess extends ClearanceState {
  final bool goToPayment;
  final String? authUrl;

  RequestSubClearanceSuccess(
      {required this.goToPayment, required this.authUrl});
}

class RequestSubClearanceError extends ClearanceState {}

class GetClearanceActivitiesLoading extends ClearanceState {}

class GetClearanceActivitiesSuccess extends ClearanceState {
  final List<ClearanceActivityModel> clearanceActivities;

  GetClearanceActivitiesSuccess(this.clearanceActivities);
}

class GetClearanceActivitiesError extends ClearanceState {}
