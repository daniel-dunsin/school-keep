part of 'account_bloc.dart';

@immutable
sealed class AccountState {}

class AccountInitialState extends AccountState {}

class SignOutLoading extends AccountState {}

class SignOutSuccessful extends AccountState {}

class SignOutError extends AccountState {}
