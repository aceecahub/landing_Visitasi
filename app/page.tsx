"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Palette,
  Code2,
  TrendingUp,
  ChevronDown,
  Star,
  Quote,
  Play,
  ArrowUpRight,
  Sparkles,
  Target,
  Rocket,
  Server,
  Cloud,
  Brain,
  Database,
  Globe,
  Cpu,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  Briefcase,
  Monitor,
} from "lucide-react";

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
    { name: "Profil Perusahaan", href: "#profil" },
    { name: "Teknologi", href: "#teknologi" },
    { name: "Analisis", href: "#analisis" },
    { name: "Hosting & AI", href: "#tools" },
    { name: "Kesimpulan", href: "#kesimpulan" },
    { name: "Tim", href: "#tim" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAFAFA]/90 backdrop-blur-xl border-b border-[#1A1A1A]/5"
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
                  alt="Access Media Lab"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-[#1A1A1A] font-bold text-lg tracking-tight hidden sm:block">
                VISITASI<span className="text-[#8B2F8B]">ACM</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#8B2F8B] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#1A1A1A] p-2"
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
            className="fixed inset-0 z-40 bg-[#FAFAFA] pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl text-[#1A1A1A]/80 hover:text-[#8B2F8B] transition-colors"
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

// ─── Hero Section ───
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 47, 139, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 47, 139, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B2F8B]/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2E8B57]/5 rounded-full blur-[100px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B2F8B]/30 bg-[#8B2F8B]/10 text-[#B85FB8] text-sm mb-8"
        >
          <Building2 size={14} />
          Laporan Visitasi Perusahaan
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[#1A1A1A] leading-[1.1] tracking-tight"
        >
          Visitasi
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B2F8B] via-[#B85FB8] to-[#2E8B57]">
            Access Media Lab
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-lg sm:text-xl text-[#1A1A1A]/50 max-w-2xl mx-auto leading-relaxed"
        >
          Analisis teknologi, infrastruktur, dan sistem yang digunakan oleh
          Access Media Lab dalam operasional bisnisnya.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#profil"
            className="group px-8 py-4 bg-[#8B2F8B] text-[#1A1A1A] font-medium rounded-full hover:bg-[#B85FB8] transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-[#8B2F8B]/30"
          >
            Lihat Laporan
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#tim"
            className="px-8 py-4 border border-[#1A1A1A]/20 text-[#1A1A1A] font-medium rounded-full hover:bg-[#1A1A1A]/5 transition-all duration-300 flex items-center gap-2"
          >
            <Users size={16} />
            Anggota Kelompok
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "3", label: "Teknologi Utama" },
            { value: "2", label: "Tools Hosting" },
            { value: "1", label: "AI Tools" },
            { value: "4", label: "Anggota Tim" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#1A1A1A]/40 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} className="text-[#1A1A1A]/30" />
      </motion.div>
    </section>
  );
}

// ─── Profil Perusahaan Section ───
function ProfilSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profil" className="py-32 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#8B2F8B] text-sm font-medium tracking-widest uppercase">
            Profil Perusahaan
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
            Tentang{" "}
            <span className="text-[#2E8B57]">Access Media Lab</span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/50 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Building2 size={20} className="text-[#8B2F8B]" />
                  Informasi Umum
                </h3>
                <p className="text-[#1A1A1A]/50 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Briefcase size={20} className="text-[#2E8B57]" />
                  Bidang Usaha
                </h3>
                <p className="text-[#1A1A1A]/50 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse cillum.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Monitor size={20} className="text-[#8B2F8B]" />
                  Layanan yang Diberikan
                </h3>
                <p className="text-[#1A1A1A]/50 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui officia.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#8B2F8B]/10 to-[#2E8B57]/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <Image
                    src="/acmlogo.png"
                    alt="Access Media Lab Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#8B2F8B]/30 rounded-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-[#2E8B57]/30 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Teknologi Section ───
function TeknologiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    {
      icon: <Database size={28} />,
      title: "Microsoft Access Desktop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      category: "Database",
      color: "#8B2F8B",
    },
    {
      icon: <Code2 size={28} />,
      title: "Laravel",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor.",
      category: "Backend Framework",
      color: "#2E8B57",
    },
    {
      icon: <Palette size={28} />,
      title: "Tailwind CSS",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat.",
      category: "CSS Framework",
      color: "#8B2F8B",
    },
  ];

  return (
    <section id="teknologi" className="py-32 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#8B2F8B] text-sm font-medium tracking-widest uppercase">
            Teknologi yang Digunakan
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
            Stack Teknologi{" "}
            <span className="text-[#2E8B57]">Access Media Lab</span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/50 max-w-2xl mx-auto">
            Berikut adalah teknologi utama yang digunakan oleh perusahaan dalam
            pengembangan sistem dan aplikasi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative p-8 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5 hover:border-[#1A1A1A]/10 transition-all duration-500 hover:bg-[#1A1A1A]/[0.04]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-[#8B2F8B] uppercase tracking-wider px-3 py-1 rounded-full bg-[#8B2F8B]/10">
                  {tech.category}
                </span>
              </div>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
              >
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                {tech.title}
              </h3>
              <p className="text-[#1A1A1A]/40 leading-relaxed text-sm">
                {tech.desc}
              </p>
              <div
                className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${tech.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Analisis Section ───
function AnalisisSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const analysis = [
    {
      title: "Microsoft Access Desktop",
      kelebihan: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt ut labore",
        "Ut enim ad minim veniam, quis nostrud exercitation",
      ],
      kekurangan: [
        "Duis aute irure dolor in reprehenderit in voluptate",
        "Excepteur sint occaecat cupidatat non proident",
        "Sunt in culpa qui officia deserunt mollit anim",
      ],
      alternatif: [
        "MySQL / PostgreSQL",
        "Microsoft SQL Server",
        "SQLite",
      ],
      color: "#8B2F8B",
    },
    {
      title: "Laravel",
      kelebihan: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt ut labore",
        "Ut enim ad minim veniam, quis nostrud exercitation",
      ],
      kekurangan: [
        "Duis aute irure dolor in reprehenderit in voluptate",
        "Excepteur sint occaecat cupidatat non proident",
        "Sunt in culpa qui officia deserunt mollit anim",
      ],
      alternatif: [
        "Django (Python)",
        "Express.js (Node.js)",
        "Ruby on Rails",
      ],
      color: "#2E8B57",
    },
    {
      title: "Tailwind CSS",
      kelebihan: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt ut labore",
        "Ut enim ad minim veniam, quis nostrud exercitation",
      ],
      kekurangan: [
        "Duis aute irure dolor in reprehenderit in voluptate",
        "Excepteur sint occaecat cupidatat non proident",
        "Sunt in culpa qui officia deserunt mollit anim",
      ],
      alternatif: [
        "Bootstrap",
        "Material UI",
        "Chakra UI",
      ],
      color: "#8B2F8B",
    },
  ];

  return (
    <section id="analisis" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8B2F8B]/3 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#2E8B57] text-sm font-medium tracking-widest uppercase">
            Analisis & Reasoning
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
            Kelebihan, Kekurangan &{" "}
            <span className="text-[#8B2F8B]">Alternatif</span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/50 max-w-2xl mx-auto">
            Analisis mendalam terhadap setiap teknologi yang digunakan beserta
            reasoning pemilihannya.
          </p>
        </motion.div>

        <div className="space-y-8">
          {analysis.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl bg-[#FFFFFF] border border-[#1A1A1A]/5 hover:border-[#1A1A1A]/10 transition-all duration-500"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Kelebihan */}
                  <div className="p-6 rounded-xl bg-green-50/50 border border-green-100">
                    <h4 className="text-sm font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Kelebihan
                    </h4>
                    <ul className="space-y-2">
                      {item.kelebihan.map((k, j) => (
                        <li key={j} className="text-sm text-[#1A1A1A]/60 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kekurangan */}
                  <div className="p-6 rounded-xl bg-red-50/50 border border-red-100">
                    <h4 className="text-sm font-semibold text-red-700 mb-4 flex items-center gap-2">
                      <XCircle size={16} />
                      Kekurangan
                    </h4>
                    <ul className="space-y-2">
                      {item.kekurangan.map((k, j) => (
                        <li key={j} className="text-sm text-[#1A1A1A]/60 flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">•</span>
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alternatif */}
                  <div className="p-6 rounded-xl bg-purple-50/50 border border-purple-100">
                    <h4 className="text-sm font-semibold text-purple-700 mb-4 flex items-center gap-2">
                      <ArrowUpRight size={16} />
                      Alternatif
                    </h4>
                    <ul className="space-y-2">
                      {item.alternatif.map((k, j) => (
                        <li key={j} className="text-sm text-[#1A1A1A]/60 flex items-start gap-2">
                          <span className="text-purple-500 mt-0.5">→</span>
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="mt-6 p-6 rounded-xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5">
                  <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#8B2F8B]" />
                    Reasoning Pemilihan
                  </h4>
                  <p className="text-sm text-[#1A1A1A]/50 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tools Section (Hosting & AI) ───
function ToolsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const hostingTools = [
    {
      icon: <Server size={28} />,
      title: "Dedicated Server",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "#8B2F8B",
    },
    {
      icon: <Cloud size={28} />,
      title: "Cloudflare",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "#2E8B57",
    },
  ];

  const aiTools = [
    {
      icon: <Brain size={28} />,
      title: "Claude Code AI",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "#8B2F8B",
    },
  ];

  return (
    <section id="tools" className="py-32 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#8B2F8B] text-sm font-medium tracking-widest uppercase">
            Infrastruktur & AI
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
            Hosting &{" "}
            <span className="text-[#2E8B57]">AI Tools</span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/50 max-w-2xl mx-auto">
            Tools infrastruktur dan kecerdasan buatan yang digunakan dalam
            operasional perusahaan.
          </p>
        </motion.div>

        {/* Hosting Tools */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-8 flex items-center gap-2">
            <Server size={20} className="text-[#8B2F8B]" />
            Tools Hosting
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {hostingTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5 hover:border-[#1A1A1A]/10 transition-all duration-500 hover:bg-[#1A1A1A]/[0.04]"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                >
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                  {tool.title}
                </h3>
                <p className="text-[#1A1A1A]/40 leading-relaxed text-sm">
                  {tool.desc}
                </p>
                <div
                  className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${tool.color}, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Tools */}
        <div>
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-8 flex items-center gap-2">
            <Brain size={20} className="text-[#2E8B57]" />
            Tools AI
          </h3>
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
            {aiTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5 hover:border-[#1A1A1A]/10 transition-all duration-500 hover:bg-[#1A1A1A]/[0.04]"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                >
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                  {tool.title}
                </h3>
                <p className="text-[#1A1A1A]/40 leading-relaxed text-sm">
                  {tool.desc}
                </p>
                <div
                  className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${tool.color}, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Kesimpulan Section ───
function KesimpulanSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kesimpulan" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B2F8B]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#2E8B57]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#8B2F8B] text-sm font-medium tracking-widest uppercase">
            Kesimpulan
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight">
            Kesimpulan &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B2F8B] to-[#2E8B57]">
              Saran
            </span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-[#2E8B57]" />
                Kesimpulan
              </h3>
              <p className="text-[#1A1A1A]/50 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                <Target size={18} className="text-[#8B2F8B]" />
                Saran
              </h3>
              <p className="text-[#1A1A1A]/50 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Team Section ───
function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Anggota 1",
      role: "Ketua Kelompok",
      nim: "Lorem Ipsum",
      image: "/team1.jpg",
    },
    {
      name: "Anggota 2",
      role: "Anggota",
      nim: "Lorem Ipsum",
      image: "/team2.jpg",
    },
    {
      name: "Anggota 3",
      role: "Anggota",
      nim: "Lorem Ipsum",
      image: "/team3.jpg",
    },
    {
      name: "Anggota 4",
      role: "Anggota",
      nim: "Lorem Ipsum",
      image: "/team4.jpg",
    },
  ];

  return (
    <section id="tim" className="py-32 bg-[#FAFAFA] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B2F8B]/3 via-transparent to-[#2E8B57]/3" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#2E8B57] text-sm font-medium tracking-widest uppercase">
            Anggota Kelompok
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
            Tim{" "}
            <span className="text-[#8B2F8B]">Kami</span>
          </h2>
          <p className="mt-6 text-[#1A1A1A]/50 max-w-2xl mx-auto">
            Kelompok yang bertanggung jawab atas laporan visitasi ini.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="relative p-6 rounded-2xl bg-[#1A1A1A]/[0.02] border border-[#1A1A1A]/5 hover:border-[#8B2F8B]/20 transition-all duration-500 text-center"
            >
              {/* Avatar Placeholder */}
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#8B2F8B]/20 to-[#2E8B57]/20 flex items-center justify-center">
                <Users size={48} className="text-[#1A1A1A]/30" />
              </div>

              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {member.name}
              </h3>
              <p className="text-[#8B2F8B] text-sm font-medium mt-1">
                {member.role}
              </p>
              <p className="text-[#1A1A1A]/40 text-xs mt-2">
                {member.nim}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="py-16 bg-[#F5F5F5] border-t border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-10 h-10">
              <Image
                src="/acmlogo.png"
                alt="Access Media Lab"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[#1A1A1A] font-bold text-lg">
              VISITASI<span className="text-[#8B2F8B]">ACM</span>
            </span>
          </div>
          <p className="text-[#1A1A1A]/40 text-sm leading-relaxed max-w-md mx-auto">
            Laporan visitasi perusahaan Access Media Lab. Tugas kelompok
            untuk mata kuliah [Nama Mata Kuliah].
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1A1A1A]/5 text-center">
          <p className="text-[#1A1A1A]/30 text-sm">
            © {new Date().getFullYear()} Kelompok Visitasi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function Home() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <ProfilSection />
      <TeknologiSection />
      <AnalisisSection />
      <ToolsSection />
      <KesimpulanSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
