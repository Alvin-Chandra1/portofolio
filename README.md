# Portofolio Website Alvin Chandra

Website portofolio profesional dan interaktif untuk **Alvin Chandra** (Siswa SMK Cinta Kasih Tzu Chi - PPLG | Software Engineer, Web Developer, Video Editor & AI Prompter).

Dibangun secara native dan terintegrasi langsung di Laragon (`c:\laragon\www\portofolio`), menghubungkan seluruh data riwayat hidup (CV) serta projek web nyata yang telah dibangun (**Swoosh** dan **RuangBaca**).

---

## 🌟 Fitur Utama Portofolio

1. **Desain Modern & Responsif**:
   - Tampilan Cyber Glassmorphism dengan palet warna berstandar developer modern.
   - **Mode Gelap & Terang (Dark / Light Theme Switcher)** dengan penyimpanan otomatis di `localStorage`.
   - Responsive di desktop, tablet, maupun layar smartphone.

2. **Integrasi Data CV Lengkap**:
   - **Pendidikan**: SMK Cinta Kasih Tzu Chi (PPLG) dengan Nilai Rata-Rata Rapot 86,5.
   - **Pengalaman Kerja & Magang**:
     - *PT Saint Technologies Indonesia*: Front End Web Developer, Video Editor, & AI Prompter.
     - *PT Sari Tirta Group*: Content Creator, Videographer, & Video Editor (Liputan interview Hotel Mövenpick).
   - **Pengalaman Organisasi**: Cosporta 4.0 (Tim Sarana & Prasarana).
   - **Keterampilan (Hard & Soft Skills)**: PHP, Laravel, JavaScript, MySQL, HTML5/CSS3, Video Editing, AI Prompting, Manajemen Logistik & Komunikasi Interpersonal.

3. **Showcase Projek Unggulan yang Dapat Dijalankan Langsung**:
   - **Swoosh (`./swoosh/public/`)**:
     - Sistem reservasi lapangan basket berbasis **PHP Native MVC & PDO MySQL**.
     - Fitur unggulan: Deteksi bentrok jadwal di level server (*server-side collision prevention*), slot melewati tengah malam (`+1 hari`), simulasi pembayaran instan & Midtrans Snap Webhook, serta panel admin dan kalender booking.
     - Kredensial Demo: `admin@swoosh.test` / `password`.
   - **RuangBaca (`./bb/public/`)**:
     - Platform artikel editorial & CMS modern berbasis **Laravel 10 & Blade Templating**.
     - Fitur unggulan: Manajemen artikel (CRUD dengan thumbnail dan tags), filter kategori (Teknologi, Produktivitas, Desain), autentikasi multi-user, dan tipografi editorial Playfair Display & DM Sans.

4. **Interaktivitas Ekstra**:
   - **Interactive Modal**: Menampilkan detail arsitektur, keamanan query PDO/CSRF, dan akun pengujian langsung tanpa meninggalkan halaman.
   - **Aksi Cepat Kontak**: Tombol direct WhatsApp (`wa.me/6287885238486`), email (`alvinchandra333@gmail.com`), Instagram (`@alpin.tj`), dan fitur salin clipboard dengan toast notification instan.
   - **Fitur Cetak CV**: Tombol cetak CV langsung yang rapi dan terformat.

---

## 🚀 Cara Menjalankan Portofolio

1. Pastikan server Apache dan MySQL di **Laragon** sudah aktif (klik **Start All** di Laragon).
2. Buka browser dan akses alamat berikut:
   ```text
   http://localhost/portofolio/
   ```
3. Untuk menjalankan masing-masing projek secara langsung:
   - **Swoosh**: [http://localhost/portofolio/swoosh/public/](http://localhost/portofolio/swoosh/public/)
   - **RuangBaca**: [http://localhost/portofolio/bb/public/](http://localhost/portofolio/bb/public/)

---

## 📁 Struktur Direktori

```text
c:\laragon\www\portofolio\
├── index.php                <- Halaman utama website portofolio
├── README.md                <- Dokumentasi portofolio
├── assets\
│   ├── css\
│   │   └── style.css        <- Sistem desain responsif, dark/light theme, animasiglassmorphism
│   └── js\
│       └── main.js          <- Interaktivitas modal projek, theme toggle, copy clipboard, form WhatsApp
├── bb\                      <- Projek RuangBaca (Laravel 10 CMS Artikel)
│   └── public\index.php
└── swoosh\                  <- Projek Swoosh (PHP Native MVC Booking Lapangan Basket)
    └── public\index.php
```
