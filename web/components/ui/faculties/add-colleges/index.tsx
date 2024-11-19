import React from 'react';
import CollegeChips from './chips';
import CurrentCollege from './current-college';

const AddColleges = () => {
  return (
    <section>
      <h1 className="font-semibold">Add Colleges</h1>

      <div className="mt-6">
        <CollegeChips />
        <CurrentCollege />
      </div>
    </section>
  );
};

export default AddColleges;
