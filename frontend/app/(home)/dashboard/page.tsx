"use client";

import { unauthorized } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageItem from './image-item';
import env from '@/lib/env';

type Image = {
  _id: string;
  user_id: string;
  filename: string;
};

export default function Page() {
  const [images, setImages] = useState<Image[]>([]);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  useEffect(() => {
    if (!userId) return;
    const accessToken = localStorage.getItem('access_token');
    fetch(`${env.NEXT_PUBLIC_APP_BACKEND_URL}/api/v1/images/users/${userId}/images`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(console.error);
  }, [userId]);

  if (!userId) {
    return unauthorized();
  }

  return (
    <div>
      <h2>JSON pour l&apos;utilisateur {userId}</h2>
      <pre>{JSON.stringify(images, null, 2)}</pre>

      {images.map(image => (
        <ImageItem key={image._id} id={image._id} />
      ))}
    </div>
  );
}
