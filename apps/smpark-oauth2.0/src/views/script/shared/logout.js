const logoutForm = document.querySelector('.logoutForm');
if (logoutForm) {
  logoutForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    NProgress.start();

    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      NProgress.done();
    }
  });
}
