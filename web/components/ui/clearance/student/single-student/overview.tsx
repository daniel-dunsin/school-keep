import ContentBox from '@/components/common/content-box';
import React, { FC } from 'react';
import { BiCheck, BiQuestionMark } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

interface Props {
  requested: number;
  rejected: number;
  approved: number;
}

const SingleStudentClearanceOverview: FC<Props> = ({
  requested,
  rejected,
  approved,
}) => {
  return (
    <div className="flex items-center gap-4">
      <ContentBox
        bgColor="#8a05ff"
        icon={<BiQuestionMark />}
        title="Requested"
        subtitle={requested?.toLocaleString()}
      />

      <ContentBox
        bgColor="#006d4c"
        icon={<BiCheck />}
        title="Approved"
        subtitle={approved?.toLocaleString()}
      />

      <ContentBox
        bgColor="oklch(57.7% 0.245 27.325)"
        icon={<MdClose />}
        title="Rejected"
        subtitle={rejected?.toLocaleString()}
      />
    </div>
  );
};

export default SingleStudentClearanceOverview;
