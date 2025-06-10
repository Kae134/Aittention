"use client";

// import { unauthorized } from "next/navigation";
// import { useEffect } from "react";


// export default function Page() {

//     const token = localStorage.getItem('access_token');
//     useEffect(() => {
//         console.log('access_token:', token);
//     }, [token]);

//   if (!token) {
//     return unauthorized()
//   }

//   return (
//     <div>
        
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import { unauthorized } from 'next/navigation';
import { useGetUserImages } from '@/hooks/use-get-images';
import { useGetHelloWorld } from '@/hooks/use-get-hello-world';

export default function page() {

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUserId = localStorage.getItem("user_id");

    if (!storedToken) {
      unauthorized();
      return;
    }

    setToken(storedToken);
    setUserId(storedUserId);
  }, []);
  
  const { data, isLoading, error } = useGetUserImages(userId ?? "");

  if (!token || !userId) {
    return <div>Authentification requise</div>;
  }

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  if (!data || data.length === 0) return <div>Aucune image trouvée</div>;
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((img) => (
        <img key={img.id} src={img.url} alt={`Image ${img.id}`} />
      ))}
    </div>
  );
};

