import { WORK } from '@/pages/portfolio/constants';

import { WorkExperience } from './WorkExperience';

export const Work = () => (
  <section id='work' className='portfolioSection mt-24 font-noto'>
    <div className='portfolioTitleContainer'>
      <h1 className='text-5xl font-josefin'>{WORK.TITLE}</h1>
    </div>
    <h2 className='mt-8 mb-[25px] text-xl font-josefin'>{WORK.SUBTITLE}</h2>

    <div className='py-3 px-6 rounded-lg mb-4 bg-transparency-primary flex flex-wrap'>
      {WORK.EXPERIENCE.map((exp) => (
        <WorkExperience key={exp.TITLE} experience={exp} />
      ))}
    </div>
  </section>
);
