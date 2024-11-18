import 'package:app/domain/auth/di.dart';
import 'package:app/presentation/auth/di.dart';
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

void setupApp() {
  setupAuthDomain(getIt);
  setupAuthPresentation(getIt);
}
