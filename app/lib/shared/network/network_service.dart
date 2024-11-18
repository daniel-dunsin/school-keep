// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/enums.dart';
import 'package:app/shared/network/network_interceptors.dart';
import 'package:dio/dio.dart';

class NetworkService {
  Dio? _dio;
  String? baseUrl = AppUrls.serverBaseUrl;
  bool hasAuth;
  bool isFormData;

  NetworkService({
    this.baseUrl,
    this.hasAuth = true,
    this.isFormData = false,
  }) {
    _dio = Dio(
      BaseOptions(
        baseUrl: AppUrls.serverBaseUrl,
      ),
    )..interceptors.add(
        NetworkInterceptors(
          hasAuth: hasAuth,
          contentType: isFormData ? contentType.formType : contentType.jsonType,
        ),
      );
  }

  get(String url, {Map<String, dynamic>? queryParameters}) {
    return _dio?.get(
      url,
      queryParameters: queryParameters,
    );
  }

  post(String url, {data, Map<String, dynamic>? queryParameters}) {
    return _dio?.post(
      url,
      data: data,
      queryParameters: queryParameters,
    );
  }

  put(String url, {data, Map<String, dynamic>? queryParameters}) {
    return _dio?.put(
      url,
      data: data,
      queryParameters: queryParameters,
    );
  }

  patch(String url, {data, Map<String, dynamic>? queryParameters}) {
    return _dio?.patch(
      url,
      data: data,
      queryParameters: queryParameters,
    );
  }

  delete(String url, {data, Map<String, dynamic>? queryParameters}) {
    return _dio?.delete(
      url,
      data: data,
      queryParameters: queryParameters,
    );
  }
}
