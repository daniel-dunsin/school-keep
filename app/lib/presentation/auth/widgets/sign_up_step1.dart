import 'package:app/configs/app_config.dart';
import 'package:app/data/school/models/college_model.dart';
import 'package:app/data/school/models/department_model.dart';
import 'package:app/data/school/models/school_model.dart';
import 'package:app/presentation/auth/bloc/auth_bloc/auth_bloc.dart';
import 'package:app/presentation/auth/bloc/sign_up_steps_bloc/sign_up_steps_bloc.dart';
import 'package:app/presentation/auth/routes/routes.dart';
import 'package:app/presentation/auth/widgets/search_college_delegate.dart';
import 'package:app/presentation/auth/widgets/search_department_delegate.dart';
import 'package:app/presentation/auth/widgets/search_school_delegate.dart';
import 'package:app/shared/constants/constants.dart';
import 'package:app/shared/network/network_toast.dart';
import 'package:app/shared/utils/misc.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:app/shared/widgets/input_decorator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class SignUpStep1 extends StatefulWidget {
  const SignUpStep1({super.key});

  @override
  State<SignUpStep1> createState() => _SignUpStep1State();
}

class _SignUpStep1State extends State<SignUpStep1> {
  List<SchoolModel> schools = [];
  List<CollegeModel> colleges = [];
  List<DepartmentModel> departments = [];

  SchoolModel? school;
  CollegeModel? college;
  DepartmentModel? department;

  @override
  void initState() {
    loadInitialFields();

    super.initState();
  }

  void loadInitialFields() {
    final data = getIt.get<SignUpStepsBloc>().state.signUpModel;

    setState(() {
      school = data.school;
      college = data.college;
      department = data.department;
    });

    getIt.get<AuthBloc>().add(GetSchoolsRequested());

    if (data.school != null) {
      getIt.get<AuthBloc>().add(GetCollegesRequested(schoolId: data.school!.id));
    }

    if (data.college != null) {
      getIt.get<AuthBloc>().add(GetDepartmentsRequested(collegeId: data.college!.id!));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: AppStyles.defaultPagePadding.copyWith(
              top: 50,
              bottom: 0,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ..._title,
                SizedBox(height: 20),
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        _buildSchoolsSelector(context),
                        SizedBox(height: 30),
                        _buildCollegesSelector(context),
                        SizedBox(height: 30),
                        _buildDepartmentsSelector(context),
                        SizedBox(height: 30),
                        _buildAlt(),
                      ],
                    ),
                  ),
                ),
                _buildNavigators(context)
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> get _title => [
        Text(
          "Sign Up",
          style: getTextTheme(context).displayLarge,
        ),
        SizedBox(height: 7),
        Text(
          "Select your school information to continue 🏫",
          style: getTextTheme(context).bodySmall,
        ),
      ];

  _buildSchoolsSelector(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is GetSchoolsSuccess) {
          setState(() {
            schools = state.schools;
          });
        }
      },
      builder: (context, state) {
        return AppInputDecorator(
          label: "School",
          value: school?.name ?? "Select School",
          loading: state is GetSchoolsLoading,
          onTap: () {
            showSearch(
              context: context,
              delegate: SearchSchoolDelegate(
                schools: schools,
                onSelectSchool: (selectedSchool) {
                  setState(
                    () {
                      school = selectedSchool;
                    },
                  );
                  getIt.get<AuthBloc>().add(GetCollegesRequested(schoolId: selectedSchool.id));
                },
              ),
            );
          },
        );
      },
    );
  }

  _buildCollegesSelector(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is GetCollegesSuccess) {
          setState(() {
            colleges = state.colleges;
          });
        }
      },
      builder: (context, state) {
        return AppInputDecorator(
          label: "College/Faculty",
          value: college?.name != null
              ? college?.name
              : school == null
                  ? "No School Selected"
                  : "Select College",
          loading: state is GetCollegesLoading,
          disabled: school == null,
          onTap: () {
            showSearch(
              context: context,
              delegate: SearchCollegeDelegate(
                colleges: colleges,
                onSelectCollege: (selectedCollege) {
                  setState(
                    () {
                      college = selectedCollege;
                    },
                  );
                  getIt.get<AuthBloc>().add(GetDepartmentsRequested(collegeId: selectedCollege.id!));
                },
              ),
            );
          },
        );
      },
    );
  }

  _buildDepartmentsSelector(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      bloc: getIt.get<AuthBloc>(),
      listener: (context, state) {
        if (state is GetDepartmentsSuccess) {
          setState(() {
            departments = state.departments;
          });
        }
      },
      builder: (context, state) {
        return AppInputDecorator(
          label: "Department",
          value: department?.name != null
              ? department?.name
              : school == null
                  ? "No College Selected"
                  : "Select Department",
          loading: state is GetDepartmentsLoading,
          disabled: college == null,
          onTap: () {
            showSearch(
              context: context,
              delegate: SearchDepartmentDelegate(
                departments: departments,
                onSelectDepartment: (selectedDepartment) {
                  setState(
                    () {
                      department = selectedDepartment;
                    },
                  );
                },
              ),
            );
          },
        );
      },
    );
  }

  _buildAlt() {
    return GestureDetector(
      onTap: () {
        context.pushNamed(AuthRoutes.signIn);
      },
      child: Center(
        child: Text(
          "Sign In",
          style: getTextTheme(context).bodyLarge?.copyWith(
                color: getColorScheme(context).brightness == Brightness.light
                    ? getColorScheme(
                        context,
                      ).surface
                    : getColorScheme(
                        context,
                      ).onPrimary,
              ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  _buildNavigators(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 86.5,
        ),
        Expanded(
          child: ContainedButton(
            width: double.maxFinite,
            height: 55,
            iconAlignment: IconAlignment.end,
            onPressed: () {
              if (school == null) {
                return NetworkToast.handleError("School is required");
              } else if (college == null) {
                return NetworkToast.handleError("College/Faculty is required");
              } else if (department == null) {
                return NetworkToast.handleError("Department is required");
              }

              getIt.get<SignUpStepsBloc>().add(
                    SignUpStepsNextRequested(
                      getIt.get<SignUpStepsBloc>().state.signUpModel.copyWith(
                            department: department,
                            college: college,
                            school: school,
                          ),
                    ),
                  );
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Icon(
                  Icons.arrow_forward_sharp,
                  size: 20,
                )
              ],
            ),
          ),
          flex: 3,
        ),
      ],
    );
  }
}
