document.querySelectorAll('[data-nav="true"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');

    NProgress.start();

    window.location.href = href;

    NProgress.done();
  });
});
