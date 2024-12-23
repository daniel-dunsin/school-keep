import 'package:app/shared/network/network_service.dart';

class DocumentRepository {
  final NetworkService networkService;

  DocumentRepository({required this.networkService});

  getFolderDocuments(String folderId) async {
    final response = await this.networkService.get("/document/folder/$folderId/documents");

    return response?.data;
  }
}
