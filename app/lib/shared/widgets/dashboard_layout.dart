import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DashboardLayout extends StatefulWidget {
  final StatefulNavigationShell shell;

  const DashboardLayout({
    super.key,
    required this.shell,
  });

  @override
  State<DashboardLayout> createState() => _DashboardLayoutState();
}

class _DashboardLayoutState extends State<DashboardLayout> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.shell,
      bottomNavigationBar: _buildBottomNavigator(),
    );
  }

  _buildBottomNavigator() {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            width: .2,
            color: getColorScheme(context).onSecondary,
          ),
        ),
      ),
      child: Theme(
        data: Theme.of(context).copyWith(
          splashColor: Colors.transparent,
          splashFactory: NoSplash.splashFactory,
        ),
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          elevation: 10,
          enableFeedback: true,
          onTap: (page) {
            if (widget.shell.currentIndex == page) {
              widget.shell.goBranch(page, initialLocation: true);
            } else {
              widget.shell.goBranch(page);
            }
          },
          currentIndex: widget.shell.currentIndex,
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              activeIcon: Icon(Icons.home_filled),
              label: "Home",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.track_changes_outlined),
              activeIcon: Icon(Icons.track_changes),
              label: "Activities",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.document_scanner_outlined),
              activeIcon: Icon(Icons.document_scanner),
              label: "Documents",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle_outlined),
              activeIcon: Icon(Icons.account_circle),
              label: "Account",
            ),
          ],
        ),
      ),
    );
  }
}
