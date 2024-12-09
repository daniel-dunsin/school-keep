'use client';
import Tabs from '@/components/common/tabs';
import React from 'react';
import ClearanceTab from './clearance-tab';
import DepartmentClearanceTab from './departments-clearance-tab';

const SchoolClearanceTabs = () => {
  return (
    <Tabs
      tabs={[
        {
          header: 'All Clearance',
          widget: <ClearanceTab />,
        },
        {
          header: 'Departments Clearance',
          widget: <DepartmentClearanceTab />,
        },
      ]}
    />
  );
};

export default SchoolClearanceTabs;
