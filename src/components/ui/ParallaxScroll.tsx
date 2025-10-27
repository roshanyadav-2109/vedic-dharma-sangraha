"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <>
      <style>{`
        @keyframes scroll {
          to {
            transform: translateY(-50%);
          }
        }
        .scrolling-wrapper {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      <div
        className={cn("h-[40rem] w-full items-start overflow-hidden", className)}
        ref={gridRef}
      >
        <div
          className="grid grid-cols-1 items-start max-w-5xl mx-auto gap-10 md:grid-cols-2 lg:grid-cols-3 px-10"
        >
          <div className="grid gap-10">
            <div className="scrolling-wrapper">
              {firstPart.map((el, idx) => (
                <div key={"grid-1" + idx} className="mb-10">
                  <img
                    src={el}
                    className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </div>
              ))}
              {firstPart.map((el, idx) => (
                <div key={"grid-1-duplicate-" + idx} className="mb-10">
                  <img
                    src={el}
                    className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-10">
             <div className="scrolling-wrapper">
              {secondPart.map((el, idx) => (
                <div key={"grid-2" + idx} className="mb-10">
                  <img
                    src={el}
                    className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </div>
              ))}
               {secondPart.map((el, idx) => (
                <div key={"grid-2-duplicate-" + idx} className="mb-10">
                  <img
                    src={el}
                    className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-10">
            <div className="scrolling-wrapper">
              {thirdPart.map((el, idx) => (
                <div key={"grid-3" + idx} className="mb-10">
                  <img
                    src={el}
                    className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </div>
              ))}
              {thirdPart.map((el, idx) => (
                <div key={"grid-3-duplicate-" + idx} className="mb-10">
                  <img
                    src={el}
                    className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
