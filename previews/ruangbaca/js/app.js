(() => {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (localStorage.getItem('ruangbaca-theme') === 'dark') {
        body.classList.add('dark');
    }

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('ruangbaca-theme', body.classList.contains('dark') ? 'dark' : 'light');
    });

    menuToggle?.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.share-button').forEach((button) => {
        button.addEventListener('click', async () => {
            const title = button.dataset.shareTitle || document.title;
            const shareData = { title, text: `Baca artikel ini di RuangBaca: ${title}`, url: window.location.href };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    button.textContent = 'Tersalin ✓';
                    setTimeout(() => { button.textContent = '↗'; }, 1800);
                }
            } catch (error) {
                // The share dialog can be closed by the user; no action is needed.
            }
        });
    });
})();
