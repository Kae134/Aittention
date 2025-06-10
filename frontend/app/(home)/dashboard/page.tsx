"use client";

import { unauthorized } from "next/navigation";
import { useEffect } from "react";


export default function page() {

    const token = localStorage.getItem('access_token');
    useEffect(() => {
        console.log('access_token:', token);
    }, [token]);

  if (!token) {
    return unauthorized()
  }

  return (
    <div>
        
    </div>
  )
}
