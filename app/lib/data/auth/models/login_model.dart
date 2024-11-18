// ignore_for_file: public_member_api_docs, sort_constructors_first
class LoginModel {
  String email;
  String password;
  bool rememberMe;

  LoginModel({
    required this.email,
    required this.password,
    required this.rememberMe,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'email': email,
      'password': password,
      'remember_me': rememberMe,
      "is_mobile": true,
    };
  }
}
