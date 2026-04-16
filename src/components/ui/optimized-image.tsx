
import React, { useState } from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  fallbackContent?: React.ReactNode;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  skeletonClassName, 
  fallbackContent,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
        {fallbackContent || <span className="text-sm">Image unavailable</span>}
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton 
          className={cn("absolute inset-0 z-10", skeletonClassName || className)} 
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export { OptimizedImage };
