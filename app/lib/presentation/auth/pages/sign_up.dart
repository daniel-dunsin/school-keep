import 'package:app/presentation/auth/widgets/sign_up_step1.dart';
import 'package:app/presentation/auth/widgets/sign_up_step2.dart';
import 'package:app/presentation/auth/widgets/sign_up_step3.dart';
import 'package:app/shared/widgets/button.dart';
import 'package:flutter/material.dart';

const signUpPages = <Widget>[
  SignUpStep1(),
  SignUpStep2(),
  SignUpStep3(),
];

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  int currentPage = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: signUpPages[currentPage],
            ),
            _buildNavigators(context),
          ],
        ),
      ),
    );
  }

  _buildNavigators(BuildContext context) {
    final lastPage = currentPage == signUpPages.length - 1;

    return Padding(
      padding: EdgeInsets.fromLTRB(25, 0, 25, 30),
      child: Row(
        children: [
          Visibility(
            child: Expanded(
              child: GestureDetector(
                child: Text(
                  "skip",
                ),
              ),
              flex: 1,
            ),
            replacement: SizedBox(
              width: 86.5,
            ),
            visible: lastPage,
          ),
          Expanded(
            child: ContainedButton(
              width: double.maxFinite,
              height: 55,
              iconAlignment: IconAlignment.end,
              onPressed: () {
                if (currentPage != signUpPages.length - 1) {
                  setState(() {
                    currentPage += 1;
                  });
                } else {
                  // submit
                }
              },
              child: Visibility(
                visible: lastPage,
                replacement: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Icon(
                      Icons.arrow_forward_sharp,
                      size: 20,
                    )
                  ],
                ),
                child: Text("Register"),
              ),
            ),
            flex: 3,
          ),
        ],
      ),
    );
  }
}
