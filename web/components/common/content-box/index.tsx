import React, { FC, ReactNode } from 'react';

interface Props {
  bgColor?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
}

const ContentBox: FC<Props> = ({ bgColor, icon, title, subtitle }) => {
  return (
    <section
      className="border-l-[5px] flex gap-4 bg-white rounded-md p-4 min-w-[200px] justify-between max-w-[200px] items-center"
      style={{ borderLeftColor: bgColor }}
    >
      <div>
        <h1 className="text-[.9rem]">{title?.toUpperCase()}</h1>
        <p className="text-[1.4rem] font-bold">{subtitle}</p>
      </div>
      <span
        className="size-10 rounded-md text-white grid place-items-center text-lg text-[1.5rem] font-bold"
        style={{ background: bgColor }}
      >
        {icon}
      </span>
    </section>
  );
};

export default ContentBox;
