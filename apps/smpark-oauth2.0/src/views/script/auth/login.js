import { checkSpace, checkSpecial } from '../utils/utils.js';

  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await loginCheck();
    });
  }

  const loginCheck = async () => {
    const id = document.getElementById('InputId').value.trim();
    const pw = document.getElementById('InputPassword').value.trim();

    if (!id) {
      alert('아이디를 입력해주세요.');
      document.getElementById('InputId').focus();
      return false;
    }
    if (!pw) {
      alert('패스워드를 입력해주세요.');
      document.getElementById('InputPassword').focus();
      return false;
    }

    if (checkSpace(id) || checkSpace(pw)) {
      alert('공백은 사용하실 수 없습니다.');
      document.getElementById('InputId').focus();
      return false;
    }
    if (checkSpecial(id)) {
      alert('특수문자는 사용하실 수 없습니다.');
      document.getElementById('InputId').focus();
      return false;
    }

    try {
      NProgress.start();
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password: pw }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.redirect) {
          window.location.replace(result.redirect);
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      NProgress.done();
    }
  };
