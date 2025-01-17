export enum AdminPermissions {
  SuperAdmin = 'super admin',
  Admin = 'admin',
}

export enum AnnouncementDestination {
  Colleges = 'Colleges',
  Departments = 'Departments',
  General = 'General',
}

export enum AnnouncementStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum StudentStatus {
  Active = 'active',
  Expelled = 'expelled',
  Suspended = 'suspended',
}

export enum DocType {
  image = 'image',
  video = 'video',
  pdf = 'pdf',
  xlsx = 'xlsx',
  pptx = 'pptx',
  csv = 'csv',
  apk = 'apk',
  json = 'json',
  doc = 'doc',
  txt = 'txt',
  unknown = 'unknown',
}

export enum View {
  grid = 'grid',
  table = 'table',
}
