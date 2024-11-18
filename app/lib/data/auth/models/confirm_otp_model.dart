// ignore_for_file: public_member_api_docs, sort_constructors_first
class ConfirmOtpModel {
  String email;
  String code;

  ConfirmOtpModel({
    required this.email,
    required this.code,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'email': email,
      'code': code,
    };
  }
}
