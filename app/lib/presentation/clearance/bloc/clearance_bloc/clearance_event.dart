part of 'clearance_bloc.dart';

@immutable
sealed class ClearanceEvent {}

class RequestClearanceRequested extends ClearanceEvent {}

class RequestSubClearanceRequested extends ClearanceEvent {}
