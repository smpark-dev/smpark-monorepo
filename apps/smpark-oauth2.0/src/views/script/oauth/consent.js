const consentForm = document.querySelector('.consentForm');
if (consentForm) {
  consentForm.addEventListener('submit', function (e) {
    NProgress.start();
  });
}
