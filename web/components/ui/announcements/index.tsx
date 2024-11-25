'use client';
import Button from '@/components/common/button';
import SearchField from '@/components/common/input/search';
import { useApiQuery } from '@/lib/hooks/use-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const AnnouncmentsManagement = () => {
  const router = useRouter();
  const { changeQuery, query } = useApiQuery<{}>({});

  return (
    <section>
      <div className="my-8 flex gap-3">
        <SearchField
          onSearch={(search) => {
            // changeQuery('search', search);
          }}
          InputProps={{ placeholder: 'Search Announcements' }}
        />

        <Button
          size="small"
          variant="filled"
          className="w-[150px] flex items-center justify-center"
          onClick={() => router.push('/dashboard/announcements/new')}
        >
          Add Announcment
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="max-w-[250px]"></div>
      </div>

      <div className="mt-6"></div>
    </section>
  );
};

export default AnnouncmentsManagement;
