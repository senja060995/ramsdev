# Rams Dev — Website Portofolio

Website portofolio pribadi **Rams Dev**. Dibangun dengan Next.js (App Router, TypeScript) dan Tailwind CSS, lalu diekspor menjadi **HTML statis murni**: tanpa backend, tanpa database, tanpa admin panel.

- Dua bahasa: `/id/` (Indonesia) dan `/en/` (English). Alamat `/` otomatis dialihkan ke `/id/`.
- Animasi memakai Canvas 2D murni + IntersectionObserver. Animasi berhenti saat tidak terlihat di layar, dan menjadi gambar diam bila pengguna mengaktifkan *reduce motion*.
- SEO: metadata + Open Graph per bahasa, `sitemap.xml`, `robots.txt`, favicon monogram "RD".

## Kebutuhan

- Node.js 20 atau lebih baru
- npm

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka http://localhost:3000/id/

## Build (menghasilkan folder `out/`)

```bash
npm run build
```

Hasilnya ada di folder **`out/`**: HTML, CSS, JS, font, dan gambar yang siap diunggah ke hosting mana pun. Untuk mencoba hasil build di komputer:

```bash
npm start        # menjalankan `npx serve out` di http://localhost:3000
```

## Deploy

### Production: sihub-2 / Cloudflare Tunnel

- Domain: `https://rams.biz.id`; email kontak: `info@rams.biz.id`.
- Build: `npm ci` lalu `npm run build -- --webpack`.
- Unggah isi `out/` ke release baru di `/var/www/rams.biz.id/releases/`, lalu arahkan symlink `/var/www/rams.biz.id/current` ke release tersebut.
- Nginx menggunakan konfigurasi `deploy/nginx-rams.biz.id.conf`, mendengarkan hanya di `127.0.0.1:8088`.
- Tunnel khusus: `rams-sihub2` (`57f12fec-7e0e-44ff-ba22-06c8e7ae7302`), service server `cloudflared-rams.service`. Unit tersedia di `deploy/cloudflared-rams.service`; token connector disimpan hanya di server sebagai `/etc/cloudflared/rams.token` (root, mode 600), tidak dimasukkan ke Git. Konfigurasi hostname publik: `rams.biz.id` → **HTTP → `127.0.0.1:8088`**. HTTPS ditangani oleh Cloudflare. Connector dan route domain sudah aktif di `sihub-2`. DNS CNAME apex menunjuk ke `57f12fec-7e0e-44ff-ba22-06c8e7ae7302.cfargotunnel.com` dengan proxy Cloudflare aktif.
- Saat redeploy, pertahankan target DNS dan route tunnel ini; cukup unggah release baru dan ganti symlink `current`.
- Verifikasi lokal: `curl -I -H 'Host: rams.biz.id' http://127.0.0.1:8088/id/`. Verifikasi publik: `curl -I https://rams.biz.id/id/`.
- Rollback: arahkan symlink `current` ke release sebelumnya. Untuk perubahan konfigurasi, jalankan `sudo nginx -t` sebelum `sudo systemctl reload nginx`.

### Vercel
1. Push proyek ini ke GitHub/GitLab.
2. Di vercel.com pilih **Add New → Project**, lalu impor repositori.
3. Framework terdeteksi otomatis sebagai Next.js. Klik **Deploy**.
   Pengalihan `/` ke `/id/` sudah diatur di `vercel.json`.

### Netlify
1. **Add new site → Import an existing project**, lalu pilih repositori.
2. Build command: `npm run build`. Publish directory: `out`.
   Pengalihan `/` ke `/id/` diatur oleh file `public/_redirects`.

   Tanpa Git: jalankan `npm run build`, lalu seret folder `out/` ke halaman **Netlify Drop** (app.netlify.com/drop).

### Cloudflare Pages
1. **Workers & Pages → Create → Pages → Connect to Git**.
2. Framework preset: *None*. Build command: `npm run build`. Build output directory: `out`.
   File `_redirects` juga dibaca oleh Cloudflare Pages.

   Tanpa Git: pilih **Upload assets** dan unggah isi folder `out/`.

### Hosting biasa (cPanel, shared hosting, Nginx/Apache)
1. Jalankan `npm run build`.
2. Unggah **isi** folder `out/` (bukan foldernya) ke `public_html/` atau root situs.
3. `out/index.html` sudah berisi pengalihan otomatis ke `/id/`, jadi tidak perlu konfigurasi server tambahan.

> Situs memakai `trailingSlash: true`, sehingga setiap halaman berbentuk folder dengan `index.html` (`/id/index.html`, `/en/index.html`). Format ini aman di semua jenis hosting.

## Mengedit konten

Semua konten ada di folder `content/`. Komponen tidak perlu disentuh.

| File | Isi |
| --- | --- |
| `content/shared.ts` | **Semua placeholder** yang ditandai `// GANTI`: domain situs, email, WhatsApp, sosial media, foto, logo produk, dan angka statistik. Dipakai bersama oleh kedua bahasa. |
| `content/id.ts` | Seluruh teks berbahasa Indonesia |
| `content/en.ts` | Seluruh teks berbahasa Inggris |
| `content/types.ts` | Tipe data (struktur) konten. `id.ts` dan `en.ts` wajib mengikuti tipe ini, sehingga kesalahan ketik langsung terdeteksi saat build. |

### Daftar placeholder yang perlu diganti (`content/shared.ts`)

1. **`SITE_URL`**: domain final, misalnya `https://ramsdev.id`. Dipakai untuk Open Graph, canonical, dan `sitemap.xml`.
2. **`CONTACT`**: email, nomor WhatsApp (format tampilan), dan tautan `wa.me` (hanya angka, diawali `62`).
3. **`SOCIALS`**: tautan sosial media. Hapus baris yang tidak dipakai.
4. **`PHOTO`** dan **`PHOTO_SIZE`**: foto di sisi kanan hero, saat ini `public/foto-rams.webp` (tanpa background, 680×1298). Untuk mengganti, simpan foto potret transparan (PNG/WebP) di `public/`, isi path-nya, dan sesuaikan `PHOTO_SIZE` dengan ukuran aslinya. Isi `""` untuk menyembunyikan foto.
5. **`PRODUCT_LOGOS`** (opsional): simpan logo di `public/logos/`, misalnya `public/logos/sihub.svg`, lalu isi `"/logos/sihub.svg"`. Bila dikosongkan, kartu memakai ilustrasi chip bawaan.
6. **`STATS`**: angka di bagian "Skala" (tahun pengalaman, jumlah produk, target tenant) dan nilai bar perbandingan. Setelah diisi data asli, **ubah `isPlaceholder` menjadi `false`** agar tanda kuning bergaris putus-putus ("Angka contoh, ganti dengan data asli") hilang.

Label angka (mis. "Tahun pengalaman") ada di `numbers.stats` dan `numbers.bars` di file bahasa masing-masing, dengan urutan yang sama seperti di `STATS`.

### Menambah atau mengubah produk
Edit array `products.items` di `content/id.ts` **dan** `content/en.ts`. Kolom `id` menentukan ilustrasi chip dan warna aksennya. Pilihan yang tersedia: `sidra`, `sihub`, `sihr`, `simar`, `sijek`, `siweb`, `printing`, `next`.

## Struktur folder

```
app/
  (root)/            halaman "/" → pengalihan ke /id/
  [lang]/
    layout.tsx       font, metadata SEO & Open Graph per bahasa
    page.tsx         urutan seluruh section
    og.png/route.tsx gambar Open Graph per bahasa (dibuat saat build)
  globals.css        warna, font, animasi reveal
  sitemap.ts, robots.ts
components/
  canvas/            animasi Canvas 2D (halftone hero, tumpukan lapisan, grid bezier)
  sections/          tiap bagian halaman (Hero, Statement, ... Cta)
  Navbar.tsx, Footer.tsx, CopyButton.tsx, RevealObserver.tsx, ui.tsx
content/             SEMUA teks & data (lihat di atas)
public/              favicon.svg, _redirects, dan aset Anda (foto, logo)
```

## Identitas visual

| Token | Warna |
| --- | --- |
| Latar | `#04060A` |
| Panel | `#0B0F16` |
| Garis | `#1C2330` |
| Teks | `#ECEFF4` |
| Teks sekunder | `#8A93A3` |
| Cyan | `#3FC8E8` |
| Magenta | `#E0489A` |
| Kuning | `#F2C94C` |

Font: Archivo (judul, sumbu lebar `wdth` 125), Instrument Sans (isi), JetBrains Mono (label). Warna didefinisikan di `app/globals.css` (`@theme`).
