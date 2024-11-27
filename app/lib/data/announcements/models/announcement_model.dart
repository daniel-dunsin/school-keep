// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:app/data/announcements/enums/announcement_enums.dart';
import 'package:app/data/school/models/college_model.dart';
import 'package:app/data/school/models/department_model.dart';

class AnnouncementModel {
  final String title;
  final String? content;
  final String? image;
  final DateTime startDate;
  final DateTime endDate;
  final DepartmentModel? department;
  final CollegeModel? college;
  final AnnouncementDestination? destinationType;

  AnnouncementModel({
    required this.title,
    this.content,
    this.image,
    required this.startDate,
    required this.endDate,
    this.department,
    this.college,
    this.destinationType,
  });

  AnnouncementModel copyWith({String? title, String? content, String? image, DateTime? startDate, DateTime? endDate, DepartmentModel? department, CollegeModel? college, AnnouncementDestination? destinationType}) {
    return AnnouncementModel(
      title: title ?? this.title,
      content: content ?? this.content,
      image: image ?? this.image,
      startDate: startDate ?? this.startDate,
      endDate: endDate ?? this.endDate,
      department: department ?? this.department,
      college: college ?? this.college,
      destinationType: destinationType ?? this.destinationType,
    );
  }

  factory AnnouncementModel.fromMap(Map<String, dynamic> map) {
    return AnnouncementModel(
      title: map['title'] as String,
      content: map['content'] != null ? map['content'] as String : null,
      image: map['image'] != null ? map['image'] as String : null,
      startDate: DateTime.parse(map['start_date'] as String),
      endDate: DateTime.parse(map['end_date'] as String),
      department: map['departments'] != null && map["departments"].isNotEmpty ? DepartmentModel.fromMap(map['departments']?[0] as Map) : null,
      college: map['colleges'] != null && map["colleges"].isNotEmpty ? CollegeModel.fromMap(map['colleges']?[0] as Map) : null,
      destinationType: map["destination_type"] != null ? AnnouncementDestination.values.firstWhere((v) => v.name == map["destination_type"]) : null,
    );
  }

  factory AnnouncementModel.fromJson(String source) => AnnouncementModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'AnnouncementModel(title: $title, content: $content, image: $image, startDate: $startDate, endDate: $endDate, department: $department, college: $college)';
  }

  @override
  bool operator ==(covariant AnnouncementModel other) {
    if (identical(this, other)) return true;

    return other.title == title && other.content == content && other.image == image && other.startDate == startDate && other.endDate == endDate && other.department == department && other.college == college;
  }

  @override
  int get hashCode {
    return title.hashCode ^ content.hashCode ^ image.hashCode ^ startDate.hashCode ^ endDate.hashCode ^ department.hashCode ^ college.hashCode;
  }
}
