import React from 'react';
import aryaSamajLogo from '@/assets/logo.png';

const AryaSamajLogoSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-zinc-800 pt-28 pb-12 px-4 flex justify-center items-center">
      <img
        src={aryaSamajLogo}
        alt="Arya Samaj Logo"
        className="w-auto h-auto"
      />
    </section>
  );
};

export default AryaSamajLogoSection;
