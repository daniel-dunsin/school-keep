import 'package:app/configs/route/route_config.dart';
import 'package:go_router/go_router.dart';

class CustomNavigations {
  static void popUntil(String route, {Map? extra}) {
    final navKeyContext = appNavKey.currentContext;

    if (navKeyContext != null) {
      while (navKeyContext.canPop()) {
        navKeyContext.pop();
      }

      navKeyContext.pushNamed(route, extra: extra);
    }
  }
}
