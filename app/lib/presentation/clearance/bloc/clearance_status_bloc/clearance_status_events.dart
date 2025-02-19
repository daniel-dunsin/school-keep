part of 'clearance_status_bloc.dart';

@immutable
sealed class ClearanceStatusEvents {}

class GetClearanceStatusRequested extends ClearanceStatusEvents {}
