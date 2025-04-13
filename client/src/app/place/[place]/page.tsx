// app/place/[place]/page.tsx
'use client';

import BenitoGrid from '../detail';
import { useParams } from 'next/navigation';

export default function PlacePage() {
  const params = useParams();
  const place = decodeURIComponent(params.place as string); // ✅ cast here

  return (
    <div className="p-6">
      <BenitoGrid place={place} />
    </div>
  );
}
