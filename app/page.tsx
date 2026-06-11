"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    location.replace('/login');
  }, [])

  return (<div className="text-2xl font-bold">Chargement...</div>);
}
