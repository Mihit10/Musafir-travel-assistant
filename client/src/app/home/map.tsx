"use client";
import { useEffect, useRef } from 'react';

type MapPlaceholderProps = {
  selectedDay: number;
};

const MapPlaceholder = ({ selectedDay }: MapPlaceholderProps) => {
  const mapRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (mapRef.current) {
      const ctx = mapRef.current.getContext('2d');
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, mapRef.current.width, mapRef.current.height);
      
      // Set background
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, 0, mapRef.current.width, mapRef.current.height);
      
      // Draw grid lines
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;

      for (let i = 0; i <= mapRef.current.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(mapRef.current.width, i);
        ctx.stroke();
      }

      for (let i = 0; i <= mapRef.current.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, mapRef.current.height);
        ctx.stroke();
      }

      // Add placeholder text
      ctx.fillStyle = '#4A6FA5';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Map for Day ${selectedDay}`, mapRef.current.width / 2, mapRef.current.height / 2);
      ctx.font = '12px Arial';
      ctx.fillText('(Actual map will be rendered here)', mapRef.current.width / 2, mapRef.current.height / 2 + 24);
    }
  }, [selectedDay]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 text-tertiary">Location Map</h2>
      {/* <div className="w-full h-64 md:h-full rounded-lg overflow-hidden border-2 border-gray-200">
        <canvas 
          ref={mapRef} 
          className="w-full h-full"
          width={300}
          height={200}
        />
      </div> */}
    </div>
  );
};

export default MapPlaceholder;
