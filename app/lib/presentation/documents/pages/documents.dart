import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shimmer/shimmer.dart';

class DocumentsScreen extends StatefulWidget {
  const DocumentsScreen({super.key});

  @override
  State<DocumentsScreen> createState() => _DocumentsScreenState();
}

class _DocumentsScreenState extends State<DocumentsScreen> {
  List<FolderModel> folders = [];

  @override
  void initState() {
    super.initState();
    getIt.get<FoldersBloc>().add(GetFoldersRequested());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: AppStyles.defaultPagePadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Folders",
                style: getTextTheme(context).headlineLarge,
              ),
              SizedBox(height: 30),
              Expanded(
                child: BlocConsumer(
                  bloc: getIt.get<FoldersBloc>(),
                  buildWhen: (previous, current) => previous != current,
                  builder: (context, state) {
                    if (state is GetFoldersLoading) {
                      return _buildFoldersShimmer();
                    } else if (state is GetFoldersSuccess) {
                      print(state.folders);
                      return Visibility(
                        child: _buildFolders(),
                        replacement: _buildNoFolder(),
                        visible: state.folders.length > 0,
                      );
                    }
                    return _buildError();
                  },
                  listener: (context, state) {
                    if (state is GetFoldersSuccess) {
                      setState(() {
                        folders = state.folders;
                      });
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  _buildFoldersShimmer() {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 20,
        crossAxisSpacing: 20,
      ),
      itemBuilder: (context, index) {
        return Shimmer.fromColors(
          baseColor: AppStyles.shimmerBaseColor,
          highlightColor: AppStyles.shipmmerHighlightColor,
          child: Container(
            width: double.maxFinite,
            height: 200,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: AppStyles.shimmerBaseColor,
            ),
          ),
        );
      },
      itemCount: 1,
    );
  }

  _buildFolders() {
    return Center();
  }

  _buildNoFolder() {
    return Center(
      child: Text(
        "No folder",
        style: getTextTheme(context).bodyLarge,
      ),
    );
  }

  _buildError() {
    return Center(
      child: Text(
        "Error fetching folders",
        style: getTextTheme(context).bodyLarge,
      ),
    );
  }
}
