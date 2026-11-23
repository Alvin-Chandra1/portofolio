/**
 * Alvin Chandra - Developer Portfolio Scripts
 * High-performance, clean, modular Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initNavbarScroll();
  initActiveNavOnScroll();
  initProjectFilters();
  initProjectModals();
  initCvModal();
  initSkillBarAnimation();
  initCopyButtons();
  initContactForm();
  initBackToTop();
  initCurrentYear();
});

function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('alvin_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeIcon, currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('alvin_portfolio_theme', newTheme);
      updateThemeIcon(themeIcon, newTheme);
      showToast(`Tema dialihkan ke mode ${newTheme === 'dark' ? 'gelap 🌙' : 'terang ☀️'}`);
    });
  }
}

function updateThemeIcon(iconElement, theme) {
  if (!iconElement) return;
  if (theme === 'dark') {
    iconElement.className = 'fa-solid fa-moon';
  } else {
    iconElement.className = 'fa-solid fa-sun';
  }
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburgerBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close when clicking any nav item
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

/* ==========================================================================
   NAVBAR SCROLL SHADOW
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   ACTIVE NAVIGATION ON SCROLL
   ========================================================================== */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT MODALS (DATA & LOGIC FOR 4 PROJECTS)
   ========================================================================== */
const projectData = {
  swoosh: {
    title: "Swoosh — Sistem Reservasi Lapangan Basket Terpadu (PHP Native MVC)",
    category: "Full-Stack Web Application • Native PHP 8 MVC Architecture",
    githubRepo: "https://github.com/Alvin-Chandra1/swoosh-new",
    summary: "Aplikasi reservasi lapangan basket dengan arsitektur PHP Native MVC modern tanpa dependency framework eksternal. Dirancang untuk menangani operasional pemesanan secara end-to-end dengan fokus utama pada pencegahan double-booking di sisi server dan integrasi alur pembayaran fleksibel.",
    uiPreviewHTML: `
      <div class="preview-window">
        <div class="preview-window-bar">
          <div class="preview-window-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>
          <span class="preview-window-url">https://swoosh-arena.app/booking/court-1</span>
          <span class="badge badge-emerald" style="font-size:0.65rem; padding:1px 6px;">PHP MVC Demo</span>
        </div>
        <div class="preview-window-content">
          <div class="preview-ui-header">
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:#fff;"><i class="fa-solid fa-basketball" style="color:#f97316;"></i> Swoosh Sports Arena</div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Jadwal Sewa Lapangan Basket Terpadu • Server-Side Lock Active</div>
            </div>
            <span class="badge badge-amber" style="font-size:0.75rem;"><i class="fa-solid fa-calendar-day"></i> Hari Ini</span>
          </div>
          <div class="preview-ui-grid">
            <div class="preview-ui-box">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#fff; font-size:0.85rem;">16:00 - 17:00</strong>
                <span style="color:#34d399; font-size:0.75rem; font-weight:700;">Tersedia</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Tarif: Rp 150.000 / Jam</div>
            </div>
            <div class="preview-ui-box highlight">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:var(--accent-cyan); font-size:0.85rem;">17:00 - 18:00</strong>
                <span style="color:var(--accent-cyan); font-size:0.75rem; font-weight:700;">Slot Dipilih</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Lapangan Utama (Indoor Parquet)</div>
            </div>
            <div class="preview-ui-box" style="opacity:0.65; border-color:rgba(239,68,68,0.4);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#f87171; font-size:0.85rem;">18:00 - 20:00</strong>
                <span style="color:#f87171; font-size:0.75rem; font-weight:700;">Dibooking</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Pencegahan Bentrok Aktif</div>
            </div>
            <div class="preview-ui-box">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#fff; font-size:0.85rem;">23:00 - 01:00 <span style="color:#38bdf8; font-size:0.7rem;">(+1 hari)</span></strong>
                <span style="color:#34d399; font-size:0.75rem; font-weight:700;">Midnight Open</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Slot Lintas Hari Terverifikasi</div>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.9rem; background:rgba(0,0,0,0.3); border-radius:8px; font-size:0.85rem;">
            <span>Alur Transaksi: <strong style="color:#34d399;">Simulasi Midtrans API Siap</strong></span>
            <span style="font-family:var(--font-mono); font-weight:700; color:#fff;">Total: Rp 150.000</span>
          </div>
        </div>
      </div>
    `,
    architecture: [
      "Arsitektur Model-View-Controller (MVC) murni dengan front-controller pattern di <code>public/index.php</code>.",
      "Database MySQL menggunakan <code>PDO Prepared Statements</code> untuk perlindungan penuh terhadap kerentanan SQL Injection.",
      "Server-side double-booking lock: Memvalidasi ketersediaan jam operasional dan bentrok jadwal sebelum penyimpanan transaksi ke database.",
      "Dukungan booking melewati tengah malam dengan slot dinamis bertanda <code>(+1 hari)</code>.",
      "Payment Gateway Simulation: Mode simulasi pembayaran instan dan kompatibel dengan Midtrans Snap Webhook."
    ],
    credentials: {
      url: "./swoosh/public/",
      demoType: "login",
      items: [
        { label: "Repositori GitHub", value: "github.com/Alvin-Chandra1/swoosh-new" },
        { label: "Email Admin Demo", value: "admin@swoosh.test" },
        { label: "Password Admin", value: "password" },
        { label: "Kode Rahasia Admin Baru", value: "SwooshAdmin2026" }
      ]
    },
    techStack: ["PHP 8 Native", "MVC Architecture", "MySQL / PDO", "CSRF Protection", "Vanilla JavaScript", "CSS Modern System", "Midtrans Payment API"]
  },

  ruangbaca: {
    title: "RuangBaca — Platform Publikasi Konten & CMS Editorial (Laravel 10)",
    category: "Full-Stack Web Application • Laravel 10 Framework",
    githubRepo: "https://github.com/Alvin-Chandra1/ruangbaca",
    summary: "Website editorial artikel online modern yang memadukan kenyamanan pembaca (tipografi Playfair Display & DM Sans) dengan sistem Content Management System (CMS) terstruktur bagi author dan administrator.",
    uiPreviewHTML: `
      <div class="preview-window">
        <div class="preview-window-bar">
          <div class="preview-window-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>
          <span class="preview-window-url">https://ruangbaca.dev/articles/clean-architecture</span>
          <span class="badge badge-purple" style="font-size:0.65rem; padding:1px 6px;">Laravel 10 CMS</span>
        </div>
        <div class="preview-window-content">
          <div class="preview-ui-header">
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:#fff;"><i class="fa-solid fa-book-open-reader" style="color:var(--accent-cyan);"></i> RuangBaca Magazine</div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Platform Editorial Konten &amp; Publikasi Digital</div>
            </div>
            <div style="display:flex; gap:0.4rem;">
              <span class="tech-tag" style="font-size:0.7rem;">Teknologi</span>
              <span class="tech-tag" style="font-size:0.7rem;">Produktivitas</span>
            </div>
          </div>
          <div style="background:linear-gradient(135deg, rgba(56,189,248,0.1), rgba(168,85,247,0.1)); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
            <span class="badge badge-cyan" style="font-size:0.7rem; margin-bottom:0.4rem;">Artikel Unggulan</span>
            <h4 style="color:#fff; font-size:1rem; font-weight:700; margin-bottom:0.35rem;">Membangun Arsitektur Web Modern yang Efisien &amp; Terstruktur</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;">Penerapan pola MVC, pemisahan logika bisnis (Business Logic), dan pengamanan database menggunakan query berparameter.</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.6rem; font-size:0.75rem; color:var(--text-dim);">
              <span><i class="fa-regular fa-user"></i> Penulis: Alvin Chandra</span>
              <span><i class="fa-regular fa-clock"></i> 5 Menit Baca</span>
            </div>
          </div>
        </div>
      </div>
    `,
    architecture: [
      "Dibangun di atas <code>Laravel 10</code> dengan arsitektur MVC dan route RESTful yang terstruktur.",
      "Sistem Autentikasi Pengguna & Admin terintegrasi dengan proteksi route middleware.",
      "Full CRUD Artikel: Pengelolaan artikel lengkap dengan unggah thumbnail gambar cover, sistem tags, dan excerpt cuplikan.",
      "Filter & Kategorisasi Pintar: Menyaring artikel berdasarkan topik (Teknologi, Produktivitas, UI/UX Desain).",
      "Dynamic Light & Dark Theme Switcher yang tersimpan di sesi peramban."
    ],
    credentials: {
      url: "./bb/public/",
      demoType: "info",
      items: [
        { label: "Repositori GitHub", value: "github.com/Alvin-Chandra1/ruangbaca" },
        { label: "Akses Kelola Artikel", value: "Tersedia modul dashboard artikel & moderasi kategori." },
        { label: "Status Stack", value: "Laravel 10 MVC • Blade Engine • MySQL Database" }
      ]
    },
    techStack: ["Laravel 10", "PHP 8.1+", "Blade Templating", "MySQL", "Authentication Middleware", "Modern CSS System"]
  },

  pengaduan_sekolah: {
    title: "SuaraSekolah — Aplikasi Pengaduan & Aspirasi Siswa (Laravel 10)",
    category: "Full-Stack Web Application • Laravel 10 & DomPDF",
    githubRepo: "https://github.com/Alvin-Chandra1/pengaduan-sekolah",
    summary: "Sistem pengaduan dan aspirasi sekolah digital yang memungkinkan siswa menyampaikan keluhan serta saran fasilitas sarana prasarana sekolah secara transparan, akuntabel, dan terlacak. Dilengkapi panel verifikasi sekolah, perubahan status real-time, dan export dokumen resmi PDF.",
    uiPreviewHTML: `
      <div class="preview-window">
        <div class="preview-window-bar">
          <div class="preview-window-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>
          <span class="preview-window-url">https://suarasekolah.sch.id/tiket/ASP-2026-089</span>
          <span class="badge badge-emerald" style="font-size:0.65rem; padding:1px 6px;">DomPDF Integrated</span>
        </div>
        <div class="preview-window-content">
          <div class="preview-ui-header">
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:#fff;"><i class="fa-solid fa-bullhorn" style="color:#10b981;"></i> SuaraSekolah — Portal Pengaduan Siswa</div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Sistem Pelaporan Sarana Prasarana Sekolah Terverifikasi</div>
            </div>
            <span class="badge badge-amber" style="font-size:0.75rem;"><i class="fa-solid fa-spinner fa-spin"></i> Status: Proses</span>
          </div>
          <div class="preview-ui-grid">
            <div class="preview-ui-box">
              <span style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase;">Nomor Tiket</span>
              <strong style="color:var(--accent-cyan); font-family:var(--font-mono); font-size:0.85rem;">#ASP-2026-089</strong>
            </div>
            <div class="preview-ui-box">
              <span style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase;">Identitas Pelapor</span>
              <strong style="color:#fff; font-size:0.85rem;">NIS: 1001 (Alvin Chandra)</strong>
            </div>
            <div class="preview-ui-box">
              <span style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase;">Lokasi Fasilitas</span>
              <strong style="color:#fff; font-size:0.85rem;">Lab Komputer 3 - PPLG</strong>
            </div>
          </div>
          <div style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:8px; padding:0.85rem;">
            <div style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700; margin-bottom:0.25rem;"><i class="fa-solid fa-comment-dots"></i> Tanggapan Resmi Sekolah:</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">"Keluhan mengenai perbaikan terminal kabel LAN telah diterima dan sedang dikerjakan oleh teknisi Sarpras hari ini."</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.785rem; color:var(--text-dim);">
            <span><i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> Format Dokumen Resmi: PDF Kop Surat</span>
            <span style="color:var(--accent-cyan); font-weight:600;"><i class="fa-solid fa-shield-halved"></i> Terverifikasi Sistem</span>
          </div>
        </div>
      </div>
    `,
    architecture: [
      "Model & Relasi Database Eloquent lengkap: <code>Siswa</code>, <code>Kategori</code>, <code>InputAspirasi</code>, <code>Aspirasi</code>, dan <code>User</code> (Admin).",
      "Fitur Export PDF Resmi: Penerbitan Rekap Laporan PDF lengkap dengan kop surat sekolah dan tanda tangan pengesahan (<code>/admin/aspirasi/export/pdf</code>).",
      "Fitur Export Tiket PDF: Siswa dan admin dapat mengunduh bukti tanda terima sah pengaduan lengkap dengan nomor tiket dan feedback sekolah (<code>/aspirasi/{id}/pdf</code>).",
      "Validasi NIS Terdaftar: Sistem memvalidasi keabsahan nomor induk siswa sebelum form aspirasi dapat diajukan.",
      "Tracking Status Real-Time: Alur penanganan aspirasi yang jelas mulai dari status <code>Menunggu</code> &rarr; <code>Proses</code> &rarr; <code>Selesai</code>."
    ],
    credentials: {
      url: "./pengaduan-sekolah/public/",
      demoType: "login",
      items: [
        { label: "Repositori GitHub", value: "github.com/Alvin-Chandra1/pengaduan-sekolah" },
        { label: "Akun Admin Pengujian", value: "Username: admin | Password: admin123" },
        { label: "Akun Siswa", value: "Gunakan NIS: 1001 atau 1002" }
      ]
    },
    techStack: ["Laravel 10", "PHP 8.1+", "DomPDF", "MySQL", "Eloquent ORM", "Bootstrap 5", "FontAwesome 6"]
  },

  perpustakaan_digital: {
    title: "Perpustakaan Sekolah Digital — Sirkulasi Buku Mandiri (Laravel 10)",
    category: "Full-Stack Web Application • Standar Uji Kompetensi Junior Coder SKKNI",
    githubRepo: "https://github.com/Alvin-Chandra1/perpustakaan-sekolah-digital",
    summary: "Aplikasi sirkulasi buku perpustakaan digital yang dirancang untuk mempermudah kegiatan peminjaman dan pengembalian buku secara mandiri oleh siswa anggota, serta memfasilitasi petugas perpustakaan dalam inventarisasi katalog buku dan audit transaksi sirkulasi.",
    uiPreviewHTML: `
      <div class="preview-window">
        <div class="preview-window-bar">
          <div class="preview-window-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>
          <span class="preview-window-url">https://perpustakaan.sch.id/siswa/dashboard</span>
          <span class="badge badge-purple" style="font-size:0.65rem; padding:1px 6px;">SKKNI FR.IA.02</span>
        </div>
        <div class="preview-window-content">
          <div class="preview-ui-header">
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:#fff;"><i class="fa-solid fa-book-bookmark" style="color:#a855f7;"></i> Perpustakaan Sekolah Digital</div>
              <div style="font-size:0.75rem; color:var(--text-dim);">Sistem Sirkulasi Mandiri &amp; Manajemen Katalog Buku</div>
            </div>
            <span class="badge badge-emerald" style="font-size:0.75rem;"><i class="fa-solid fa-id-card"></i> Anggota Aktif</span>
          </div>
          <div class="preview-ui-grid">
            <div class="preview-ui-box highlight">
              <span style="font-size:0.7rem; color:var(--accent-cyan); text-transform:uppercase; font-weight:700;">Buku Sedang Dipinjam</span>
              <strong style="color:#fff; font-size:0.825rem;">Clean Code: Handbook of Agile</strong>
              <span style="font-size:0.725rem; color:var(--text-dim);">Jatuh Tempo: 7 Hari Lagi</span>
            </div>
            <div class="preview-ui-box">
              <span style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Katalog Tersedia</span>
              <strong style="color:#fff; font-size:0.825rem;">Mastering Laravel 10</strong>
              <span style="font-size:0.725rem; color:#34d399;">Stok: 5 Eksemplar</span>
            </div>
            <div class="preview-ui-box">
              <span style="font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Status Kuota Pinjam</span>
              <strong style="color:#fff; font-size:0.825rem;">1 dari Maks. 3 Buku</strong>
              <span style="font-size:0.725rem; color:var(--text-dim);">Sirkulasi Tertib</span>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.9rem; background:rgba(0,0,0,0.3); border-radius:8px; font-size:0.825rem;">
            <span><i class="fa-solid fa-user-graduate"></i> Siswa: <strong>Alvin Chandra</strong> (XII PPLG)</span>
            <span style="color:#a855f7; font-weight:700;">Role Guard: Siswa (Anggota)</span>
          </div>
        </div>
      </div>
    `,
    architecture: [
      "Standarisasi 8 Unit Kompetensi SKKNI Pemrogram Junior (Junior Coder FR.IA.02) dengan pola Model-View-Controller.",
      "Dual-Role Authentication: Pemisahan alur kerja dan hak akses antara Administrator (Petugas) dan Siswa (Anggota).",
      "Sirkulasi Peminjaman Mandiri: Perhitungan otomatis tanggal jatuh tempo pengembalian serta limitasi kuota maksimal 3 buku untuk menjaga ketertiban sirkulasi.",
      "Pengembalian Buku Cepat: Update status otomatis dan pengembalian stok unit fisik buku ke database secara real-time.",
      "Manajemen Data Master: CRUD Data Buku, Kategori, Transaksi, dan Pendaftaran Akun Siswa Mandiri."
    ],
    credentials: {
      url: "./perpustakaan-sekolah-digital/public/",
      demoType: "login",
      items: [
        { label: "Repositori GitHub Resmi", value: "github.com/Alvin-Chandra1/perpustakaan-sekolah-digital" },
        { label: "Akun Administrator", value: "Username: admin | Password: admin123" },
        { label: "Akun Siswa Anggota", value: "Username: ahmad / siti / budi | Password: password123" }
      ]
    },
    techStack: ["Laravel 10", "PHP 8.1+", "MySQL 8.0", "Eloquent ORM", "Bootstrap 5.3", "FontAwesome 6", "Unit Testing Ready"]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalSummary = document.getElementById('modal-summary');
  const modalArchList = document.getElementById('modal-arch-list');
  const modalCreds = document.getElementById('modal-creds');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const modalUiPreview = document.getElementById('modal-ui-preview');
  const modalActionsWrap = document.getElementById('modal-actions-wrap');

  const openModalByKey = (projectKey) => {
    const data = projectData[projectKey];
    if (data && modalOverlay) {
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalSummary.textContent = data.summary;

      // Render realistic UI Preview
      if (modalUiPreview) {
        modalUiPreview.innerHTML = data.uiPreviewHTML || '';
      }

      // Arch list
      modalArchList.innerHTML = data.architecture.map(item => `
        <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
          <i class="fa-solid fa-circle-check" style="color: var(--accent-cyan); margin-top: 0.3rem;"></i>
          <span>${item}</span>
        </li>
      `).join('');

      // Credentials & GitHub link
      modalCreds.innerHTML = `
        <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
          <i class="fa-solid fa-key" style="color: var(--accent-amber);"></i> Akses & Informasi Akun Demo:
        </div>
        ${data.credentials.items.map(item => `
          <div>
            <span style="color: var(--text-dim);">${item.label}:</span>
            <strong style="color: var(--accent-cyan); margin-left: 0.35rem;">${item.value}</strong>
          </div>
        `).join('')}
        <div class="backend-notice-box" style="margin-top: 0.85rem;">
          <i class="fa-brands fa-github" style="color: var(--accent-cyan); font-size: 1.25rem; margin-top: 0.15rem;"></i>
          <div>
            <strong>Akses Kode Sumber & Database di GitHub:</strong> Seluruh kode program, arsitektur MVC/Laravel, skema database <code>.sql</code>, dan dokumentasi instalasi projek ini tersedia secara terbuka dan dapat ditinjau langsung melalui repositori GitHub resmi kami di bawah ini.
          </div>
        </div>
      `;

      // Tech stack tags
      modalTechTags.innerHTML = data.techStack.map(tag => `
        <span class="tech-tag" style="background: rgba(56, 189, 248, 0.1); color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.25);">${tag}</span>
      `).join('');

      // Action buttons - Direct to GitHub
      if (modalActionsWrap) {
        modalActionsWrap.innerHTML = `
          <a href="${data.githubRepo}" target="_blank" class="btn btn-primary" style="flex: 1; justify-content: center; padding: 0.85rem 1.5rem; font-size: 1rem;">
            <i class="fa-brands fa-github" style="font-size: 1.15rem;"></i> Buka Repositori Kode Sumber di GitHub
          </a>
        `;
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-open-modal');
      openModalByKey(projectKey);
    });
  });

  const closeModal = () => {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CV PREVIEW MODAL
   ========================================================================== */
function initCvModal() {
  const cvModal = document.getElementById('cv-modal');
  const closeBtn = document.getElementById('cv-modal-close-btn');
  const previewBtns = document.querySelectorAll('[data-preview-cv]');

  if (!cvModal) return;

  const openCvModal = (e) => {
    if (e) e.preventDefault();
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCvModal = () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  previewBtns.forEach(btn => {
    btn.addEventListener('click', openCvModal);
  });

  closeBtn?.addEventListener('click', closeCvModal);
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCvModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) {
      closeCvModal();
    }
  });
}

/* ==========================================================================
   SKILL BAR ANIMATION
   ========================================================================== */
function initSkillBarAnimation() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let animated = false;

  const triggerAnimation = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85 && !animated) {
      skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
      });
      animated = true;
    }
  };

  window.addEventListener('scroll', triggerAnimation);
  triggerAnimation(); // Check on load
}

/* ==========================================================================
   COPY TO CLIPBOARD
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || textToCopy;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`"${label}" berhasil disalin ke clipboard! 📋`);
      }).catch(() => {
        showToast(`Gagal menyalin teks`);
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM DISPATCH (WHATSAPP INTEGRATION)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim() || 'Peluang Kerjasama';
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Harap isi semua kolom formulir.');
      return;
    }

    const textMessage = `Halo Alvin Chandra,\n\nNama: ${name}\nEmail: ${email}\nPerihal: ${subject}\n\nPesan:\n${message}`;
    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://wa.me/6287885238486?text=${encodedText}`;

    showToast('Membuka WhatsApp untuk mengirim pesan... 🚀');
    window.open(waUrl, '_blank');
    form.reset();
  });
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}
