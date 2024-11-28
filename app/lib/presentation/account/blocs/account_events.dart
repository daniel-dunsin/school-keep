part of 'account_bloc.dart';

@immutable
sealed class AccountEvents {}

class SignOutRequested extends AccountEvents {}
