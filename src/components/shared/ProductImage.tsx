"use client"

import Image from "next/image"
import { useState } from "react"
import { Package } from "lucide-react"

interface ProductImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  fill?: boolean;
}

export function ProductImage({ src, alt, category, className = "", fill = true }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-muted text-muted-foreground ${fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full'} ${className}`}>
        <Package className="h-8 w-8 mb-2 opacity-50" />
        <span className="text-xs font-medium text-center px-2">{category || alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
