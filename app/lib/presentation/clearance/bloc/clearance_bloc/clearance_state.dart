part of 'clearance_bloc.dart';

@immutable
sealed class ClearanceState {}

class ClearanceInitialState extends ClearanceState {}

class RequestClearanceLoading extends ClearanceState {}

class RequestClearanceSuccess extends ClearanceState {}

class RequestClearanceError extends ClearanceState {}
