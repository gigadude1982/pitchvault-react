'use client';

import { useParams } from 'next/navigation';
import CreatorProfileView from '../../../src/views/CreatorProfileView';

export default function CreatorProfilePage() {
  const params = useParams();
  return <CreatorProfileView id={params.id} />;
}
