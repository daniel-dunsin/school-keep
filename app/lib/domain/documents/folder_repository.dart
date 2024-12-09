import 'package:app/shared/network/network_service.dart';

class FolderRepository {
  final NetworkService networkService;

  FolderRepository({required this.networkService});

  getFolders() async {
    final response = await this.networkService.get('/document/folder');

    return response?.data;
  }
}
