import {
  checkSpace,
  addEnterKeyListener,
  copyToClipboard,
  checkArrWord,
  blankPattern,
} from '../utils/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const addEventListenerIfExists = (selector, event, callback) => {
    const element = document.getElementById(selector);
    if (element) {
      element.addEventListener(event, callback);
    }
  };

  const addChatManagerId = () => {
    const arrList = [];
    const managerId = document.getElementById('regInputSmpChatManagerId').value;
    const blank = blankPattern(managerId, '#regInputSmpChatManagerId');
    if (blank) {
      const managerIdList = document.getElementById('regListSmpChatManagerId').value;

      if (managerIdList.trim() === '') {
        arrList.push(managerId);
        document.getElementById('regListSmpChatManagerId').innerText = managerId;
        return;
      } else {
        const splitWord = managerIdList.trim().split(',');
        for (const word of splitWord) {
          if (word.trim() === managerId) {
            alert('이미 등록된 아이디 입니다.');
            return;
          } else {
            arrList.push(word.trim());
          }
        }
        arrList.push(managerId);
        const clearList = checkArrWord(arrList);

        let strList = clearList.join(',');
        strList = strList.replace(/,/g, ', ');
        document.getElementById('regListSmpChatManagerId').innerText = strList;
        document.getElementById('regInputSmpChatManagerId').value = '';
      }
    }
  };

  const removeChatManagerId = () => {
    const arrList2 = [];
    const nonFindWord = [];
    const managerId = document.getElementById('regInputSmpChatManagerId').value;
    const blank = blankPattern(managerId, '#regInputSmpChatManagerId');
    if (blank) {
      const managerIdList = document.getElementById('regListSmpChatManagerId').value;
      const splitWord = managerIdList.trim().split(',');
      for (const word of splitWord) {
        if (word.trim() === managerId) {
          nonFindWord.push(word.trim());
        } else {
          arrList2.push(word.trim());
        }
      }
      if (nonFindWord.length === 0) {
        alert('해당하는 아이디가 없습니다.');
        return;
      }
      const clearList = checkArrWord(arrList2);

      let strList = clearList.join(',');
      strList = strList.replace(/,/g, ', ');
      document.getElementById('regListSmpChatManagerId').innerText = strList;
      document.getElementById('regInputSmpChatManagerId').value = '';
    }
  };

  const generateCredentials = async (type) => {
    const userConfirmed = window.confirm('새로운 인증 정보를 생성하고 저장하시겠습니까?');

    if (!userConfirmed) {
      return;
    }

    const status = {
      client_id: type === 'id',
      client_secret: type === 'secret',
      api_key: type === 'apiKey',
    };

    try {
      const response = await fetch('/oauth/credential', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });

      const result = await response.json();
      if (response.ok) {
        document.getElementById('regInputClientId').value = result.client.client_id;
        document.getElementById('regInputClientSecret').value = result.client.client_secret;
        document.getElementById('regInputChatApiKey').value = result.client.api_key;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const oauthRegCheck = async () => {
    const ClientId = document.getElementById('regInputClientId').value.trim();
    const ClientSecret = document.getElementById('regInputClientSecret').value.trim();
    const AppName = document.getElementById('regInputAppName').value;
    const HomepageAddr = document.getElementById('regInputHomepageAddr').value.trim();
    const AuthCallbackURL = document.getElementById('regInputCallBackUrl').value.trim();

    if (!ClientId) {
      alert('클라이언트 아이디를 생성하세요.');
      return false;
    }

    if (!ClientSecret) {
      alert('클라이언트 시크릿울 생성하세요.');
      return false;
    }

    if (!AppName) {
      alert('어플리케이션 이름을 입력하세요.');
      document.getElementById('regInputAppName').focus();
      return false;
    }
    if (!HomepageAddr) {
      alert('홈페이지 주소를 입력하세요.');
      document.getElementById('regInputHomepageAddr').focus();
      return false;
    }
    if (!AuthCallbackURL) {
      alert('허가요청을 위한 콜백 주소를 입력하세요.');
      document.getElementById('regInputCallBackUrl').focus();
      return false;
    }

    const inputs = [
      { value: HomepageAddr, id: 'regInputHomepageAddr', name: '홈페이지 주소' },
      { value: AuthCallbackURL, id: 'regInputCallBackUrl', name: '콜백 URL' },
    ];

    const invalidInput = inputs.find((input) => checkSpace(input.value));

    if (invalidInput) {
      alert(`${invalidInput.name}에 공백은 사용하실 수 없습니다.`);
      document.getElementById(invalidInput.id).value = '';
      document.getElementById(invalidInput.id).focus();
      return false;
    }

    const chkReqInfo = { id: true };
    document.querySelectorAll('input[name=consent]').forEach((input) => {
      chkReqInfo[input.value] = input.checked;
    });

    const managerIdList = document.getElementById('regListSmpChatManagerId').value;
    const managerList = [];
    const splitWord = managerIdList.split(',');
    for (const word of splitWord) {
      managerList.push(word.trim());
    }

    try {
      const response = await fetch('/oauth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address_uri: HomepageAddr,
          redirect_uri: AuthCallbackURL,
          clientAllowedScopes: chkReqInfo,
          manager_list: managerList,
          application_name: AppName,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        alert('Application 등록완료!');
        window.location.replace('/');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  addEventListenerIfExists('chatManagerIdAdd', 'click', addChatManagerId);
  addEventListenerIfExists('regInputSmpChatManagerId', 'keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addChatManagerId();
    }
  });
  addEventListenerIfExists('chatManagerIdRemove', 'click', removeChatManagerId);
  addEventListenerIfExists('idCopy', 'click', () => copyToClipboard('regInputClientId'));
  addEventListenerIfExists('secretCopy', 'click', () => copyToClipboard('regInputClientSecret'));
  addEventListenerIfExists('chatApiKeyCopy', 'click', () => copyToClipboard('regInputChatApiKey'));

  const oauthLogoImage = document.querySelector('.oauth-logo-image');
  if (oauthLogoImage) {
    oauthLogoImage.addEventListener('click', () => {
      window.location.replace('/');
    });
  }

  const inputIds = ['regInputAppName', 'regInputHomepageAddr', 'regInputCallBackUrl'];
  inputIds.forEach((id) => {
    addEnterKeyListener(id, oauthRegCheck);
  });

  addEventListenerIfExists('oauthRegisterButton', 'click', oauthRegCheck);
  addEventListenerIfExists('idCreate', 'click', () => generateCredentials('id'));
  addEventListenerIfExists('secretCreate', 'click', () => generateCredentials('secret'));
  addEventListenerIfExists('chatApiKeyCreate', 'click', () => generateCredentials('apiKey'));
});
