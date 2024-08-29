import { SKILLS } from '@/pages/portfolio/constants';

export const Skills = () => {
  return (
    <section id='skills' className='portfolioSection mt-24 font-noto'>
      <div className='portfolioTitleContainer'>
        <h1 className='text-5xl font-josefin'>{SKILLS.TITLE}</h1>
      </div>
      <h2 className='mt-10 mb-[25px] text-2xl font-josefin'>{SKILLS.SUBTITLE}</h2>
      <div className='p-6 rounded-lg mb-4 bg-transparency-primary'>
        <div className='w-1/2 m-auto  flex pt-4 pb-8 items-center justify-evenly max-lg:w-3/4 max-md:w-full max-sm:flex-col max-sm:pt-2 max-sm:pb-3'>
          {SKILLS.LEGEND.map((LEGEND) => (
            <div key={LEGEND.TEXT} className='flex justify-center items-center max-sm:mb-3'>
              <LEGEND.ICON
                className='mr-2'
                color={LEGEND.COLOR}
                style={{ fill: LEGEND.COLOR }}
                width='24'
                height='24'
              />
              <p className='mr-4 font-noto'>{LEGEND.TEXT}</p>
            </div>
          ))}
        </div>
        {SKILLS.SECTIONS.map((SECTIONS) => (
          <div
            key={SECTIONS.CATEGORY}
            className='px-5 bg-transparency-primary mb-5 rounded-2xl py-4'
          >
            <h3 className='text-left font-bold text-xl font-josefin'>{SECTIONS.CATEGORY}</h3>
            <div className='flex py-5 flex-wrap pb-0'>
              {SECTIONS.SKILLS.map((SKILL) => (
                <div
                  key={SKILL.NAME}
                  className={`flex w-fit ${SKILL.PROFICIENCY ? 'bg-[#0d5b91]' : 'bg-bg-secondary'} py-[3px] px-3 items-center justify-center rounded-2xl mr-4 mb-4 whitespace-nowrap`}
                >
                  <SKILL.ICON
                    className='mr-2'
                    style={{ fill: SKILL.COLOR }}
                    width='24'
                    height='24'
                  />
                  <p className='font-josefin translate-y-[2px]'>{SKILL.NAME}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
