import 'package:app/domain/announcements/di.dart';
import 'package:app/domain/auth/di.dart';
import 'package:app/domain/clearance/di.dart';
import 'package:app/domain/documents/di.dart';
import 'package:app/domain/school/di.dart';
import 'package:app/domain/student/di.dart';
import 'package:app/presentation/account/di.dart';
import 'package:app/presentation/auth/di.dart';
import 'package:app/presentation/clearance/di.dart';
import 'package:app/presentation/documents/di.dart';
import 'package:app/presentation/home/di.dart';
import 'package:app/shared/cubits/di.dart';
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

void setupApp() {
  setupAuthDomain(getIt);
  setupSchoolDomain(getIt);
  setupStudentDomain(getIt);
  setupAnnouncementDomain(getIt);
  setupAppCubit(getIt);
  setupDocumentsDomain(getIt);
  setupClearanceDomain(getIt);

  setupAuthPresentation(getIt);
  setupHomePresentation(getIt);
  setupAccountPresentation(getIt);
  setupDocumentsPresentation(getIt);
  setupClearancePresentation(getIt);
}
