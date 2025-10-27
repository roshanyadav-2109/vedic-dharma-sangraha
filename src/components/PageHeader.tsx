import React from "react";
import heroImage from "@/assets/hero-temple.jpg";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <header
      className={cn(
        "relative flex h-[40vh] min-h-[20rem] items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gradient md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
