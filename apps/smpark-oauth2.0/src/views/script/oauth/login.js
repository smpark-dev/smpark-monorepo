import { checkSpace, checkSpecial } from '../utils/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const oauthLoginForm = document.getElementById('oauthLoginForm');

  if (oauthLoginForm) {
    oauthLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await oauthLoginCheck();
    });
  }

  // 동의하지 않을 경우 창 닫기
  document.querySelectorAll('.noAgreeButton').forEach((button) => {
    button.addEventListener('click', () => {
      window.close();
    });
  });
});

const oauthLoginCheck = async () => {
  const id = document.getElementById('oauthInputId').value;
  const pw = document.getElementById('oauthInputPassword').value;

  // 로그인 폼 빈칸 검사
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
    
  // FormData 객체를 일반 객체로 변환
  const oauthLoginForm = document.getElementById('oauthLoginForm');
  const formData = new FormData(oauthLoginForm);
  const loginData = {};

  formData.forEach((value, key) => {
    loginData[key] = value;
  });

  try {
    const response = await fetch('/oauth/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
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
  }
};
