"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Palette,
  Code2,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Target,
  Server,
  Cloud,
  Brain,
  Database,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  Briefcase,
  Monitor,
  Activity,
  ShieldCheck,
  Settings,
  HelpCircle,
  ArrowUpRight
} from "lucide-react";
import ScrollVideo from "@/app/components/ScrollVideo";
import { useSmoothScroll } from "@/app/components/SmoothScrollProvider";

// ─── Color Palette ───
const COLORS = {
  purple: "#8B2F8B",
  purpleLight: "#B85FB8",
  purpleDark: "#5E1F5E",
  green: "#2E8B57",
  greenLight: "#4CAF7A",
  greenDark: "#1E5E3A",
  white: "#FAFAFA",
  black: "#0A0A0A",
  gray: "#1A1A1A",
  grayLight: "#2A2A2A",
};

// ─── Navbar Component ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Business Process", href: "#business-process" },
    { name: "Workflow & Tim", href: "#workflow" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Infrastruktur Server", href: "#server" },
    { name: "After Sales", href: "#after-sales" },
    { name: "Tim Visitasi", href: "#tim" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/acmlogo.png"
                  alt="Access Media"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-bold text-lg tracking-tight transition-colors duration-300 text-[#FAFAFA]">
                VISITASI<span className="text-[#8B2F8B]">ACM</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs lg:text-sm transition-colors duration-300 relative group text-[#FAFAFA]/70 hover:text-[#FAFAFA]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#8B2F8B] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 transition-colors duration-300 text-[#FAFAFA]"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-24 px-6 border-b border-white/[0.05]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl text-[#FAFAFA]/80 hover:text-[#8B2F8B] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION 1: BUSINESS PROCESS ───
function BusinessProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const diagnosticQuestions = [
    {
      question: "Bagaimana alur bisnis Anda sekarang?",
      desc: "Kami memetakan setiap proses transaksi, pencatatan keuangan, hingga alur administrasi untuk menemukan pola yang paling efisien.",
      icon: <TrendingUp className="text-[#8B2F8B]" size={20} />
    },
    {
      question: "Apa kendala utama yang bikin kerjaan macet?",
      desc: "Mendeteksi hambatan operasional di lapangan—apakah karena sistem lemot, data berantakan, atau koordinasi tim yang kurang termonitor.",
      icon: <XCircle className="text-[#2E8B57]" size={20} />
    },
    {
      question: "Berapa budget yang masuk akal untuk Anda?",
      desc: "Harga layanan kami susun secara transparan dan dihitung jujur berdasarkan hasil analisa kebutuhan nyata—bukan angka tebak-tebak buah manggis.",
      icon: <CheckCircle className="text-[#B85FB8]" size={20} />
    }
  ];

  return (
    <section id="business-process" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="text-[#8B2F8B] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-[#8B2F8B]/5 border border-[#8B2F8B]/10">
              01. Business Process
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-black text-[#1A1A1A] leading-tight tracking-tight">
              Semua Dimulai dari Ngobrol, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B2F8B] to-[#2E8B57]">
                Bukan Langsung Coding
              </span>
            </h2>
            <p className="mt-6 text-base text-[#1A1A1A]/60 leading-relaxed max-w-2xl">
              Setiap bisnis punya polanya sendiri. Ada yang ingin kerjanya lebih cepat, ada yang ingin data usahanya tidak berantakan, atau ada yang ingin semua hal bisa dipantau di satu layar monitor. 
              <br /><br />
              Makanya, sebelum kami mengetik kode baris pertama, kami membedah bersama alur operasional bisnis nyata Anda demi merancang blueprint sistem terbaik.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#8B2F8B]/10 to-[#2E8B57]/10 p-8 rounded-3xl border border-black/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-[#8B2F8B]" />
              Riset Visitasi Access Media
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">
              Berdasarkan kunjungan visitasi kelompok kami ke <strong>Access Media (ACM)</strong>, kami melihat bahwa pemetaan kebutuhan klien dilakukan secara komprehensif dari pencatatan log data administratif lama hingga diintegrasikan dengan database modern.
            </p>
          </motion.div>
        </div>

        {/* Diagnostic Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {diagnosticQuestions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="p-8 rounded-2xl bg-white border border-[#1A1A1A]/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:border-[#8B2F8B]/20 transition-all duration-300 relative group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3 leading-snug">
                {item.question}
              </h3>
              <p className="text-sm text-[#1A1A1A]/55 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 2: WORKFLOW & TIM ───
function WorkflowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const divisionOfLabor = [
    {
      role: "Tim Mobile & Web",
      focus: "Megang kendali aplikasi di smartphone (iOS & Android) serta sistem dashboard berbasis website interaktif.",
      icon: <Monitor size={22} className="text-[#8B2F8B]" />
    },
    {
      role: "Tim Desktop",
      focus: "Fokus menggarap sistem komputer internal perusahaan yang stabil (ditangani langsung oleh developer senior).",
      icon: <Database size={22} className="text-[#2E8B57]" />
    },
    {
      role: "Tim UI/UX",
      focus: "Merancang rancangan visual, prototipe fungsional, dan alur kenyamanan user sebelum tahap coding dimulai.",
      icon: <Palette size={22} className="text-[#B85FB8]" />
    },
    {
      role: "Tim Backend & Server",
      focus: "Mengurus arsitektur database, performa API routing, optimasi query, hingga seluruh server siap live online.",
      icon: <Server size={22} className="text-[#4CAF7A]" />
    }
  ];

  const workflowSteps = [
    { step: "01", name: "Diskusi", desc: "Diskusikan Kebutuhan" },
    { step: "02", name: "Analisa", desc: "Analisa Sistem" },
    { step: "03", name: "Figma", desc: "Desain Prototipe" },
    { step: "04", name: "Coding", desc: "Proses Development" },
    { step: "05", name: "Testing", desc: "Uji Coba Sistem" },
    { step: "06", name: "Revisi", desc: "Revisi Bersama" },
    { step: "07", name: "Deploy", desc: "Rilis ke Server" },
    { step: "08", name: "After Sales", desc: "Layanan Dukungan" }
  ];

  return (
    <section id="workflow" className="py-32 bg-[#0A0A0A] relative overflow-hidden text-[#FAFAFA]">
      <div className="absolute inset-0 bg-radial-to-br from-[#8B2F8B]/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#B85FB8] text-xs font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono">
            02. Workflow & Tim Kerja
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Kerja Beresin Project <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B85FB8] to-[#4CAF7A]">
              Pake Alur yang Jelas
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#FAFAFA]/60 leading-relaxed">
            Biar project Anda tidak berantakan atau mandek di tengah jalan, seluruh kerjaan kami bagi-bagi secara terstruktur sesuai keahlian tim spesifik. Gak ada cerita satu orang borongan ngerjain semuanya!
          </p>
        </div>

        {/* Division of Labor Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {divisionOfLabor.map((team, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#8B2F8B]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5">
                {team.icon}
              </div>
              <h3 className="text-base font-bold text-[#FAFAFA] mb-2">{team.role}</h3>
              <p className="text-xs text-[#FAFAFA]/50 leading-relaxed">{team.focus}</p>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-8 rounded-3xl border border-white/[0.05] bg-gradient-to-r from-[#8B2F8B]/10 to-[#2E8B57]/5 mb-24"
        >
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Settings size={18} className="text-[#B85FB8] animate-spin-slow" />
                Gimana Cara Kami Pantau Progress?
              </h3>
              <p className="text-xs text-[#FAFAFA]/60 leading-relaxed">
                Semua tugas operasional kami koordinasikan secara transparan lewat <strong>Trello</strong> dan <strong>Microsoft To Do List</strong>. Sedangkan untuk urusan simpan-pinjam file aset project semuanya tersentralisasi dengan aman di cloud storage <strong>OneDrive</strong>. Anda bisa mengetahui progress rill tanpa perlu menebak-nebak.
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-3 gap-4 text-center">
              {[
                { name: "Trello", role: "Tugas & Board", color: "from-[#8B2F8B] to-[#5E1F5E]" },
                { name: "Microsoft To Do", role: "Task Management", color: "from-[#2E8B57] to-[#1E5E3A]" },
                { name: "OneDrive", role: "Aset Cloud", color: "from-[#4CAF7A] to-[#2E8B57]" }
              ].map((tool, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${tool.color} mx-auto mb-2 flex items-center justify-center font-bold text-xs`}>
                    {tool.name[0]}
                  </div>
                  <div className="font-bold text-xs text-[#FAFAFA]">{tool.name}</div>
                  <div className="text-[9px] text-[#FAFAFA]/40 mt-0.5">{tool.role}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Workflow Timeline Diagram */}
        <div>
          <h3 className="text-base font-bold tracking-wider text-center mb-10 text-[#FAFAFA]/70 uppercase font-mono">
            ALUR KERJA PROYEK DARI A SAMPAI Z
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center hover:border-[#2E8B57]/30 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-[#4CAF7A] group-hover:scale-110 transition-transform">{step.step}</div>
                <div className="font-bold text-xs text-[#FAFAFA] mt-1">{step.name}</div>
                <div className="text-[9px] text-[#FAFAFA]/40 mt-1">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 3: PERFORMANCE & TECH STACK ───
function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techStack = [
    {
      title: "Figma",
      category: "Desain Antarmuka",
      desc: "Merancang rancangan visual (UI/UX) dan mockup interaktif agar Anda mendapatkan gambaran utuh sebelum aplikasi mulai di-coding.",
      icon: <Palette size={26} />,
      color: "#8B2F8B"
    },
    {
      title: "Laravel",
      category: "Backend & Core logic",
      desc: "Framework PHP kelas dunia yang sangat kokoh, terkenal aman, stabil untuk kebutuhan enterprise, dan memiliki struktur routing yang rapi.",
      icon: <Code2 size={26} />,
      color: "#2E8B57"
    },
    {
      title: "Tailwind CSS",
      category: "CSS Utility Framework",
      desc: "Utility-first CSS untuk menciptakan tampilan responsif berestetika premium—rapi dibuka di layar HP, tablet, maupun monitor komputer.",
      icon: <Monitor size={26} />,
      color: "#B85FB8"
    }
  ];

  return (
    <section id="tech-stack" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#8B2F8B] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-[#8B2F8B]/5 border border-[#8B2F8B]/10">
            03. Tech Stack & Optimization
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black text-[#1A1A1A] leading-tight">
            Tampilan Cakep, tapi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B2F8B] to-[#2E8B57]">
              yang Penting Gak Lemot!
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#1A1A1A]/50 leading-relaxed">
            Aplikasi kalau tampilannya estetik tapi pas diklik muter-muter (loading) lama, ujung-ujungnya bikin karyawan stres dan produktivitas terhambat. Kami tidak ingin membuat aplikasi yang mengecewakan seperti itu.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative p-8 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5 hover:border-[#8B2F8B]/20 transition-all duration-500 hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/40">
                {tech.category}
              </span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center my-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${tech.color}10`, color: tech.color }}
              >
                {tech.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">{tech.title}</h3>
              <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">{tech.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Anti-Lag Optimization Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-8 rounded-3xl border border-black/5 bg-gradient-to-br from-[#1A1A1A]/[0.01] via-transparent to-[#8B2F8B]/5"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#8B2F8B] uppercase mb-4">
                <Activity size={14} className="animate-pulse" />
                SISTEM ANTI-LAG OPTIMIZATION
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1A] leading-tight mb-4">
                Gak Pakai Nge-lag Selama Operasional Kerja
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 leading-relaxed mb-6">
                Sistem dan struktur database kami rancang secara kokoh dari tahap paling awal agar sangat ringan, tidak memakan memori CPU server secara boros, dan tetap responsif ketika diakses oleh banyak karyawan secara bersamaan di jam sibuk kerja harian.
              </p>
              <div className="flex flex-col gap-3 font-mono text-[11px] text-[#1A1A1A]/70">
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#2E8B57]" /> Optimasi Indexing Query Database</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#2E8B57]" /> Caching Halaman Ringan via Redis</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#2E8B57]" /> Kompresi Aset Gambar & Skrip CSS/JS</div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/[0.05] font-mono text-[10px] text-[#4CAF7A] shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-[#FAFAFA]/50 font-bold">DATABASE QUERY METRIC</span>
                <span className="bg-[#2E8B57]/20 text-[#4CAF7A] px-2 py-0.5 rounded-full text-[8px]">ACTIVE</span>
              </div>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>ACM Legacy seeking</span>
                    <span className="text-red-400">124.5 ms (Unindexed)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 w-[80%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Our Laravel Core Seeking</span>
                    <span className="text-[#4CAF7A]">3.2 ms (Fully Optimized)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E8B57] w-[15%]" />
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3 mt-3 flex justify-between text-[9px] text-[#FAFAFA]/40">
                  <span>🚀 SECTOR ACCELERATION: 38x FASTER</span>
                  <span>LOAD LATENCY: 0.02%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── SECTION 4: INFRASTRUCTURE & SERVER ───
function ServerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const specs = [
    {
      title: "Dedicated & Cloud Server",
      desc: "Performa komputer server khusus kelas industri, tidak dibagi-bagi/sharing dengan performa website orang lain.",
      icon: <Server size={22} className="text-[#B85FB8]" />
    },
    {
      title: "cPanel & CyberPanel",
      desc: "Manajemen panel pengoperasian server yang stabil, aman, dan mempermudah pemantauan file sistem data.",
      icon: <Settings size={22} className="text-[#4CAF7A]" />
    },
    {
      title: "Cloudflare CDN Proxy",
      desc: "Terpasang di gerbang depan untuk menyaring trafik berbahaya, menahan serangan DDoS, sekaligus mempercepat loading data.",
      icon: <Cloud size={22} className="text-[#8B2F8B]" />
    }
  ];

  return (
    <section id="server" className="py-32 bg-[#0A0A0A] relative overflow-hidden text-[#FAFAFA]">
      <div className="absolute inset-0 bg-radial-to-bl from-[#2E8B57]/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#4CAF7A] text-xs font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono">
            04. Infrastructure & Server
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Server Kokoh, Data Aman, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF7A] to-[#B85FB8]">
              Minim Downtime
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#FAFAFA]/60 leading-relaxed">
            Urusan rumah tempat aplikasi Anda tinggal (server) tidak boleh pelit. Kami menyiapkan infrastruktur yang kokoh, tangguh, dan siap menahan beban kerja harian bisnis skala besar.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-[#2E8B57]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5">
                {spec.icon}
              </div>
              <h3 className="text-base font-bold mb-2 text-[#FAFAFA]">{spec.title}</h3>
              <p className="text-xs text-[#FAFAFA]/50 leading-relaxed">{spec.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* High-Availability Monolith Strategy */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4CAF7A] uppercase mb-4">
              <ShieldCheck size={14} />
              HIGH-AVAILABILITY MONOLITH ARCHITECTURE
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              Strategi Antam Lemot & Crash: Monolith Terpadu + Backup Server
            </h3>
            <p className="text-sm text-[#FAFAFA]/60 leading-relaxed mb-6">
              Daripada memakai arsitektur microservices yang ribet dikelola namun ringkih di koordinasi data, kami memilih menggunakan <strong>Konsep Monolith (1 Server Utama)</strong> karena jauh lebih stabil untuk kebutuhan operasional proyek yang sedang berjalan.
              <br /><br />
              <strong>Tapi bagaimana kalau server utamanya down?</strong>
              <br />
              Tenang saja! Kami telah menyiapkan satu unit <strong>Server Cadangan</strong> dengan spesifikasi mesin yang sama persis (sama-sama monolith). Jika terjadi anomali pada server utama, database replikasi backup siap mengambil alih tugas seketika demi menekan resiko operasional bisnis macet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#8B2F8B]/5 rounded-full blur-[80px]" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4CAF7A] mb-6 flex items-center gap-2">
              <Activity size={12} className="animate-pulse" />
              SISTEM MONITORING DI LEVEL MESIN SERVER
            </h4>
            <p className="text-xs text-[#FAFAFA]/50 mb-6 font-mono leading-relaxed">
              Sistem monitoring kami pasang langsung di level terdalam sistem operasi mesin server (bukan sekedar di aplikasi). Kami pantau ketat 24 jam penuh:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#8B2F8B]/10 flex items-center justify-center text-[#B85FB8] font-bold text-xs">
                  01
                </div>
                <div>
                  <div className="font-bold text-xs">Resource Monitoring</div>
                  <div className="text-[10px] text-[#FAFAFA]/40 mt-0.5">Memantau ketat kapasitas sisa RAM, Core Processor, dan kapasitas storage harddisk server.</div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#2E8B57]/10 flex items-center justify-center text-[#4CAF7A] font-bold text-xs">
                  02
                </div>
                <div>
                  <div className="font-bold text-xs">Query Database Monitoring</div>
                  <div className="text-[10px] text-[#FAFAFA]/40 mt-0.5">Memantau kecepatan respon database saat mengeksekusi proses membaca (read) dan menyimpan (write) data operasional bisnis Anda.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 5: AFTER SALES & PHILOSOPHY ───
function AfterSalesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const supportGuarantees = [
    {
      title: "Pemeriksaan Bug & Error",
      desc: "Menyediakan debugging responsif jika ditemukan malfungsi program agar alur operasional kerja tetap aman terkendali."
    },
    {
      title: "Optimasi Rutin Berkala",
      desc: "Melakukan pemeliharaan server secara berkala, pembersihan cache, hingga pembaruan patch keamanan sistem."
    },
    {
      title: "Ekspansi Penambahan Fitur",
      desc: "Sistem didesain modular agar siap menambahkan fitur-fitur baru ke depannya mengikuti arah perkembangan skala bisnis Anda."
    }
  ];

  return (
    <section id="after-sales" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8B2F8B]/3 rounded-full blur-[120px]" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#8B2F8B] text-xs font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full bg-[#8B2F8B]/5 border border-[#8B2F8B]/10 font-mono">
            05. After Sales Service
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black text-[#1A1A1A] leading-tight">
            Lagian, Project Gak Selesai <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B2F8B] to-[#2E8B57]">
              Pas Aplikasi Dikirim...
            </span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Banyak pengembang/vendor IT yang mendadak hilang tanpa kabar setelah aplikasi selesai dibayar penuh. Kami tidak bekerja dengan cara yang tidak bertanggung jawab seperti itu. 
            <br /><br />
            Setelah sistem Anda resmi berjalan *live*, kami tetap membuka layanan pendampingan penuh untuk menjaga kelancaran bisnis Anda.
          </p>

          {/* Guarantee Cards */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-left">
            {supportGuarantees.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-black/5 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:border-[#8B2F8B]/20 transition-all duration-300">
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B2F8B]" />
                  {item.title}
                </h3>
                <p className="text-xs text-[#1A1A1A]/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Team Section (Tim Visitasi ACM) ───
function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const lenis = useSmoothScroll();

  const [activeMember, setActiveMember] = useState<{ name: string; video: string } | null>(null);

  const team = [
    {
      name: "Asisyah Sarah Azzahra",
      role: "Team Leader & Analyst",
      nim: "202402009",
      image: "/img/asisyah.png",
      video: "/jj/asisyah.mp4",
    },
    {
      name: "Echa Muhammad Roffy Yandi",
      role: "Frontend & Researcher",
      nim: "202402020",
      image: "/img/echa.jpeg",
      video: "/jj/echa.mp4",
    },
    {
      name: "Aldyana",
      role: "Content Creator",
      nim: "202402036",
      image: "/img/aldy.png",
      video: "/jj/aldy.mp4",
    },
    {
      name: "Risma Rismaya",
      role: "Documentation & Writer",
      nim: "202402052",
      image: "/img/risma.jpeg",
      video: "/jj/risma.mp4",
    },
  ];

  // Kunci Scroll Global (Lenis) saat modal video JJ aktif agar background tidak bergeser
  useEffect(() => {
    if (!lenis) return;
    if (activeMember) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, activeMember]);

  return (
    <section id="tim" className="py-32 bg-[#0A0A0A] relative text-[#FAFAFA]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B2F8B]/3 via-transparent to-[#2E8B57]/3" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#4CAF7A] text-xs font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono">
            06. Anggota Kelompok
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#FAFAFA]">
            Tim Visitasi <span className="text-[#8B2F8B]">Kami</span>
          </h2>
          <p className="mt-6 text-sm text-[#FAFAFA]/50 max-w-2xl mx-auto">
            Anggota kelompok mahasiswa yang bertanggung jawab penuh atas analisis, pembuatan desain, hingga implementasi kode report visitasi interaktif ini. klik card untuk melihat profil video JJ kami!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              onClick={() => setActiveMember({ name: member.name, video: member.video })}
              className="relative p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-[#8B2F8B]/50 hover:bg-white/[0.03] hover:scale-105 transition-all duration-500 text-center cursor-pointer shadow-md group"
            >
              {/* Avatar Profile Image dengan hover zap/play glow */}
              <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#8B2F8B]/20 to-[#2E8B57]/20 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(139,47,139,0.45)] transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Glowing Zap Icon Overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#8B2F8B] text-[#FAFAFA] flex items-center justify-center shadow-[0_0_15px_rgba(139,47,139,0.8)] scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Zap size={16} className="fill-current" />
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#FAFAFA]">
                {member.name}
              </h3>
              <p className="text-[#B85FB8] text-xs font-medium mt-1">
                {member.role}
              </p>
              <p className="text-[#FAFAFA]/30 text-[10px] mt-2 font-mono">
                {member.nim}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🎬 JEDAG JEDUG (JJ) PROFILE VIDEO MODAL POPUP */}
      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={() => setActiveMember(null)}
          >
            {/* Tombol Close */}
            <div className="absolute top-6 right-6 text-white cursor-pointer hover:text-[#8B2F8B] transition-colors p-2 bg-white/5 rounded-full border border-white/10 hover:border-[#8B2F8B]/30 hover:shadow-[0_0_15px_rgba(139,47,139,0.5)] z-50">
              <X size={20} />
            </div>

            {/* Container Video Portrait (9:16) */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-[#8B2F8B] shadow-[0_0_50px_rgba(139,47,139,0.4)] bg-[#0A0A0A]"
              onClick={(e) => e.stopPropagation()} // Cegah klik menutup modal
            >
              <video
                src={memberVideoFallback(activeMember.video)}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />

              {/* Glowing Badge Footer */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A]/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center font-mono">
                <div className="text-[10px] text-[#B85FB8] font-bold tracking-[0.2em] animate-pulse flex items-center justify-center gap-1.5">
                  <Zap size={11} className="fill-[#B85FB8]" />
                  JEDAG JEDUG ACTIVE ⚡
                </div>
                <div className="text-xs font-bold text-[#FAFAFA] mt-1.5">
                  {activeMember.name}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Helper untuk fallback video jika file belum diupload di public/video
function memberVideoFallback(videoUrl: string) {
  // Anda dapat menaruh sample video fallback jika folder kosong
  return videoUrl;
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="py-16 bg-[#070707] border-t border-white/[0.05] text-[#FAFAFA]/55">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-10 h-10">
              <Image
                src="/acmlogo.png"
                alt="Access Media"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[#FAFAFA] font-bold text-lg">
              VISITASI<span className="text-[#8B2F8B]">ACM</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed max-w-md mx-auto text-[#FAFAFA]/40 font-mono">
            Laporan Analisis Sistem, Infrastruktur Hosting & Server, serta Pembagian Tim Operasional Proyek. Dihimpun langsung dari hasil visitasi lapangan di Access Media.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.03] text-center">
          <p className="text-[11px] text-[#FAFAFA]/30 font-mono">
            © {new Date().getFullYear()} Kelompok Visitasi Access Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen font-sans antialiased text-[#1A1A1A]">
      <Navbar />
      <ScrollVideo />
      <BusinessProcessSection />
      <WorkflowSection />
      <TechStackSection />
      <ServerSection />
      <AfterSalesSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
