import 'package:app/shared/cubits/app_cubit.dart';
import 'package:get_it/get_it.dart';

void setupAppCubit(GetIt ioc) {
  ioc.registerSingleton<AppCubit>(AppCubit());
}
