import 'package:app/shared/network/network_service.dart';

class FolderRepository {
  final NetworkService networkService;

  FolderRepository({required this.networkService});

  getFolders() async {
    final response = await this.networkService.get('/document/folder');

    return response?.data;
  }

  createFolder(String folderName) async {
    final response = await this.networkService.post(
      "/document/folder",
      data: {
        "folderName": folderName
      },
    );

    return response?.data;
  }

  deleteFolder(String folderId) async {
    final response = await this.networkService.delete("/document/folder/$folderId");

    return response?.data;
  }
}
