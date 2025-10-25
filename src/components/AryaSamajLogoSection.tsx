import React from 'react';
import aryaSamajLogo from '@/assets/logo.png';

const AryaSamajLogoSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-zinc-800 pt-28 pb-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-around max-w-4xl mx-auto">
          {/* Logo */}
          <img
            src={aryaSamajLogo}
            alt="Arya Samaj Logo"
            className="h-16 w-16 sm:h-24 sm:w-24"
          />

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-400 text-center px-4"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            <span className="font-devanagari">आर्य समाज</span> ARYA SAMAJ
          </h1>

          {/* Founder Image */}
          <img
            src="https://placehold.co/112x150/ff9933/ffffff?text=M.+Dayanand"
            alt="Maharshi Dayanand Saraswati"
            className="h-24 w-auto object-cover hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
};

export default AryaSamajLogoSection;
