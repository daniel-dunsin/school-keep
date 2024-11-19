'use client';
import { useCreateCollegeContext } from '@/lib/providers/contexts/create-college-context';
import { cn } from '@/lib/utils';
import { ArrowRightCircleIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { MdClose } from 'react-icons/md';

const CollegeChips = () => {
  const { colleges, collegeIndex, changeCollege, removeCollege } =
    useCreateCollegeContext();

  return (
    <div className="w-full flex gap-2 items-center max-w-[600px]">
      <h2 className="text-[.9rem]">Added Colleges: </h2>
      <div className="flex-1 overflow-x-scroll flex items-center space-x-2">
        {colleges.map((college, index) => {
          const isSelected = index == collegeIndex;

          const chipClassName = cn(
            'flex gap-2 text-[.8rem] px-3 py-1 border max-w-fit rounded-full cursor-pointer items-center',
            !isSelected && 'border-gray-300  bg-white',
            isSelected && 'bg-mainLight text-white border-mainDark'
          );

          return (
            <article
              key={index}
              className={chipClassName}
              onClick={() => changeCollege(index)}
            >
              {college.logo && (
                <Image
                  width={500}
                  height={500}
                  src={URL.createObjectURL(college.logo)}
                  alt={college.name}
                  className="w-[22px] h-[22px] object-cover rounded-full border border-mainLight"
                />
              )}
              {!college?.name ? 'Not Set' : <p>{college.unionName}</p>}
              {colleges?.length > 1 && index != colleges.length - 1 && (
                <span onClick={() => removeCollege(index)}>
                  <MdClose color={isSelected ? 'white' : 'black'} />
                </span>
              )}
            </article>
          );
        })}
      </div>

      {colleges.length > 1 && (
        <span title="submit">
          <ArrowRightCircleIcon className="text-mainLight" cursor={'pointer'} />
        </span>
      )}
    </div>
  );
};

export default CollegeChips;
