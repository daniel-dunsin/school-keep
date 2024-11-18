// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:app/configs/route/route_config.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/shared/network/enums.dart' as httpEnums;
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/storage.dart';
import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class NetworkInterceptors extends Interceptor {
  bool hasAuth;
  httpEnums.contentType contentType;

  NetworkInterceptors({
    required this.hasAuth,
    required this.contentType,
  });

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    if (hasAuth) {
      final accessToken = await AppStorage.getString(AppStorageKeys.accessToken);
      if (accessToken == null || accessToken.isNotEmpty) {
        options.headers["Authorization"] = "Bearer $accessToken";
      }
      options.headers["Content-Type"] = contentType == httpEnums.contentType.formType ? "multipart/form-data" : "application/json";
    }

    super.onRequest(options, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    final accessToken = await AppStorage.getString(AppStorageKeys.accessToken);
    if (accessToken != null) {
      final isExpired = JwtDecoder.isExpired(accessToken);
      if (isExpired) {
        _redirectToLogin();
      }
    }

    super.onError(err, handler);
  }

  void _redirectToLogin() {
    if (appNavKey.currentContext != null) {
      appNavKey.currentContext?.goNamed(AuthRoutes.signIn);
      NetworkToast.handleError("Session Expired, sign in to continue");
    }
  }
}
