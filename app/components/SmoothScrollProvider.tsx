"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrasi ScrollTrigger plugin secara aman di client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // 1. Inisialisasi Lenis dengan konfigurasi ultra-smooth & responsive mobile
    const lenis = new Lenis({
      duration: 1.2, // Kecepatan scroll (detik) untuk rasa yang sangat premium dan natural
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing eksponensial out yang sangat mulus
      orientation: "vertical", // Menggunakan 'orientation' (bukan 'direction') sesuai tipe LenisOptions
      gestureOrientation: "vertical",
      syncTouch: true, // Mengaktifkan sinkronisasi touch event di HP/Touch Screen
      touchMultiplier: 1.8, // Menyeimbangkan sensitivitas sentuhan di HP agar scrolling terasa responsif namun tetap smooth
      infinite: false,
    });

    setLenisInstance(lenis);

    // 2. Integrasikan Lenis dengan GSAP ScrollTrigger agar sinkron secara real-time
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Masukkan loop RAF Lenis ke dalam ticker GSAP agar update frame berjalan selaras
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Menonaktifkan lag smoothing agar GSAP tidak "melompat" saat ada lag frame kecil
    gsap.ticker.lagSmoothing(0);

    // Clean up saat komponen unmount untuk menghindari memori bocor (memory leak)
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
