import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  loadingText?: string;
  destructive?: boolean;
}

const CircleLoader = ({ loadingText, ...props }: Props) => {
  return (
    <div {...props} className={`flex items-center gap-2  ${props.className}`}>
      <BiLoaderAlt size={20} className="animate-spin text-mainLight" />
      {loadingText && <p className="text-[.8rem]">{loadingText}</p>}
    </div>
  );
};

export default CircleLoader;
