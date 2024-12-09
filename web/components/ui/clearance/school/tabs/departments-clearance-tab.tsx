import SearchField from '@/components/common/input/search';
import {
  ClearanceTable,
  DepartmentClearanceTable,
} from '@/components/ui/tables/clearance';
import { useApiQuery } from '@/lib/hooks/use-query';
import { GetClearanceQuery } from '@/lib/schemas/interfaces';
import clearanceService from '@/lib/services/clearance.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const DepartmentsClearanceTab = () => {
  const { query, changeQuery } = useApiQuery<GetClearanceQuery>({
    defaultValues: {
      search: '',
    },
  });

  const { isPending: gettingClearance, data } = useQuery({
    queryKey: ['useGetDepartmentsClearance', query.search],
    queryFn: () => clearanceService.getDepartmentsClearance(query.search),
  });

  return (
    <div className="space-y-6">
      <SearchField
        onSearch={(search) => {
          changeQuery('search', search);
        }}
        InputProps={{ placeholder: 'Search Departments' }}
      />

      <DepartmentClearanceTable data={data} loading={gettingClearance} />
    </div>
  );
};

export default DepartmentsClearanceTab;
