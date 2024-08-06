import React from 'react';
import Info from './Info';
import styles from './contact.module.css';
import { infos } from 'apps/smpark-space/src/app/utils/constants/portfolio/contact';
import { josefinSans } from 'apps/smpark-space/src/app/styles/font';

const Contact = () => {
  return (
    <section id='contact' className={`${styles.contact} portfolioSection`}>
      <div className={styles.title}>
        <h1 className={josefinSans.className}>Contact</h1>
      </div>
      <h2 className={josefinSans.className}>E-mail & Chatting</h2>
      <p className={`${styles.guide}`}>
        하단의 <span>아이콘</span>을 클릭하시면 각각 저의 이메일과 깃허브로 연결됩니다.
        <br />
        {/* <a href='/login' className={styles.loginButton}>
          로그인
        </a>
        후 왼쪽 하단의 <span>말풍선</span>을 클릭하시면 제가 만든 실시간 채팅 API를 통해 저와 채팅 하실 수
        있습니다. */}
        {/* <br /> */}
        감사합니다. :D
      </p>
      <div className={`${styles.container} ${josefinSans.className}`}>
        {infos.map((item) => (
          <Info key={item.id} info={item} />
        ))}
      </div>
    </section>
  );
};

export default Contact;
