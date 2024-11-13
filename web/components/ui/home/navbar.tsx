import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="px-4 py-6 max-w-[1200px] mx-auto">
      <div className="">
        <Image src="/logo/logo-black.png" alt="logo" width={150} height={70} />
      </div>
    </nav>
  );
};

export default Navbar;
