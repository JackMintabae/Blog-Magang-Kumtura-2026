# 🎨 Anak Magang - UI/UX Design Chronicles & Portfolio

Blog dokumentasi magang dan portofolio teknis untuk **UI/UX Designer**. Dibangun dengan **Astro 5**, **Tailwind CSS**, dan **Synthesized Web Audio API** (efek suara instan tanpa unduh file audio).

---

## 🚀 Fitur Unggulan

1. **Audio UX & Micro-interactions:**
   - **Klik Foto Profil:** Suara playful *bubble pop* dengan animasi *spring bounce*.
   - **Hover Kata Kunci ("Bali", "Figma"):** Suara *harmonic chime* halus.
   - **Soundboard Social Media:** Suara *chord* memuaskan saat mengklik LinkedIn, Figma, GitHub, dan Email di footer.
   - **Audio Mute/Unmute Toggle:** Dilengkapi tombol mute di header yang otomatis menyimpan preferensi ke `localStorage`.

2. **Clean Slug & Full Technical SEO:**
   - URL bersih berbasis slug: `/blog/bulan-1-audit-design-system-dan-user-flow`
   - Dynamic OpenGraph & Twitter Cards preview saat dibagikan ke media sosial.
   - Semantic HTML5 & Schema.org JSON-LD (`BlogPosting` & `ProfilePage`).

3. **Komponen Desain Khusus UI/UX:**
   - **Before/After Image Slider:** Bandingkan desain lama vs redesain baru secara interaktif.
   - **Metric Badges:** Track progress magang (durasi, jumlah screen diaudit, sesi testing).
   - **Markdown/MDX Content Collections:** Menulis artikel baru semudah membuat file `.md`.

---

## 🛠️ Cara Menjalankan di Komputer Kamu

Buka terminal dan masuk ke folder proyek:

```bash
cd "C:\Users\JACK\.gemini\antigravity\scratch\intern-blog"
```

### 1. Jalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:4321`. Setiap perubahan file akan otomatis reload (*hot-reload*).

### 2. Cara Menulis Catatan Magang Baru
Cukup buat file baru di dalam folder `src/content/blog/`, contohnya `bulan-3-design-tokens.md`:

```markdown
---
title: "Bulan 3: Menyusun Design Tokens & Validasi Desain di Tahap Staging"
description: "Pengalaman menguji langsung desain bersama developer di lingkungan staging."
publishDate: 2026-11-01
author: "Anak Magang"
role: "UI/UX Design Intern"
company: "Studio Digital Nusantara"
milestone: "Bulan 03"
readTime: "5 min read"
tags: ["UI/UX", "Design Tokens", "Staging", "Figma"]
featured: true
---

Tulis isi jurnal atau artikel magang kamu di sini menggunakan Markdown biasa...
```

Nama file tersebut otomatis akan menjadi URL slug kamu:
`/blog/bulan-3-design-tokens`

### 3. Build untuk Publikasi (Production)
```bash
npm run build
```
Hasil build ada di folder `dist/` dan siap di-deploy ke Vercel, Netlify, atau GitHub Pages secara gratis!
