import 'package:app/domain/documents/document_form_data_repository.dart';
import 'package:app/domain/documents/document_repository.dart';
import 'package:app/domain/documents/folder_repository.dart';
import 'package:app/shared/network/network_service.dart';
import 'package:get_it/get_it.dart';

void setupDocumentsDomain(GetIt ioc) {
  ioc.registerSingleton<DocumentRepository>(
    DocumentRepository(
      networkService: NetworkService(),
    ),
  );

  ioc.registerSingleton<FolderRepository>(
    FolderRepository(
      networkService: NetworkService(),
    ),
  );

  ioc.registerSingleton<DocumentFormDataRepository>(
    DocumentFormDataRepository(
      networkService: NetworkService(
        isFormData: true,
      ),
    ),
  );
}
