// src/components/GlobalPresence.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import { useTemples } from "@/hooks/useTemples";
import { Skeleton } from "@/components/ui/skeleton";

export const GlobalPresence = () => {
  const { data: temples, isLoading } = useTemples();

  const globeConfig = {
    pointSize: 4,
    globeColor: "#1d4ed8",
    showAtmosphere: true,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.1,
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 28.6139, lng: 77.209 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const sampleArcs = temples?.map((temple, index) => ({
    order: index,
    startLat: temple.latitude,
    startLng: temple.longitude,
    endLat: 28.6139, // Delhi, for example
    endLng: 77.209,
    arcAlt: Math.random() * 0.5 + 0.1,
    color: ["#06b6d4", "#3b82f6", "#6366f1"][index % 3],
  }));

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center py-20 h-screen md:h-[40rem] bg-background relative w-full">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-[40rem] dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            Our Global Presence
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            Explore our temples and centers around the world.
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <Globe data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
};

export default GlobalPresence;
