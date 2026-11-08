---
title: "Bulan Pertama di Kumtura: Hak Akses, Bug di Sebuah Label, dan Menulis Sebelum Mendesain"
description: "Sepuluh screen divalidasi dan awal sebuah prototipe. Enam momen dari bulan pertama saya sebagai UI/UX intern: dropdown yang bukan gembok, form audit, alur checkout..."
publishDate: 2026-09-01
author: "Jack Ronaldo Mintabae"
role: "UI/UX Design Intern"
company: "Kumtura Digital Solutions"
milestone: "Bulan 01"
readTime: "6 min read"
tags: ["UI/UX", "Design System", "Figma", "Heuristic Evaluation"]
featured: true
coverImage: "/images/posts/bulan-1.jpg"
ogImage: "/images/posts/bulan-1.jpg"
---

Memulai bulan pertama sebagai **UI/UX Design Intern** langsung membuka mata saya: dunia desain produk di industri nyata jauh lebih dinamis daripada sekadar membuat *dribbble-shot* yang estetik.

Pada bulan pertama ini, fokus utama saya terbagi ke dalam tiga tantangan:
1. Menyelaraskan **Design System** yang terfragmentasi.
2. Melakukan evaluasi heuristik terhadap alur checkout aplikasi klien.
3. Membiasakan diri dengan prinsip **"Menulis Sebelum Mendesain"** (*design docs first*).

---

## 1. Metrik & Hasil Bulan Pertama

Berikut ringkasan output kerja selama 4 minggu pertama:
* **42 screen** selesai diaudit menggunakan 10 Prinsip Heuristik Nielsen.
* **18 komponen utama** di Figma dirapikan ke dalam auto-layout dan variant terstandar.
* **1 sesi Design Critique** bersama tim engineering dan lead designer.
* **1 prototipe interaktif** divalidasi ke 5 partisipan internal.

---

## 2. Bug Visual yang Tersembunyi di Komponen Dropdown

Salah satu temuan paling menarik saat mengaudit form pendaftaran:

> Banyak pengguna mobile sering kali salah menekan tombol *Batal* saat ingin menutup *dropdown modal*. Ternyata, area sentuh (*touch target size*) tombol tersebut hanya berukuran 24x24px, jauh di bawah standar ergonomis minimum 48x48px (Apple HIG & Material Design 3).

### Apa yang saya perbaiki?
* Memperlebar *hitbox* menjadi 48px tanpa mengubah tampilan visualnya secara drastis.
* Mengubah warna teks *secondary* agar lolos rasio kontras minimum WCAG AA (4.5:1).

```typescript
// Token Warna Baru untuk Rasio Kontras Aksesibilitas
const DesignTokens = {
  textPrimary: '#09090b',     // Kontras 16.5:1 terhadap putih
  textSecondary: '#52525b',   // Kontras 5.8:1 (sebelumnya #a1a1aa yang hanya 2.3:1)
  touchTargetMin: '48px',     // Standar aksesibilitas mobile
};
```

---

## 3. Menulis Dokumen Desain Sebelum Buka Figma

Pelajaran paling berharga dari mentor magang saya adalah: **jangan langsung lompat ke kanvas Figma**.

Sebelum menggambar satu kotak pun, biasakan menulis satu lembar dokumen:
* **User Problem:** Siapa yang mengalami masalah, dan seberapa sering?
* **Business Goal:** Apa indikator keberhasilan desain ini (misal: *drop-off rate* turun 15%)?
* **Edge Cases:** Apa yang terjadi saat internet lambat, koneksi putus, atau data kosong (*empty state*)?

Ketika semua skenario sudah dipikirkan di atas kertas, proses wireframing di Figma jadi dua kali lebih cepat dan minim revisi dari developer!

---

## Refleksi Bulan Depan
Di bulan kedua, saya akan mulai terjun langsung ke sesi **Usability Testing** bersama pengguna asli dan mengeksplorasi animasi micro-interactions untuk kartu transaksi. Sampai jumpa di catatan bulan berikutnya!
