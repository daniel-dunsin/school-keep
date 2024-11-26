'use client';
import Button from '@/components/common/button';
import SearchField from '@/components/common/input/search';
import SelectAnnouncementDestionation from '@/components/common/select-fields/select-announcement-destination';
import SelectAnnouncementStatus from '@/components/common/select-fields/select-announcement-status';
import { useApiQuery } from '@/lib/hooks/use-query';
import { AnnouncementDestination } from '@/lib/schemas/enums';
import { GetAnnouncementsQuery } from '@/lib/schemas/interfaces';
import announcementService from '@/lib/services/announcement.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import AnnouncementsTable from '../tables/announcements';

const AnnouncmentsManagement = () => {
  const router = useRouter();
  const { changeQuery, query } = useApiQuery<GetAnnouncementsQuery>({});

  const { data: announcements, isLoading: announcementsLoading } = useQuery({
    queryKey: [
      'useGetAnnouncements',
      query.destination_type,
      query.search,
      query.status,
    ],
    queryFn: () => announcementService.getAnnouncements(query),
  });

  return (
    <section>
      <div className="my-8 flex gap-3">
        <SearchField
          onSearch={(search) => {
            changeQuery('search', search);
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
        <div className="max-w-[250px]">
          <SelectAnnouncementDestionation
            placeholder="Destination"
            selected={query.destination_type}
            onSelect={(destination_type) =>
              changeQuery('destination_type', destination_type)
            }
          />
        </div>

        <div className="max-w-[250px]">
          <SelectAnnouncementStatus
            selected={query.status}
            placeholder="Status"
            onSelect={(status) => changeQuery('status', status)}
          />
        </div>
      </div>

      <div className="mt-6">
        <AnnouncementsTable
          announcements={announcements ?? []}
          loading={announcementsLoading}
        />
      </div>
    </section>
  );
};

export default AnnouncmentsManagement;
