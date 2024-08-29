import { ABOUT } from '@/pages/portfolio/constants';

const getColorForIndex = (index: number): string => {
  const colors = ['yellow', 'forestGreen', 'red', 'gray', 'paleTurquoise', 'dodgerBlue'];
  return colors[index % colors.length];
};

export const About = () => (
  <section id='about' className='portfolioSection mt-24'>
    <div className='portfolioTitleContainer'>
      <h1 className='text-5xl font-josefin'>{ABOUT.TITLE}</h1>
    </div>

    <div className='mt-[60px] font-noto max-md:text-sm'>
      {ABOUT.DESCRIPTION.map((SECTION, index) => {
        return (
          <div key={SECTION.TITLE} className='bg-transparency-primary p-6 rounded-lg mb-4'>
            <div className='flex items-center mb-4'>
              <SECTION.ICON color={getColorForIndex(index)} />
              <h2 className='text-2xl font-semibold ml-2'>{SECTION.TITLE}</h2>
            </div>
            {typeof SECTION.CONTENT === 'string' ? (
              <p className='text-gray-300 text-left'>{SECTION.CONTENT}</p>
            ) : (
              <div className='text-gray-300'>
                {Object.entries(SECTION.CONTENT).map(([key, value]) => (
                  <div key={key} className='flex mb-2 text-left'>
                    <strong className='flex min-w-[4.5rem] justify-between'>
                      {key}
                      <span>-</span>
                    </strong>
                    <p className='ml-4'>{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
);
