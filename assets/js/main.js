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
        { label: "URL Akses", value: "./swoosh/public/" },
        { label: "Email Admin", value: "admin@swoosh.test" },
        { label: "Password", value: "password" },
        { label: "Kode Rahasia Admin Baru", value: "SwooshAdmin2026" },
        { label: "Catatan User", value: "Pengunjung dapat langsung mendaftar akun baru melalui menu Registrasi untuk role User." }
      ]
    },
    techStack: ["PHP 8 Native", "MVC Architecture", "MySQL / PDO", "CSRF Protection", "Vanilla JavaScript", "CSS Modern System", "Midtrans Payment API"]
  },

  ruangbaca: {
    title: "RuangBaca — Platform Publikasi Konten & CMS Editorial (Laravel 10)",
    category: "Full-Stack Web Application • Laravel 10 Framework",
    githubRepo: "https://github.com/Alvin-Chandra1/ruangbaca",
    summary: "Website editorial artikel online modern yang memadukan kenyamanan pembaca (tipografi Playfair Display & DM Sans) dengan sistem Content Management System (CMS) terstruktur bagi author dan administrator.",
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
        { label: "URL Akses", value: "./bb/public/" },
        { label: "Akses Kelola Artikel", value: "Tersedia tombol 'Kelola Artikel' di bilah navigasi RuangBaca." },
        { label: "Fitur Interaktif", value: "Pengunjung dapat langsung membuat, mengedit, atau menghapus artikel serta mencoba toggle tema dark/light." }
      ]
    },
    techStack: ["Laravel 10", "PHP 8.1+", "Blade Templating", "MySQL", "Authentication Middleware", "Modern CSS System"]
  },

  pengaduan_sekolah: {
    title: "SuaraSekolah — Aplikasi Pengaduan & Aspirasi Siswa (Laravel 10)",
    category: "Full-Stack Web Application • Laravel 10 & DomPDF",
    githubRepo: "https://github.com/Alvin-Chandra1/pengaduan-sekolah",
    summary: "Sistem pengaduan dan aspirasi sekolah digital yang memungkinkan siswa menyampaikan keluhan serta saran fasilitas sarana prasarana sekolah secara transparan, akuntabel, dan terlacak. Dilengkapi panel verifikasi sekolah, perubahan status real-time, dan export dokumen resmi PDF.",
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
        { label: "URL Aplikasi (Frontend Siswa)", value: "./pengaduan-sekolah/public/" },
        { label: "URL Login Admin", value: "./pengaduan-sekolah/public/login" },
        { label: "Username / Email Admin", value: "admin atau admin@sekolah.sch.id" },
        { label: "Password Admin", value: "admin123" },
        { label: "Demo Pengaduan Siswa", value: "Gunakan NIS contoh: 1001 atau 1002 untuk mengajukan aspirasi di frontend." }
      ]
    },
    techStack: ["Laravel 10", "PHP 8.1+", "DomPDF", "MySQL", "Eloquent ORM", "Bootstrap 5", "FontAwesome 6"]
  },

  perpustakaan_digital: {
    title: "Perpustakaan Sekolah Digital — Sirkulasi Buku Mandiri (Laravel 10)",
    category: "Full-Stack Web Application • Standar Uji Kompetensi Junior Coder SKKNI",
    githubRepo: "https://github.com/Alvin-Chandra1/Latihan_UKK_AlvinChandra_XIIPPLG2",
    summary: "Aplikasi sirkulasi buku perpustakaan digital yang dirancang untuk mempermudah kegiatan peminjaman dan pengembalian buku secara mandiri oleh siswa anggota, serta memfasilitasi petugas perpustakaan dalam inventarisasi katalog buku dan audit transaksi sirkulasi.",
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
        { label: "URL Aplikasi (Login Tab)", value: "./perpustakaan-sekolah-digital/public/login" },
        { label: "Akun Administrator", value: "Username: admin | Password: admin123" },
        { label: "Akun Siswa Anggota", value: "Username: ahmad / siti / budi | Password: password123" },
        { label: "Registrasi Siswa Baru", value: "Tersedia fitur 'Daftar Anggota' mandiri di halaman login." }
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
  const modalActionsWrap = document.getElementById('modal-actions-wrap');

  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  const openModalByKey = (projectKey) => {
    const data = projectData[projectKey];
    if (data && modalOverlay) {
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalSummary.textContent = data.summary;

      // Arch list
      modalArchList.innerHTML = data.architecture.map(item => `
        <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
          <i class="fa-solid fa-circle-check" style="color: var(--accent-cyan); margin-top: 0.3rem;"></i>
          <span>${item}</span>
        </li>
      `).join('');

      // Credentials & Hosting notice
      let credsHTML = `
        <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
          <i class="fa-solid fa-key" style="color: var(--accent-amber);"></i> Akses & Informasi Akun Demo:
        </div>
        ${data.credentials.items.map(item => `
          <div>
            <span style="color: var(--text-dim);">${item.label}:</span>
            <strong style="color: var(--accent-cyan); margin-left: 0.35rem;">${item.value}</strong>
          </div>
        `).join('')}
      `;

      if (!isLocal) {
        credsHTML += `
          <div class="backend-notice-box" style="margin-top: 0.85rem;">
            <i class="fa-solid fa-server" style="color: var(--accent-amber); font-size: 1.15rem; margin-top: 0.2rem;"></i>
            <div>
              <strong>Informasi Backend & Database:</strong> Projek ini merupakan aplikasi Full-Stack dinamis berbasis backend PHP & database MySQL. Di hosting statis seperti GitHub Pages, aplikasi tidak dapat mengeksekusi PHP secara langsung, namun seluruh arsitektur, kode program lengkap, file database <code>.sql</code>, dan panduan instalasi dapat diakses secara transparan melalui tombol repositori GitHub di bawah ini.
            </div>
          </div>
        `;
      }

      modalCreds.innerHTML = credsHTML;

      // Tech stack tags
      modalTechTags.innerHTML = data.techStack.map(tag => `
        <span class="tech-tag" style="background: rgba(56, 189, 248, 0.1); color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.25);">${tag}</span>
      `).join('');

      // Action buttons
      if (modalActionsWrap) {
        modalActionsWrap.innerHTML = `
          <a href="${data.githubRepo}" target="_blank" class="btn btn-primary" style="flex: 1.2;">
            <i class="fa-brands fa-github"></i> Buka Source Code di GitHub
          </a>
          <a href="${data.credentials.url}" target="_blank" class="btn btn-outline" style="flex: 1;" title="${isLocal ? 'Buka di Server Lokal Laragon' : 'Membutuhkan server lokal Laragon / PHP aktif'}">
            <i class="fa-solid ${isLocal ? 'fa-play' : 'fa-laptop-code'}"></i> ${isLocal ? 'Buka di Localhost' : 'Buka di Server Lokal'}
          </a>
        `;
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Intercept launcher pills if on remote web
  document.querySelectorAll('.launcher-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      if (!isLocal) {
        e.preventDefault();
        const projectKey = pill.getAttribute('data-open-modal');
        if (projectKey) {
          openModalByKey(projectKey);
        }
      }
    });
  });

  // Intercept local-app-btn if on remote web
  document.querySelectorAll('.local-app-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!isLocal) {
        e.preventDefault();
        showToast('Aplikasi ini membutuhkan server lokal Laragon / PHP & MySQL aktif.');
        const card = btn.closest('.project-card');
        const modalBtn = card?.querySelector('[data-open-modal]');
        if (modalBtn) modalBtn.click();
      }
    });
  });

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
