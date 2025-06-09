"use client";

import { useEffect } from "react";


export default function page() {

    const token = localStorage.getItem('access_token');
    useEffect(() => {
        console.log('access_token:', token);
    }, [token]);

  return (
    <div>
        
    </div>
  )
}
