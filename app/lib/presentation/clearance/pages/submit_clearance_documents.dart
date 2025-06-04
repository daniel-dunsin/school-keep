import 'package:app/configs/app_config.dart';
import 'package:app/data/clearance/models/school_clearance.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/data/documents/models/folder_model.dart';
import 'package:app/presentation/clearance/bloc/clearance_bloc/clearance_bloc.dart';
import 'package:app/presentation/clearance/bloc/clearance_status_bloc/clearance_status_bloc.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit_state.dart';
import 'package:app/presentation/clearance/routes/routes.dart';
import 'package:app/presentation/clearance/widgets/submit_clearance_single_document.dart';
import 'package:app/presentation/documents/bloc/documents_bloc/documents_bloc.dart';
import 'package:app/presentation/documents/bloc/folders_bloc/folders_bloc.dart';
import 'package:app/presentation/documents/widgets/add_document_bottom_sheet.dart';
import 'package:app/presentation/documents/widgets/single_folder.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/bottom_sheet.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/payment_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:shimmer/shimmer.dart';

class SubmitClearanceDocumentsScreen extends StatefulWidget {
  final SchoolClearanceModel schoolClearance;

  const SubmitClearanceDocumentsScreen(
      {super.key, required this.schoolClearance});

  @override
  State<SubmitClearanceDocumentsScreen> createState() =>
      _SubmitClearanceDocumentsScreenState();
}

class _SubmitClearanceDocumentsScreenState
    extends State<SubmitClearanceDocumentsScreen> {
  List<FolderModel> folders = [];
  List<DocumentModel> documents = [];

  @override
  void initState() {
    getIt.get<FoldersBloc>().add(GetFoldersRequested());
    super.initState();
  }

  void _selectFolder(FolderModel folder) {
    getIt.get<SubmitClearanceCubit>().openFolder(folder);
  }

  void _handleSuccess() {
    GoRouter.of(context).pop();
    GoRouter.of(context).goNamed(ClearanceRoutes.index);
    getIt.get<ClearanceStatusBloc>().add(GetClearanceStatusRequested());
  }

  void initPayment(String authUrl) async {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PaymentView(
          onSuccess: () {
            NetworkToast.handleSuccess("Payment successful");
            // remove dialog
            _handleSuccess();
          },
          authUrl: authUrl,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog.fullscreen(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      child: BlocBuilder<SubmitClearanceCubit, SubmitClearanceCubitState>(
          bloc: getIt.get<SubmitClearanceCubit>(),
          builder: (context, submissionState) {
            return Scaffold(
              floatingActionButton: submissionState.folderInView != null
                  ? _buildAddDocumentFloatingActionButton(
                      submissionState.folderInView!.id)
                  : null,
              appBar: AppBar(
                leading: submissionState.folderInView == null
                    ? null
                    : IconButton(
                        icon: Icon(Icons.arrow_back),
                        onPressed: getIt.get<SubmitClearanceCubit>().exitFolder,
                      ),
                automaticallyImplyLeading: false,
                title: Text("Select Documents"),
                actions: [
                  IconButton(
                    onPressed: context.pop,
                    icon: Icon(Icons.close),
                  ),
                ],
              ),
              body: Padding(
                padding: AppStyles.defaultPagePadding.copyWith(bottom: 0),
                child: BlocConsumer<FoldersBloc, FoldersState>(
                    bloc: getIt.get<FoldersBloc>(),
                    listener: (context, state) {
                      if (state is GetFoldersSuccess) {
                        setState(() {
                          folders = state.folders;
                        });
                      }
                    },
                    builder: (context, state) {
                      return BlocConsumer<DocumentsBloc, DocumentsState>(
                          bloc: getIt.get<DocumentsBloc>(),
                          listener: (context, docState) {
                            if (docState is GetDocumentsSuccess) {
                              setState(() {
                                documents = docState.documents;
                              });
                            }
                          },
                          builder: (context, docState) {
                            return Visibility(
                              visible: (docState is! GetDocumentsLoading &&
                                  state is! GetFoldersLoading),
                              replacement: _buildShimmer(),
                              child: Visibility(
                                visible: submissionState.folderInView == null,
                                replacement: Visibility(
                                  child: _buildDocuments(),
                                  replacement: _buildNoDocument(),
                                  visible: documents.isNotEmpty,
                                ),
                                child: Visibility(
                                  child: _buildFolders(),
                                  replacement: _buildNoFolder(),
                                  visible: folders.isNotEmpty,
                                ),
                              ),
                            );
                          });
                    }),
              ),
              bottomNavigationBar: BlocConsumer<ClearanceBloc, ClearanceState>(
                bloc: getIt.get<ClearanceBloc>(),
                listener: (context, state) {
                  if (state is RequestSubClearanceSuccess) {
                    if (state.goToPayment) {
                      initPayment(state.authUrl!);
                    } else {
                      NetworkToast.handleSuccess(
                          "Clearance requested successfully");
                      _handleSuccess();
                    }
                  }
                },
                builder: (context, clearanceState) {
                  return SizedBox(
                    width: double.maxFinite,
                    child: SafeArea(
                      child: Padding(
                        padding: EdgeInsets.symmetric(
                            horizontal: AppStyles.defaultPagePadding.left),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "${submissionState.documents.length} document(s)",
                            ),
                            ContainedButton(
                              width: 200,
                              height: 20,
                              icon: Icon(Icons.arrow_forward),
                              loading:
                                  clearanceState is RequestSubClearanceLoading,
                              onPressed: () => getIt
                                  .get<ClearanceBloc>()
                                  .add(RequestSubClearanceRequested()),
                              child: Text("Continue"),
                            )
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            );
          }),
    );
  }

  _buildShimmer() {
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
      itemCount: 5,
    );
  }

  _buildFolders() {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
        childAspectRatio: .9,
      ),
      itemBuilder: (context, index) => SingleFolder(
        folder: folders[index],
        onClick: () => _selectFolder(folders[index]),
        showOptions: false,
      ),
      itemCount: folders.length,
    );
  }

  _buildNoFolder() {
    return Center(
      child: Text(
        "No folder",
        style: getTextTheme(context).bodyLarge,
      ),
    );
  }

  _buildNoDocument() {
    return Center(
      child: Text(
        "No document",
        style: getTextTheme(context).bodyLarge,
      ),
    );
  }

  _buildDocuments() {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
        childAspectRatio: .9,
      ),
      itemBuilder: (context, index) =>
          SubmitClearanceSingleDocument(document: documents[index]),
      itemCount: documents.length,
    );
  }

  _buildAddDocumentFloatingActionButton(String folderId) {
    return FloatingActionButton(
      heroTag: "Folder Details Floating Action Button",
      onPressed: () {
        AppBottomSheet.display(
          context,
          bottomSheetContents: [
            AddDocumentBottomSheet(
              folderId: folderId,
            ),
          ],
          initialChildSize: .5,
        );
      },
      child: Icon(Icons.add),
    );
  }
}
