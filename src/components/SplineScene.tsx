import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';
import { Loader2 } from 'lucide-react';

interface SplineSceneProps {
  scene: string;
  onLoad?: () => void;
  className?: string;
}

export default function SplineScene({ scene, onLoad, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const spline = new Application(canvasRef.current);
    
    spline.load(scene).then(() => {
      setIsLoading(false);
      if (onLoad) onLoad();
    }).catch(err => {
      console.error('Failed to load Spline scene:', err);
    });

    return () => {
      // Cleanup if necessary. Spline Application doesn't have a direct dispose() sometimes, 
      // but we can at least stop the loop if it exposes it.
    };
  }, [scene, onLoad]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-neutral-900">
          <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
          <p className="text-white/40 text-xs font-geist uppercase tracking-widest">Carregando Modelo 3D...</p>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
