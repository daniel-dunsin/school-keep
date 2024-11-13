'use client';
import React from 'react';
import HomeNavigator from './navigator';

const Banner = () => {
  return (
    <section className="h-[85vh] max-w-[1200px] mx-auto px-4 flex items-start">
      <div className="mt-[100px] flex-1">
        <h1 className="md:text-[3.2rem] text-[1.2rem] max-w-[650px] font-bold">
          <span className="text-mainLight">Secure</span> and
          <span className="text-mainLight"> Paperless</span> Document Management
        </h1>

        <p className="mt-3 text-[.95rem] max-w-[650px]">
          A modern platform for students and school administrators to securely
          manage, approve, and verify academic documents with ease.
        </p>
      </div>

      <HomeNavigator />
    </section>
  );
};

export default Banner;
