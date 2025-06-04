'use client';
import CircleLoader from '@/components/common/loader';
import StudentDetailsHeader from '@/components/ui/students/student-details/header';
import clearanceService from '@/lib/services/clearance.service';
import studentService from '@/lib/services/student.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import ClearanceStatusChip from './status-chip';
import documentService from '@/lib/services/documents.service';
import { DocumentsTable } from '@/components/ui/tables/documents';
import { studentDocumentsColumns } from '@/components/ui/tables/documents/columns';
import { RequestClearanceStatus } from '@/lib/schemas/enums';
import ActionButtons from './actions';
import SingleStudentClearanceOverview from './overview';

const SingleStudentClearance = () => {
  const { studentId } = useParams();

  const { data: student, isLoading: studentLoading } = useQuery({
    queryKey: ['students', studentId],
    queryFn: () => studentService.getStudent(studentId as string),
  });

  const { data: clearanceStatus, isLoading: clearanceLoading } = useQuery({
    queryKey: ['clearance', 'students', studentId],
    queryFn: () =>
      clearanceService.requestStudentClearanceStatus(studentId as string),
    enabled: !!student,
  });

  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ['documents', studentId],
    queryFn: () => documentService.getStudentDocuments(studentId as string),
  });

  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['clearance', studentId, 'overview'],
    queryFn: () =>
      clearanceService.getStudentClearanceOverview(studentId as string),
    enabled: clearanceStatus?.status === RequestClearanceStatus.IN_PROGRESS,
  });

  if (clearanceLoading || studentLoading || documentsLoading || overviewLoading)
    return <CircleLoader loadingText="Fetching details" />;

  return (
    <section className="space-y-8 pb-12">
      <StudentDetailsHeader
        student={student!}
        hideStatusUpdate={true}
        statusUpdateAlternative={
          <ClearanceStatusChip status={clearanceStatus?.status!} />
        }
      />

      {clearanceStatus?.status === RequestClearanceStatus.IN_PROGRESS && (
        <SingleStudentClearanceOverview {...overview!} />
      )}

      <DocumentsTable
        data={documents ?? []}
        loading={documentsLoading}
        columns={studentDocumentsColumns}
        header="Submitted documents"
      />

      <ActionButtons
        showAccept={
          clearanceStatus?.status != RequestClearanceStatus.IN_PROGRESS
        }
        showReject={
          clearanceStatus?.status != RequestClearanceStatus.IN_PROGRESS &&
          clearanceStatus?.status != RequestClearanceStatus.REJECTED
        }
      />
    </section>
  );
};

export default SingleStudentClearance;
