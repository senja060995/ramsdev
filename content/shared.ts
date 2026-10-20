import type { ProductId } from "./types";

/* ==========================================================================
   PLACEHOLDER — semua data yang perlu Anda ganti ada di blok ini.
   Data ini dipakai oleh versi ID (content/id.ts) dan EN (content/en.ts).
   ========================================================================== */

// GANTI: domain final situs (dipakai untuk SEO, Open Graph, sitemap.xml)
export const SITE_URL = "https://ramsdev.example.com";

// GANTI: kontak yang tampil di bagian "Bangun bersama Rams Dev."
export const CONTACT = {
  email: "info@rams.biz.web",
  whatsapp: "0823-2598-0067", // GANTI: format tampilan
  whatsappLink: "https://wa.me/6282325980067", // GANTI: hanya angka, diawali 62
};

// GANTI: tautan sosial media (hapus baris yang tidak dipakai)
export const SOCIALS: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/senja060995" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/username" }, // GANTI
  { label: "Instagram", href: "https://www.instagram.com/username" }, // GANTI
];

// GANTI (opsional): foto profil yang tampil di hero (sisi kanan, di belakang teks).
// Paling bagus berupa foto tanpa background (PNG/WebP transparan), orientasi potret.
// Taruh file di folder public/. Biarkan "" untuk menyembunyikan foto.
export const PHOTO = "/foto-rams.webp";
export const PHOTO_SIZE = { width: 680, height: 1298 }; // GANTI sesuai ukuran asli foto

// GANTI (opsional): logo tiap produk. Taruh file di public/logos/, mis. "/logos/sihub.svg".
// Biarkan "" untuk memakai ilustrasi chip bawaan.
export const PRODUCT_LOGOS: Record<ProductId, string> = {
  sidra: "", // GANTI
  sihub: "", // GANTI
  sihr: "", // GANTI
  simar: "", // GANTI
  sijek: "", // GANTI
  siweb: "", // GANTI
  printing: "", // GANTI
  next: "", // GANTI
};

// GANTI: angka di bagian "Skala". Format ribuan otomatis per bahasa (1.000 / 1,000).
// Setelah diisi data asli, ubah isPlaceholder menjadi false agar tanda kuning hilang.
export const STATS = {
  isPlaceholder: false, // true = tampilkan tanda kuning "Angka contoh"
  items: [
    { value: 12, suffix: "+" }, // GANTI: tahun pengalaman
    { value: 6, suffix: "" }, // jumlah produk software: SIDRA, SiHub, SiHR, SiMar, SiJek, SiWeb
    { value: 1000, suffix: "+" }, // GANTI: target tenant UMKM
  ],
  // GANTI: nilai bar perbandingan skala (skala logaritmik)
  bars: [1, 50, 1000],
};
