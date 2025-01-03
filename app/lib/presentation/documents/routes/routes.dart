const String prefix = "/document";

abstract class DocumentRoutes {
  static const index = prefix;
  static const folderDetail = "$prefix/folder-details";
  static const documentDetail = "$prefix/document-details";
  static const documentVersions = "$prefix/document-versions";
}
