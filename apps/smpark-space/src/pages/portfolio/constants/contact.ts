import AtSign from '@public/imgs/icons/at-sign.svg';
import Github from '@public/imgs/icons/github.svg';

export const CONTACT = {
  TITLE: 'Contact',
  SUBTITLE: 'E-mail & Chatting',
  DESCRIPTION: [
    '하단의',
    '아이콘',
    '을 클릭하시면 각각 저의 이메일과 깃허브로 연결됩니다.',
    '감사합니다. :D',
  ],
  CONTACT_INFOS: [
    {
      ID: 1,
      TITLE: 'E-mail Address',
      ICON: AtSign,
      URL: 'mailto:smpark7723@gmail.com',
      CONTENT: 'smpark7723@gmail.com',
    },
    {
      ID: 2,
      TITLE: 'GitHub Link',
      ICON: Github,
      URL: 'https://github.com/smpark-dev',
      CONTENT: 'github.com/smpark-dev',
    },
  ],
};
