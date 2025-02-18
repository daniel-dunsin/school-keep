import ListTile from '@/components/common/list-tile';
import { Student } from '@/lib/schemas/types';
import { cn } from '@/lib/utils';
import { CircleUserIcon, SchoolIcon } from 'lucide-react';
import React, { FC, ReactNode } from 'react';

interface Props {
  student: Student;
}

const StudentProfileTab: FC<Props> = ({ student }) => {
  return (
    <section className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 col-span-2 shadow-md grid grid-cols-2 gap-4">
        <header className="col-span-2">
          <div className="flex items-center mb-2 space-x-2">
            <CircleUserIcon />
            <p className="text-[.9rem]">Profile Details</p>
          </div>
          <hr />
        </header>
        <ProfileQuestionAndAnswer
          question="Name"
          answer={
            <>
              {student.user?.firstName} {student.user?.lastName}
            </>
          }
        />

        <ProfileQuestionAndAnswer
          question="Email"
          answer={student.user?.email}
        />

        <ProfileQuestionAndAnswer
          question="Phone number"
          answer={student.user?.phoneNumber ?? '---'}
        />

        <ProfileQuestionAndAnswer
          question="Matric Number"
          answer={student.matricNumber}
        />
      </div>
      <div className="bg-white p-4 col-span-1 shadow-md space-y-3">
        <header>
          <div className="flex items-center mb-2 space-x-2">
            <SchoolIcon />
            <p className="text-[.9rem]">Class Details</p>
          </div>
          <hr />
        </header>
        <ProfileQuestionAndAnswer
          question="Department"
          answer={
            <ListTile
              leadingImage={student?.department?.logo!}
              title={student?.department?.name!}
            />
          }
        />

        <ProfileQuestionAndAnswer
          question="College"
          answer={
            <ListTile
              leadingImage={student?.department?.college?.logo!}
              title={student?.department?.college?.name!}
            />
          }
        />
      </div>
    </section>
  );
};

interface QAProps {
  question: string;
  answer: string | ReactNode;
  onAnswerClick?(): void;
}

export const ProfileQuestionAndAnswer: FC<QAProps> = ({
  question,
  answer,
  onAnswerClick,
}) => {
  return (
    <div>
      <h1 className="text-[.85rem] text-[#444] mb-1">{question}</h1>
      <p
        className={cn(
          'text-[.9rem]',
          onAnswerClick && 'underline cursor-pointer'
        )}
        onClick={onAnswerClick}
      >
        {answer}
      </p>
    </div>
  );
};

export default StudentProfileTab;
