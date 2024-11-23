import 'package:app/data/school/models/department_model.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SearchDepartmentDelegate extends SearchDelegate<String> {
  final List<DepartmentModel> departments;
  final Function(DepartmentModel department) onSelectDepartment;

  SearchDepartmentDelegate({
    super.searchFieldLabel,
    super.searchFieldStyle,
    super.searchFieldDecorationTheme,
    super.keyboardType,
    super.textInputAction,
    required this.departments,
    required this.onSelectDepartment,
  });

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.arrow_back),
      onPressed: context.pop,
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final results = query.isEmpty
        ? departments
        : departments
            .where(
              (dept) => dept.name.toLowerCase().contains(query.toLowerCase()) || dept.unionName!.toLowerCase().contains(query.toLowerCase()),
            )
            .toList();

    return Container(
      child: ListView.separated(
        itemCount: results.length,
        itemBuilder: (context, index) {
          final department = results[index];
          return ListTile(
            minTileHeight: 40,
            leading: CircleAvatar(
              radius: 20,
              backgroundImage: NetworkImage(department.logo!),
              onBackgroundImageError: (error, stack) {
                print(error);
              },
            ),
            title: Text(department.name),
            onTap: () {
              this.onSelectDepartment(department);
              context.pop();
            },
            contentPadding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
          );
        },
        separatorBuilder: (context, index) {
          return SizedBox(height: 10);
        },
      ),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return SizedBox();
  }

  @override
  ThemeData appBarTheme(BuildContext context) {
    return super.appBarTheme(context).copyWith(
          inputDecorationTheme: InputDecorationTheme(
            filled: false,
            focusedBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: getColorScheme(context).onPrimary),
            ),
            errorBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: getColorScheme(context).error),
            ),
          ),
        );
  }
}
