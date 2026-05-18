"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Users, ChevronDown, Building2, Cpu, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

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
  scrollSpeed = 350,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useSmoothScroll();

  // State untuk Preloading Engine
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string>("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Engine Preloading Video via Fetch + ReadableStream
  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function preloadVideo() {
      try {
        const response = await fetch(videoUrl, { signal: controller.signal });
        if (!response.body) throw new Error("ReadableStream tidak didukung oleh browser.");

        const contentLength = response.headers.get("content-length");
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

        const reader = response.body.getReader();
        let loadedBytes = 0;
        const chunks: Uint8Array[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          if (value) {
            chunks.push(value);
            loadedBytes += value.length;
            
            if (totalBytes > 0) {
              const progress = Math.round((loadedBytes / totalBytes) * 100);
              if (active) setLoadingProgress(progress);
            } else {
              // Jika server tidak mengirimkan Content-Length (fallback)
              if (active) setLoadingProgress((prev) => Math.min(prev + 1, 99));
            }
          }
        }

        if (!active) return;

        // Satukan seluruh chunks video dan buat Object URL lokal (Blob)
        const blob = new Blob(chunks as unknown as BlobPart[], { type: "video/mp4" });
        const localBlobUrl = URL.createObjectURL(blob);
        
        setVideoBlobUrl(localBlobUrl);
        setLoadingProgress(100);

        // Berikan jeda estetika premium sebelum transisi fade-out preloader
        setTimeout(() => {
          if (active) setIsPreloading(false);
        }, 800);

      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Gagal melakukan preloading video, mengaktifkan fallback stream: ", error);
          // Fallback aman: gunakan original URL jika gagal memuat blob
          setVideoBlobUrl(videoUrl);
          setLoadingProgress(100);
          setIsPreloading(false);
        }
      }
    }

    preloadVideo();

    return () => {
      active = false;
      controller.abort();
    };
  }, [videoUrl]);

  // 2. Kunci Scroll Global (Lenis) selama preloading agar transisi super mulus
  useEffect(() => {
    if (!lenis) return;
    if (isPreloading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isPreloading]);

  const handleLoadedMetadata = () => {
    setIsVideoLoaded(true);
  };

  // Pemicu manual jika video sudah berada dalam cache browser dan siap
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      setIsVideoLoaded(true);
    }
  }, [videoBlobUrl]);

  // 3. Sinkronisasi Video Timeline Scroll dengan GSAP
  useGSAP(
    () => {
      // Pastikan video dimuat penuh dan preloader selesai
      if (!isVideoLoaded || isPreloading || !videoRef.current || !containerRef.current) return;

      const video = videoRef.current;
      video.pause();
      video.currentTime = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollSpeed}%`,
          scrub: 2.5, // 2.5 detik redaman inersia (shock-absorber) super smooth
          pin: true, // Pinned di tengah layar selama scroll
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      tl.to(video, {
        currentTime: video.duration || 0,
        ease: "none",
      });

      return () => {
        if (video) video.pause();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    { dependencies: [isVideoLoaded, isPreloading, scrollSpeed], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] flex flex-col justify-center items-center"
    >
      {/* 🌌 A. FUTURISTIC CINEMATIC PRELOADER SCREEN */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#0A0A0A] overflow-hidden"
          >
            {/* Grid Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(139, 47, 139, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 47, 139, 0.2) 1px, transparent 1px)`,
                backgroundSize: "45px 45px",
              }}
            />

            {/* Glowing Ambient Light Orbs */}
            <div className="absolute w-[350px] h-[350px] bg-[#8B2F8B]/8 rounded-full blur-[110px] animate-pulse" />
            <div className="absolute w-[250px] h-[250px] bg-[#2E8B57]/4 rounded-full blur-[90px] bottom-10" />

            {/* Scanning Line Animation */}
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B2F8B]/50 to-transparent shadow-[0_0_12px_rgba(139,47,139,0.6)] animate-[scan_3.5s_linear_infinite]" />

            <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
              {/* Spinning Futuristic Core */}
              <div className="relative mb-8 p-6 rounded-2xl border border-[#8B2F8B]/20 bg-[#8B2F8B]/5 shadow-[0_0_40px_rgba(139,47,139,0.12)] flex items-center justify-center">
                <Cpu size={38} className="text-[#B85FB8] animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 rounded-2xl border border-dashed border-[#2E8B57]/30 animate-[spin_24s_linear_infinite]" />
              </div>

              {/* Loader Header */}
              <h2 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#FAFAFA]/40 font-mono mb-2">
                SYSTEM INITIALIZATION
              </h2>
              <h1 className="text-2xl font-black tracking-tight text-[#FAFAFA] mb-6 font-sans">
                EXPLORING <span className="text-[#B85FB8]">TIM</span> <span className="text-[#4CAF7A]">GACOR</span>
              </h1>

              {/* Progress Bar Container */}
              <div className="w-full h-1 bg-[#FAFAFA]/5 rounded-full overflow-hidden mb-3 relative border border-white/[0.02]">
                <div 
                  className="h-full bg-gradient-to-r from-[#8B2F8B] via-[#B85FB8] to-[#2E8B57] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(184,95,184,0.7)]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Progress Text */}
              <div className="flex justify-between w-full text-[10px] tracking-widest font-mono text-[#FAFAFA]/50 mb-6">
                <span>BUFFERING CORE VIDEO</span>
                <span className="text-[#B85FB8] font-bold">{loadingProgress}%</span>
              </div>

              {/* Real-time Dynamic Console Logs */}
              <div className="w-full bg-[#121212]/95 border border-[#FAFAFA]/5 rounded-xl p-3.5 text-left font-mono text-[9px] text-[#FAFAFA]/40 shadow-inner h-[50px] flex flex-col justify-center gap-0.5">
                <span className="text-[#B85FB8] flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B85FB8]" />
                  {loadingProgress < 20 && "STATUS: Mengunduh volumetric video..."}
                  {loadingProgress >= 20 && loadingProgress < 50 && "STATUS: Mengunggah data frame ke RAM..."}
                  {loadingProgress >= 50 && loadingProgress < 80 && "STATUS: Sinkronisasi GPU hardware..."}
                  {loadingProgress >= 80 && loadingProgress < 100 && "STATUS: Mengoptimalkan latensi render..."}
                  {loadingProgress === 100 && "STATUS: Sistem siap! Memulai visualisasi..."}
                </span>
                <span className="text-[8px] opacity-60">
                  {`> Memory: ${loadingProgress * 155}KB / 15.5MB | Latency: 0.1ms`}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎬 B. FULLSCREEN VIDEO LAYOUT (Instant seek from local Blob) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {videoBlobUrl && (
          <video
            ref={videoRef}
            src={videoBlobUrl}
            muted
            playsInline
            preload="auto"
            controls={false}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover pointer-events-none opacity-40"
          />
        )}
        {/* Cinematic dark vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/90 pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 47, 139, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 47, 139, 0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Ambient Lighting Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-125 h-125 bg-[#8B2F8B]/5 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: scrollProgress < 0.25 ? 1 - scrollProgress * 4 : 0 }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-[#2E8B57]/5 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: scrollProgress < 0.25 ? 1 - scrollProgress * 4 : 0 }}
      />

      {/* 📝 C. DYNAMIC INTERACTIVE CONTENT OVERLAY */}
      <div className="relative z-10 w-full h-screen flex flex-col justify-between items-center p-6 sm:p-12 md:p-16 pointer-events-none">
        
        <div className="h-20 w-full" />

        {/* Narrative Scenes */}
        <div className="w-full max-w-6xl text-center relative flex justify-center items-center flex-1 my-8">
          
          {/* SCENE 1: Welcome (0% - 15%) */}
          <div
            className="absolute transition-all duration-700 ease-out w-full px-4 flex flex-col items-center"
            style={{
              opacity: scrollProgress < 0.15 ? (0.15 - scrollProgress) * 6.6 : 0,
              transform: `translateY(${scrollProgress * -60}px) scale(${1 - scrollProgress * 0.08})`,
              pointerEvents: scrollProgress < 0.15 ? "auto" : "none",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm mb-6 backdrop-blur-md font-mono">
              
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAFAFA] leading-[1.15] tracking-tight max-w-5xl">
              Kami Nggak Cuma Bikin Aplikasi,
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#B85FB8] via-[#8B2F8B] to-[#2E8B57] drop-shadow-sm">
                Tapi Ikut Mikirin Cara Kerjanya.
              </span>
            </h1>

            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/75 max-w-3xl mx-auto leading-relaxed">
              Aplikasi bagus itu bukan yang fiturnya paling rame, tapi yang pas dipake harian bikin kerjaan tim Anda jadi beres, rapi, dan gak pusing.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#profil"
                className="group px-8 py-3.5 bg-[#8B2F8B] text-[#FAFAFA] font-medium rounded-full hover:bg-[#B85FB8] transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-[#8B2F8B]/30 pointer-events-auto cursor-pointer"
              >
                Ngobrolin Project Anda
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#tim"
                className="px-8 py-3.5 border border-[#FAFAFA]/20 text-[#FAFAFA]/80 hover:text-[#FAFAFA] font-medium rounded-full hover:bg-[#FAFAFA]/5 transition-all duration-300 flex items-center gap-2 pointer-events-auto cursor-pointer"
              >
                Lihat Cara Kami Kerja
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 max-w-3xl w-full border-t border-[#FAFAFA]/10 pt-8">
              {[
                { value: "4", label: "Fokus Tim Kerja" },
                { value: "3", label: "Pilar Tekno ACM" },
                { value: "2", label: "Metrik Monitor" },
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

          {/* SCENE 2: Business Process (20% - 45%) */}
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
              01. Business Process
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAFAFA] tracking-tight leading-none max-w-4xl drop-shadow-lg uppercase">
              Semua Dimulai dari <span className="text-[#8B2F8B]">Ngobrol</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/65 max-w-2xl leading-relaxed font-medium">
              Setiap bisnis punya polanya sendiri. Ada yang pengen kerja lebih cepet, data usaha rapi, atau terpantau penuh di satu layar monitor. Kita bedah alur nyata bisnis Anda sebelum menulis kode.
            </p>
          </div>

          {/* SCENE 3: Performance & Tech Stack (50% - 75%) */}
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
              02. Performance & Tech Stack
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAFAFA] tracking-tight leading-none max-w-4xl drop-shadow-lg uppercase">
              TAMPILAN CAKEP, <span className="text-[#2E8B57]">GAK LEMOT!</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/65 max-w-2xl leading-relaxed font-medium">
              Aplikasi estetik tapi loading lama bikin karyawan stres. Kami merancang desain Figma interaktif, lalu merealisasikannya via Laravel & Tailwind CSS yang ringan, responsif, dan bebas lag.
            </p>
          </div>

          {/* SCENE 4: Infrastructure & Server (80% - 100%) */}
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
              03. Infrastructure & Server
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#B85FB8] to-[#4CAF7A] tracking-tight leading-none max-w-4xl drop-shadow-lg uppercase">
              SERVER KOKOH & DATA AMAN
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFAFA]/65 max-w-2xl leading-relaxed font-medium">
              Dedicated Server monolith berpanel CyberPanel/cPanel terlindung Cloudflare. Kami lengkapi dengan strategi Backup Server identik yang siap mengambil alih seketika saat terjadi downtime.
            </p>
          </div>
        </div>

        {/* Scroll down hint & progress bar */}
        <div className="w-full flex flex-col items-center gap-3 mt-auto mb-6">
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
