import Button from '@/components/common/button';
import { Department } from '@/lib/schemas/types';
import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  department: Department;
}

const DepartmentDetailsHeader: FC<Props> = ({ department }) => {
  return (
    <header className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-x-3">
        <Image
          src={department?.logo!}
          alt={department?.name!}
          width={1000}
          height={1000}
          className="w-[150px] h-[150px] object-cover object-center rounded-full border-2"
        />

        <div>
          <h1 className="font-semibold text-[1.3rem]">{department?.name}</h1>
          <p>{department?.unionName}</p>
          <p className="flex items-center gap-2 text-[.8rem]">
            College -{' '}
            <span className="inline-flex gap-2  items-center">
              <Image
                src={department?.college?.logo!}
                alt={department?.college?.name!}
                width={300}
                height={300}
                className="w-[30px] h-[30px] object-cover object-center rounded-full border-2"
              />

              {department?.college.unionName}
            </span>
          </p>
        </div>
      </div>

      <div>
        <Button variant="outline" size="large" onClick={() => {}}>
          Edit Department
        </Button>
      </div>
    </header>
  );
};

export default DepartmentDetailsHeader;
