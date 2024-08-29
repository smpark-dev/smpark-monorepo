import { WORK } from '@/pages/portfolio/constants';
import { ToggleArrow } from '@/shared/ui';

import { Project } from './Project';
import { WorkExperience } from './WorkExperience';

export const Work = () => (
  <section id='work' className='portfolioSection mt-24 font-josefin'>
    <div className='portfolioTitleContainer'>
      <h1 className='text-5xl font-josefin'>{WORK.TITLE}</h1>
    </div>
    <p className='mt-5 mb-24 text-base text-line font-noto'>{WORK.DESCRIPTION}</p>

    <div className='p-6 rounded-lg mb-4 bg-transparency-primary'>
      {/* {WORK.EXPERIENCE.map((PROJECT) => (
        <div key={PROJECT.TITLE}>

        </div>
      ))} */}
    </div>
    {/* <ToggleArrow title='Project(2024)' toggleDefault>
      <div className='flex flex-wrap justify-around'>
        <h2 className='w-full mt-5 mb-11 text-3xl'>{WORK.portfolio_title}</h2>
        {WORK.portfolio_list.map((item) => (
          <Project key={item.id} project={item} />
        ))}
      </div>
    </ToggleArrow>

    <ToggleArrow title='Work Experience' toggleDefault>
      <div className='mt-5'>
        {WORK.work_list.map((item) => (
          <WorkExperience key={item.id} item={item} />
        ))}
      </div>
    </ToggleArrow> */}
  </section>
);
