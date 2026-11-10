---
title: "Bulan Kedua di Kumtura: Dari Desain di Atas Kertas Menuju Prototipe Interaktif dan Uji Pengguna"
description: "Tiga belas prototipe interaktif dan arsitektur yang hidup. Enam catatan dari bulan kedua saya sebagai UI/UX intern: moderated testing, spring physics, dan design tokens..."
publishDate: 2026-10-01
author: "Jack Ronaldo Mintabae"
role: "UI/UX Design Intern"
company: "Kumtura Digital Solutions"
milestone: "Bulan 02"
readTime: "7 min read"
tags: ["UI/UX", "Usability Testing", "Prototyping", "Design Handoff"]
featured: true
coverImage: "/images/posts/bulan-2.jpg"
ogImage: "/images/posts/bulan-2.jpg"
---

Memasuki bulan kedua magang, fokus bergeser dari merapikan komponen dasar ke validasi langsung bersama pengguna. Ada kepuasan tersendiri melihat ide yang awalnya hanya coretan di buku catatan kini diuji oleh orang lain.

---

## 1. Menjalankan 5 Sesi Moderated Testing

Tantangan terbesar minggu ini adalah memimpin sesi wawancara dan pengujian tugas (*task scenarios*):

| Peserta | Completion Rate | Rata-rata Waktu | Kendala Utama |
| :--- | :--- | :--- | :--- |
| User 01 | 100% | 45 detik | Ragu pada icon 'Filter' |
| User 02 | 80% | 1 menit 12 detik | Bingung membedakan Tab vs Segment |
| User 03 | 100% | 38 detik | Lancar |
| User 04 | 100% | 52 detik | Mengharapkan konfirmasi haptic |
| User 05 | 100% | 41 detik | Lancar |

### Insight Kunci:
Ikon tanpa label teks (*label-less icon*) sering kali menjadi jebakan bagi pengguna baru. Menambahkan micro-label berukuran 11px di bawah ikon langsung meningkatkan kecepatan navigasi hingga 32%.

---

## 2. Audio & Haptic Feedback: Micro-interaction yang Bermakna

Kami bereksperimen menambahkan respons suara lembut (*sound cue*) ketika pembayaran berhasil diverifikasi. Respons suara bukan cuma untuk gaya-gayaan (*gimmick*), melainkan memberikan kepastian (*peace of mind*) instan kepada pengguna tanpa harus menunggu layar berpindah sepenuhnya.

---

## 3. Menghubungkan Jembatan Desain ke Developer (*Handoff*)

Sebelum magang, saya mengira *handoff* itu sesederhana mengirimkan tautan file Figma. Ternyata tidak! 

Agar rekan developer tidak frustrasi saat implementasi, saya melengkapi dokumen dengan:
1. **Interactive State:** default, hover, active, disabled, loading, error.
2. **Spacing & Padding Tokens:** menggunakan skala 4px/8px kelipatan genap.
3. **Empty States & Edge Cases:** ilustrasi ketika tidak ada koneksi atau riwayat transaksi kosong.

Bulan ketiga nanti akan sangat menantang karena kita akan mulai menguji desain langsung di versi *staging*!
