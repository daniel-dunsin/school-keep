import SearchField from '@/components/common/input/search';
import { ClearanceTable } from '@/components/ui/tables/clearance';
import { useApiQuery } from '@/lib/hooks/use-query';
import { GetClearanceQuery } from '@/lib/schemas/interfaces';
import clearanceService from '@/lib/services/clearance.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ClearanceTab = () => {
  const { query, changeQuery } = useApiQuery<GetClearanceQuery>({
    defaultValues: {
      search: '',
    },
  });

  const { isPending: gettingClearance, data: clearance } = useQuery({
    queryKey: ['useGetClearance', query.search],
    queryFn: () => clearanceService.getSchoolClearance(query.search),
  });

  return (
    <div className="space-y-6">
      <SearchField
        onSearch={(search) => {
          changeQuery('search', search);
        }}
        InputProps={{ placeholder: 'Search Clearance' }}
        searchParam="schoolClearanceSearch"
      />

      <ClearanceTable data={clearance} loading={gettingClearance} />
    </div>
  );
};

export default ClearanceTab;
