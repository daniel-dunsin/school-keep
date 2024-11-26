import TableComponent from '@/components/common/table';
import { Announcement } from '@/lib/schemas/types';
import React, { FC } from 'react';
import { columns } from './columns';

interface Props {
  announcements: Announcement[];
  loading: boolean;
}

const AnnouncementsTable: FC<Props> = ({ announcements, loading }) => {
  return (
    <TableComponent
      data={announcements}
      loading={loading}
      columns={columns}
      showSearch={false}
      heading={{
        title: 'Announcements',
      }}
    />
  );
};

export default AnnouncementsTable;
