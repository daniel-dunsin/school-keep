'use client';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { TabsDto } from '@/lib/schemas/interfaces';
import { cn } from '@/lib/utils';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  tabs: TabsDto[];
}

const Tabs: FC<Props> = ({ tabs }) => {
  const [tab, setTab] = useState<number>(0);
  const { searchParams, setParam } = useSearchParams();

  useEffect(() => {
    if (searchParams.get('tab')) {
      const header = searchParams.get('tab');

      const tab = tabs.findIndex((t) => t.header === header);
      if (tab != -1) {
        setTab(tab);
      }
    }
  }, []);

  useEffect(() => {
    setParam('tab', tabs[tab].header);
  }, [tab]);

  return (
    <div className="mt-6 space-y-4">
      <header className="flex items-center overflow-x-scroll border-b-[1.5px]">
        {tabs?.map((tabInfo, index) => {
          return (
            <p
              className={cn(
                'p-5 text-[.85rem] cursor-pointer hover:bg-mainExtraLight',
                index === tab && 'border-b-2 border-mainLight'
              )}
              key={index}
              onClick={() => setTab(index)}
            >
              {tabInfo?.header}
            </p>
          );
        })}
      </header>

      <div>{tabs[tab].widget}</div>
    </div>
  );
};

export default Tabs;
