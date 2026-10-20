// GANTI: email, WhatsApp, sosial media, foto, logo produk, dan angka
// dikumpulkan di content/shared.ts (dipakai bersama ID & EN).
// File ini hanya berisi teks berbahasa Indonesia.

import type { Content } from "./types";

const id: Content = {
  locale: "id",
  ogLocale: "id_ID",
  meta: {
    title: "Rams Dev — Founder & Builder",
    description:
      "Rams Dev — founder dan builder dari Semarang. Dari tinta di atas kertas ke platform di atas cloud: percetakan, software internal, dan SaaS untuk UMKM.",
  },
  a11y: {
    skip: "Lewati ke konten",
    switchLang: "Ganti bahasa ke English",
    copied: "Tersalin ke clipboard",
  },
  nav: { work: "Lihat Karya", contact: "Hubungi" },
  hero: {
    eyebrow: "Founder · Builder · Semarang",
    title: "RAMS DEV",
    tagline: "Dari tinta di atas kertas ke platform di atas cloud",
    primaryCta: "Lihat Karya",
    secondaryCta: "Hubungi",
    meta: [
      "Sidomulyo Printing & Advertising",
      "Ragam Manfaat Sinergi (Ramasi)",
      "SiHub",
      "SiMar",
      "SiJek",
    ],
  },
  statement: {
    label: "Misi",
    text: "Saya membangun sistem yang menutup jarak antara bisnis manual hari ini dan bisnis otomatis besok — dimulai dari lantai produksi percetakan sendiri, lalu dibuka untuk ribuan UMKM lain.",
  },
  scale: {
    label: "Skala Ekosistem",
    title: "Tiga tingkat kemajuan sebuah bisnis",
    intro:
      "Terinspirasi Skala Kardashev: kemajuan diukur dari seberapa banyak pekerjaan yang bisa dikendalikan oleh sistem, bukan dari seberapa besar kantornya.",
    tiers: [
      {
        level: "Tingkat I",
        title: "Menguasai produksi fisik",
        desc: "Percetakan dan advertising: mesin, tinta, bahan, dan tenggat harian. Fondasi yang mengajarkan arti operasional sesungguhnya.",
        tag: "Percetakan",
      },
      {
        level: "Tingkat II",
        title: "Mengotomatiskan bisnis sendiri",
        desc: "Software internal untuk produksi, keuangan, absensi, dan pelanggan. Setiap proses manual diubah menjadi alur yang tercatat.",
        tag: "Software internal",
      },
      {
        level: "Tingkat III",
        title: "Melayani bisnis lain lewat platform",
        desc: "Yang sudah terbukti di dalam dibuka sebagai SaaS multi-tenant untuk UMKM, tanpa mereka harus membangun dari nol.",
        tag: "SaaS untuk UMKM",
      },
    ],
  },
  builder: {
    label: "Rekam Jejak",
    title: "Saya builder. Semua ini dibangun dari dalam.",
    entities: [
      {
        name: "Sidomulyo Printing & Advertising",
        sub: "Percetakan · Semarang",
        items: [
          {
            title: "Produksi harian",
            desc: "Order cetak dan advertising berjalan setiap hari, dari file pelanggan sampai barang jadi.",
          },
          {
            title: "Alur file cetak siap-RIP",
            desc: "Standar pra-cetak yang memastikan file masuk mesin tanpa revisi berulang.",
          },
          {
            title: "Sistem resep material otomatis",
            desc: "Kebutuhan bahan dan tinta dihitung otomatis dari spesifikasi pesanan.",
          },
          {
            title: "Ekspansi pasar ke SPPG Jawa Tengah",
            desc: "Membuka pasar baru untuk kebutuhan cetak SPPG di seluruh Jawa Tengah.",
          },
        ],
      },
      {
        name: "Divisi Developer in-house",
        sub: "Tim software internal",
        items: [
          {
            title: "SIDRA: ERP menjadi SaaS multi-tenant",
            desc: "ERP internal dikembangkan menjadi SIDRA, platform multi-tenant dengan jurnal otomatis dan payment gateway per tenant.",
          },
          {
            title: "SiHub: CRM omnichannel + AI",
            desc: "Sosial media dan chat terhubung dalam satu inbox, plus AI yang membuat dan menjadwalkan postingan otomatis. Tersedia di Android dan iOS.",
          },
          {
            title: "SiHR: HR & absensi",
            desc: "Absensi dan pengelolaan karyawan dari ponsel, langsung terhubung ke sistem.",
          },
          {
            title: "Infrastruktur production dikelola sendiri",
            desc: "Server, deployment, dan pemantauan dijalankan oleh tim sendiri.",
          },
        ],
      },
      {
        name: "Ramasi",
        sub: "PT Ragam Manfaat Sinergi",
        items: [
          {
            title: "Payung platform serba otomatis",
            desc: "Wadah legal dan strategis untuk seluruh produk software dalam ekosistem.",
          },
          {
            title: "Keluarga brand “Si-”",
            desc: "SIDRA, SiHub, SiHR, SiMar, SiJek, dan SiWeb: satu bahasa nama, satu ekosistem.",
          },
        ],
      },
    ],
  },
  feature: {
    label: "Arsitektur",
    title: "Satu ekosistem dari mesin cetak sampai cloud",
    desc: "Setiap lapisan berdiri di atas lapisan di bawahnya. Data dari lantai produksi mengalir naik sampai ke platform yang dipakai bisnis lain.",
    layers: [
      { name: "Mesin Cetak", desc: "Produksi fisik, sumber data pertama" },
      { name: "SIDRA · SiHR", desc: "ERP, keuangan, absensi, dan SDM" },
      { name: "SiHub", desc: "CRM omnichannel dan AI konten" },
      { name: "SiMar · SiJek · SiWeb", desc: "Platform untuk UMKM" },
      { name: "Cloud", desc: "Infrastruktur yang dikelola sendiri" },
    ],
  },
  numbers: {
    label: "Skala",
    title: "Produksi pada skala platform",
    placeholderNote: "Angka contoh, ganti dengan data asli",
    stats: [
      { label: "Tahun pengalaman", sub: "Percetakan, advertising, dan software" },
      { label: "Produk software", sub: "Dibangun dan dijalankan in-house" },
      { label: "Target tenant UMKM", sub: "Untuk platform multi-tenant" },
    ],
    barsTitle: "Perbandingan skala",
    bars: [
      { label: "Hari ini · bisnis internal", unit: "bisnis" },
      { label: "Tahap berikutnya · tenant awal", unit: "tenant" },
      { label: "Target · tenant UMKM", unit: "tenant" },
    ],
  },
  products: {
    label: "Karya",
    title: "Produk dalam ekosistem",
    intro:
      "Setiap produk lahir dari kebutuhan nyata di lantai produksi, lalu dikembangkan agar bisa dipakai bisnis lain.",
    items: [
      {
        id: "sidra",
        name: "SIDRA",
        kind: "ERP multi-tenant",
        desc: "Jurnal akuntansi otomatis, payment gateway per tenant, dan operasional bisnis dalam satu sistem.",
        tags: ["ERP", "Multi-tenant", "Web"],
      },
      {
        id: "sihub",
        name: "SiHub",
        kind: "CRM omnichannel + AI",
        desc: "Semua sosial media dan chat dalam satu inbox. AI membuat desain dan caption, lalu memposting otomatis sesuai knowledge dan jadwal yang Anda atur.",
        tags: ["Omnichannel", "AI", "Android", "iOS"],
      },
      {
        id: "sihr",
        name: "SiHR",
        kind: "HR & absensi",
        desc: "Absensi karyawan dari ponsel dan pengelolaan SDM dengan rekap otomatis.",
        tags: ["HR", "Absensi", "Mobile"],
      },
      {
        id: "simar",
        name: "SiMar",
        kind: "Marketplace",
        desc: "Pasar digital untuk produk dan jasa UMKM, tersedia di web serta aplikasi Android dan iOS.",
        tags: ["Web", "Android", "iOS"],
      },
      {
        id: "sijek",
        name: "SiJek",
        kind: "Pengiriman",
        desc: "Layanan pengiriman untuk pesanan lokal, terhubung dengan toko di SiMar.",
        tags: ["Logistik", "Lokal"],
      },
      {
        id: "siweb",
        name: "SiWeb",
        kind: "Web perusahaan",
        desc: "Pembuatan website perusahaan yang cepat, rapi, dan mudah dikelola.",
        tags: ["Website", "Company profile"],
      },
      {
        id: "printing",
        name: "Sidomulyo Printing",
        kind: "Percetakan & advertising",
        desc: "Bisnis induk tempat semua sistem pertama kali diuji.",
        tags: ["Produksi", "CMYK"],
      },
      {
        id: "next",
        name: "…dan Selanjutnya",
        kind: "Dalam pengembangan",
        desc: "Engine desain C++, platform desain self-service, dan sistem resep material.",
        tags: ["C++", "Self-service", "R&D"],
      },
    ],
  },
  office: {
    label: "Virtual Office AI",
    title: "Kantor virtual tempat AI bekerja",
    desc: "SiPos mengirim ke SiDra, lalu data diteruskan ke SiHub, SiMar, dan SiJek. Semua hasil kembali ke SiDra. Visualisasi ini menampilkan aliran data berkelanjutan, load balancer, lima server, dan SiHub yang tetap terhubung ke semua kanal omnichannel.",
    status: "Live · 5 aplikasi · 5 server · omnichannel",
    steps: [
      { title: "SiPos → SiDra", desc: "Data dari SiPos mengalir ke SiDra sebagai pusat koordinasi ekosistem." },
      { title: "Distribusi aplikasi", desc: "SiDra meneruskan data ke SiHub, SiMar, dan SiJek. Hasilnya mengalir kembali ke SiDra." },
      { title: "Load balancer + 5 server", desc: "Visualisasi pembagian request ke lima server, dengan jalur kirim dan respons yang terus aktif." },
      { title: "Omnichannel SiHub", desc: "SiHub tetap mengirim ke WhatsApp, Instagram, Facebook, Messenger, Threads, dan Telegram." },
    ],
    roles: ["SiPos", "SiDra", "SiHub", "SiMar", "SiJek"],
    tasks: ["Mengirim transaksi", "Sinkronisasi data", "Distribusi omnichannel", "Memproses data", "Mengirim respons"],
    hub: "PUBLISH",
    board: "DATA TRAFFIC",
    knowledge: "ECOSYSTEM SYNC",
    // Logo kanal disalin dari project CRMSM (public/img) — sesuai kanal yang tersedia di SiHub
    channels: [
      { name: "WhatsApp", icon: "/channels/whatsapp.webp", color: "#19b946" },
      { name: "Instagram", icon: "/channels/instagram.webp", color: "#e1306c" },
      { name: "Facebook", icon: "/channels/facebook.webp", color: "#3b5998" },
      { name: "Messenger", icon: "/channels/messenger.webp", color: "#1684ff" },
      { name: "Threads", icon: "/channels/threads.webp", color: "#ECEFF4" },
      { name: "Telegram", icon: "/channels/telegram.svg", color: "#2aabee" },
    ],
  },
  compare: {
    label: "Perbandingan",
    title: "Biaya kerja manual vs kerja ekosistem",
    manualTitle: "Cara manual",
    manual: [
      "Pesanan dicatat di kertas dan chat pribadi",
      "Kebutuhan bahan dihitung kira-kira",
      "Absensi pakai buku, direkap di akhir bulan",
      "Jurnal keuangan diinput ulang dari nota",
      "Setiap bisnis membeli dan merakit software sendiri",
    ],
    ecoTitle: "Cara ekosistem",
    eco: [
      "Pesanan masuk ke CRM bersama, tercatat dan bisa dilacak",
      "Resep material dihitung otomatis dari spesifikasi",
      "Absensi dari aplikasi, rekap langsung jadi",
      "Jurnal terbentuk otomatis dari setiap transaksi",
      "UMKM cukup berlangganan platform yang sudah teruji",
    ],
  },
  next: {
    label: "Langkah berikutnya",
    title: "Engine desain sendiri, ditulis dalam C++",
    desc: "Alat desain yang memahami produksi cetak sejak awal: ukuran bahan, bleed, warna CMYK, dan resep material, langsung terhubung ke platform self-service.",
    points: [
      "Rendering vektor dan kurva bezier native",
      "Pratinjau separasi warna CMYK",
      "Ekspor file siap-RIP tanpa langkah manual",
    ],
  },
  cta: {
    label: "Kontak",
    title: "Bangun bersama Rams Dev.",
    desc: "Bisnis Anda masih berjalan manual? Mari bicarakan sistem yang tepat, dari lantai produksi sampai cloud.",
    emailLabel: "Email",
    waLabel: "WhatsApp",
    socialLabel: "Sosial",
    copy: "Salin",
    copied: "Tersalin",
  },
  footer: {
    copyright: "© 2026 Rams Dev · Semarang, Indonesia",
    backToTop: "Kembali ke atas",
  },
};

export default id;
