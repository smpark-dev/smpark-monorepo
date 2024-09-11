import { CONTACT } from '@/pages/portfolio/constants';

import { Info } from './Info';

export const Contact = () => {
  return (
    <section id='contact' className='portfolioSection mt-24'>
      <div className='portfolioTitleContainer'>
        <h1 className='text-5xl font-josefin'>{CONTACT.TITLE}</h1>
      </div>
      <h2 className='text-2xl text-text leading-[25px] whitespace-pre-line mt-[60px] max-md:my-9 font-josefin'>
        {CONTACT.SUBTITLE}
      </h2>
      <p className='mt-14 mb-12 text-text font-thin leading-[25px] font-noto'>
        {CONTACT.DESCRIPTION[0]}
        <span className='text-secondary font-thin ml-1'>{CONTACT.DESCRIPTION[1]}</span>
        {CONTACT.DESCRIPTION[2]}
        <br />
        {/* <a href='/login' className={styles.loginButton}>
        로그인
      </a>
      후 왼쪽 하단의 <span className='text-secondary font-thin'>말풍선</span>을 클릭하시면 제가 만든 실시간 채팅 API를 통해 저와 채팅 하실 수
      있습니다. */}
        {/* <br /> */}
        {CONTACT.DESCRIPTION[3]}
      </p>
      <div className='justify-evenly bg-transparency-primary rounded-[15px] py-[60px] px-[50px] mt-[30px] flex max-md:py-[25px] max-md:px-[15px] max-md:flex-col max-md:mb-9 font-josefin'>
        {CONTACT.CONTACT_INFOS.map((info) => (
          <Info key={info.ID} info={info} />
        ))}
      </div>
    </section>
  );
};
