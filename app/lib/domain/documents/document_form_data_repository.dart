import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/add_document_model.dart';
import 'package:app/presentation/documents/bloc/upload_document_progress_bloc/upload_document_progress_bloc.dart';
import 'package:app/shared/network/network_service.dart';

class DocumentFormDataRepository {
  final NetworkService networkService;

  DocumentFormDataRepository({required this.networkService});

  createDocument(AddDocumentModel data) async {
    final response = await this.networkService.post(
      "/document",
      data: await data.toFormData(),
      cancelToken: data.cancelToken,
      onSendProgress: (int sent, int total) {
        final double average = total != 0 ? (sent / total) * 100 : 0;

        getIt.get<UploadDocumentProgressBloc>().add(
              ChangeUploadDocumentProgress(
                average,
              ),
            );
      },
    );

    return await response?.data;
  }
}
