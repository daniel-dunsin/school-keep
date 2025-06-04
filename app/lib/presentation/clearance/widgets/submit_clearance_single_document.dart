import 'package:app/configs/app_config.dart';
import 'package:app/data/documents/models/document_model.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit.dart';
import 'package:app/presentation/clearance/bloc/submit_clearance_documents_cubit/submit_clearance_cubit_state.dart';
import 'package:app/presentation/documents/widgets/single_document.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SubmitClearanceSingleDocument extends StatefulWidget {
  final DocumentModel document;

  const SubmitClearanceSingleDocument({
    super.key,
    required this.document,
  });

  @override
  State<SubmitClearanceSingleDocument> createState() =>
      _SubmitClearanceSingleDocumentState();
}

class _SubmitClearanceSingleDocumentState
    extends State<SubmitClearanceSingleDocument> {
  late bool isSelected;

  @override
  void initState() {
    super.initState();

    isSelected =
        getIt.get<SubmitClearanceCubit>().isDocumentSelected(widget.document);
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SingleDocument(document: widget.document),
        BlocConsumer<SubmitClearanceCubit, SubmitClearanceCubitState>(
            bloc: getIt.get<SubmitClearanceCubit>(),
            listener: (context, state) {
              setState(() {
                isSelected = getIt
                    .get<SubmitClearanceCubit>()
                    .isDocumentSelected(widget.document);
              });
            },
            builder: (context, state) {
              return Positioned(
                top: 0,
                left: 0,
                child: Radio(
                  value: isSelected,
                  groupValue: true,
                  toggleable: true,
                  fillColor: WidgetStatePropertyAll(AppColors.mainLight),
                  onChanged: (selected) {
                    if (!isSelected) {
                      getIt
                          .get<SubmitClearanceCubit>()
                          .addDocument(widget.document);
                    } else {
                      getIt
                          .get<SubmitClearanceCubit>()
                          .removeDocument(widget.document);
                    }
                  },
                ),
              );
            }),
      ],
    );
  }
}
