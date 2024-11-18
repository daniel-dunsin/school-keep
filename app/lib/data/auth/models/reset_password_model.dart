// ignore_for_file: public_member_api_docs, sort_constructors_first
class ResetPasswordModel {
  String tempToken;
  String password;

  ResetPasswordModel({
    required this.tempToken,
    required this.password,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'tempToken': tempToken,
      'password': password,
    };
  }
}
