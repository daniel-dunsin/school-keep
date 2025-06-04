import 'package:app/shared/network/network_toast.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:webview_flutter_plus/webview_flutter_plus.dart';

class PaymentView extends StatefulWidget {
  final String authUrl;
  final VoidCallback onSuccess;

  const PaymentView({
    super.key,
    required this.onSuccess,
    required this.authUrl,
  });

  @override
  State<PaymentView> createState() => _PaymentViewState();
}

class _PaymentViewState extends State<PaymentView> with WidgetsBindingObserver {
  late WebViewControllerPlus _controller;

  void showError(error) {
    GoRouter.of(context).pop();
    NetworkToast.handleError("Error initiating payment");

    if (kDebugMode) {
      print("Payment init error $error");
    }
  }

  void goBack() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      GoRouter.of(context).pop();
    });
  }

  @override
  void initState() {
    super.initState();

    _controller = WebViewControllerPlus()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onHttpError: (error) {},
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.contains("?reference=")) {
              goBack();
              widget.onSuccess();
              return NavigationDecision.prevent;
            }

            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.authUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: WebViewWidget(controller: _controller),
      ),
    );
  }
}
