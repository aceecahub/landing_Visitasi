"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Users, ChevronDown, Building2 } from "lucide-react";

// Registrasi ScrollTrigger plugin secara aman di sisi client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollVideoProps {
  videoUrl?: string;
  scrollSpeed?: number;
}

export default function ScrollVideo({
  videoUrl = "/untitled.mp4",
  scrollSpeed = 350, // Durasi scroll sedikit ditambah untuk memberikan ketenangan (pacing) yang premium
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Memicu inisialisasi ketika metadata video selesai dimuat
  const handleLoadedMetadata = () => {
    setIsVideoLoaded(true);
  };

  // Mengatasi caching atau hot-reload jika metadata sudah terlanjur termuat sebelum event listener terpasang
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      setIsVideoLoaded(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!isVideoLoaded || !videoRef.current || !containerRef.current) return;

      const video = videoRef.current;

      // Force video to pause and start at 0
      video.pause();
      video.currentTime = 0;

      // Membuat timeline ScrollTrigger untuk mensinkronisasi scroll dengan frame video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollSpeed}%`,
          scrub: 1.2, // Menambahkan inersia scroll halus (1.2 detik peredaman) agar terasa sangat premium
          pin: true, // Mengunci kontainer video di layar
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Melakukan tweening pada properti currentTime video
      tl.to(video, {
        currentTime: video.duration || 0,
        ease: "none", // Harus ease: "none" agar linier konstan mengikuti scroll
      });

      return () => {
        if (video) video.pause();
      };
    },
    { dependencies: [isVideoLoaded, scrollSpeed], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] flex flex-col justify-center items-center"
    >
      {/* 🎬 1. Fullscreen Video Background */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover pointer-events-none opacity-60"
        />
        {/* Modern cinematic dark vignette overlay (Tailwind CSS v4 compliant) */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/90 pointer-events-none" />
        
        {/* Subtle grid pattern overlay untuk menyatu dengan desain halaman utama */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 47, 139, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 47, 139, 0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* 🌌 Ambient Decorative Lighting Orbs (Memudar saat mulai scroll) */}
      <div 
        className="absolute top-1/4 left-1/4 w-125 h-125 bg-[#8B2F8B]/5 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: scrollProgress < 0.25 ? 1 - scrollProgress * 4 : 0 }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-[#2E8B57]/5 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: scrollProgress < 0.25 ? 1 - scrollProgress * 4 : 0 }}
      />

      {/* 📝 2. Dynamic Content Overlay System */}
      <div className="relative z-10 w-full h-screen flex flex-col justify-between items-center p-6 sm:p-12 md:p-16 pointer-events-none">
        
        {/* Ruang kosong di atas untuk dynamic transparent navbar */}
        <div className="h-20 w-full" />

        {/* Kontainer Narasi Tengah yang Berubah Berdasarkan Progress Scroll */}
        <div className="w-full max-w-6xl text-center relative flex justify-center items-center flex-1 my-8">
          
          {/* 🌟 SCENE 1: Welcome & Landing / Hero Screen (Scroll Progress 0% to 15%) */}
          <div
            className="absolute transition-all duration-700 ease-out w-full px-4 flex flex-col items-center"
            style={{
              opacity: scrollProgress < 0.15 ? (0.15 - scrollProgress) * 6.6 : 0,
              transform: `translateY(${scrollProgress * -60}px) scale(${1 - scrollProgress * 0.08})`,
              pointerEvents: scrollProgress < 0.15 ? "auto" : "none",
            }}
          >
            {/* Laporan Visitasi Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B2F8B]/30 bg-[#8B2F8B]/10 text-[#B85FB8] text-xs sm:text-sm mb-6 backdrop-blur-md">
              <Building2 size={12} className="animate-pulse" />
              Laporan Visitasi Perusahaan Interaktif
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FAFAFA] leading-[1.15] tracking-tight max-w-4xl">
              Visitasi
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#B85FB8] via-[#8B2F8B] to-[#2E8B57] drop-shadow-sm">
                Access Media Lab
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/70 max-w-2xl mx-auto leading-relaxed">
              Analisis mendalam terhadap ekosistem teknologi, infrastruktur server, dan sistem kecerdasan buatan dalam operasional bisnisnya.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#profil"
                className="group px-8 py-3.5 bg-[#8B2F8B] text-[#FAFAFA] font-medium rounded-full hover:bg-[#B85FB8] transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-[#8B2F8B]/30 pointer-events-auto cursor-pointer"
              >
                Mulai Eksplorasi
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#tim"
                className="px-8 py-3.5 border border-[#FAFAFA]/20 text-[#FAFAFA]/80 hover:text-[#FAFAFA] font-medium rounded-full hover:bg-[#FAFAFA]/5 transition-all duration-300 flex items-center gap-2 pointer-events-auto cursor-pointer"
              >
                <Users size={14} />
                Anggota Kelompok
              </a>
            </div>

            {/* Stats Summary Grid di Bagian Bawah Hero */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 max-w-3xl w-full border-t border-[#FAFAFA]/10 pt-8">
              {[
                { value: "3", label: "Teknologi Utama" },
                { value: "2", label: "Tools Hosting" },
                { value: "1", label: "AI Tools" },
                { value: "4", label: "Anggota Tim" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#FAFAFA] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#FAFAFA]/40 mt-1 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 📂 SCENE 2: Profil & Latar Belakang (Scroll Progress 20% to 45%) */}
          <div
            className="absolute transition-all duration-500 ease-out w-full px-6 flex flex-col items-center"
            style={{
              opacity: scrollProgress >= 0.20 && scrollProgress < 0.45
                ? ((scrollProgress - 0.20) * 8 * (scrollProgress < 0.325 ? 1 : (0.45 - scrollProgress) * 8))
                : 0,
              transform: `scale(${1 + (scrollProgress - 0.20) * 0.06})`,
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B85FB8] px-4 py-2 rounded-full border border-[#8B2F8B]/30 bg-[#8B2F8B]/10 backdrop-blur-md mb-6">
              01. Profil Perusahaan
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAFAFA] tracking-tight leading-none max-w-3xl drop-shadow-lg">
              EKSPLORASI <span className="text-[#8B2F8B]">ACCESS MEDIA</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/65 max-w-2xl leading-relaxed font-medium">
              Melihat lebih dekat kegiatan bisnis utama, struktur IT, serta layanan digital terintegrasi yang dijalankan oleh Access Media Lab dalam industri.
            </p>
          </div>

          {/* 💻 SCENE 3: Stack Teknologi (Scroll Progress 50% to 75%) */}
          <div
            className="absolute transition-all duration-500 ease-out w-full px-6 flex flex-col items-center"
            style={{
              opacity: scrollProgress >= 0.50 && scrollProgress < 0.75
                ? ((scrollProgress - 0.50) * 8 * (scrollProgress < 0.625 ? 1 : (0.75 - scrollProgress) * 8))
                : 0,
              transform: `scale(${1 + (scrollProgress - 0.50) * 0.06})`,
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4CAF7A] px-4 py-2 rounded-full border border-[#2E8B57]/30 bg-[#2E8B57]/10 backdrop-blur-md mb-6">
              02. Stack Teknologi Utama
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAFAFA] tracking-tight leading-none max-w-3xl drop-shadow-lg">
              INTEGRASI <span className="text-[#2E8B57]">SISTEM KOKOH</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/65 max-w-2xl leading-relaxed font-medium">
              Penerapan sinergis antara framework modern Laravel, sistem database Microsoft Access Desktop, dan utility CSS framework Tailwind CSS untuk performa optimal.
            </p>
          </div>

          {/* ☁️ SCENE 4: Hosting & AI (Scroll Progress 80% to 100%) */}
          <div
            className="absolute transition-all duration-500 ease-out w-full px-6 flex flex-col items-center"
            style={{
              opacity: scrollProgress >= 0.80 && scrollProgress <= 1.0
                ? ((scrollProgress - 0.80) * 5 * (scrollProgress < 0.90 ? 1 : (1.0 - scrollProgress) * 10))
                : 0,
              transform: `scale(${1 + (scrollProgress - 0.80) * 0.06})`,
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B85FB8] px-4 py-2 rounded-full border border-[#8B2F8B]/30 bg-[#8B2F8B]/10 backdrop-blur-md mb-6">
              03. Hosting & Kecerdasan Buatan
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#B85FB8] to-[#4CAF7A] tracking-tight leading-none max-w-3xl drop-shadow-lg">
              INFRASTRUKTUR BERKELAS
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/65 max-w-2xl leading-relaxed font-medium">
              Dukungan hosting handal Dedicated Server mandiri, optimasi jaringan & keamanan CDN Cloudflare, serta peningkatan workflow coding didukung oleh Claude AI.
            </p>
          </div>
        </div>

        {/* 📊 3. Interactive Progress & Scroll Hint Footer */}
        <div className="w-full flex flex-col items-center gap-3 mt-auto mb-6">
          {/* Scroll Down Hint (Memudar saat mulai scroll) */}
          <div 
            className="flex flex-col items-center gap-1.5 transition-all duration-500"
            style={{
              opacity: scrollProgress < 0.08 ? 1 - scrollProgress * 12.5 : 0,
              transform: `translateY(${scrollProgress * 20}px)`,
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#FAFAFA]/40 font-semibold font-mono">Scroll Ke Bawah</span>
            <ChevronDown size={14} className="text-[#FAFAFA]/40 animate-bounce" />
          </div>

          {/* Interactive Progress Bar */}
          <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center gap-2">
            <div className="w-full h-0.75 bg-[#FAFAFA]/10 rounded-full overflow-hidden backdrop-blur-md">
              <div 
                className="h-full bg-linear-to-r from-[#8B2F8B] to-[#2E8B57] transition-all duration-75 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <div className="flex justify-between w-full text-[9px] tracking-[0.2em] font-mono text-[#FAFAFA]/30">
              <span>EXPLORING SYSTEM</span>
              <span>{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
