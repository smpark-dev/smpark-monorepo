import Image from 'next/image';
import { FunctionComponent, SVGProps } from 'react';

type IconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

interface IconTextPair {
  ICON: IconComponent;
  TEXT: string;
}

interface IWorkExperienceProps {
  experience: {
    EMOJI: string;
    TITLE: string;
    DESCRIPTION: string;
    TYPE: { TEXT: string; STYLE: { TYPE: string; BADGE: string; TEXT: string } };
    IMAGE?: { URI: string; ALT: string };
    PERIOD: {
      ICON: IconComponent;
      TEXT: string;
      DATE: string;
    };
    ROLE: IconTextPair & { ROLE: string };
    TEAM?: IconTextPair & { ROLE: string[] };
    KEY_POINT: IconTextPair & { WORKS: string[] };
    TECH_STACK: {
      ICON: IconComponent;
      TEXT: string;
      STACK: string[];
    };
    LINKS?: {
      ICON: IconComponent;
      TEXT: string;
      LIST: { TEXT: string; URL: string }[];
    };
  };
}

export const WorkExperience = ({ experience }: IWorkExperienceProps) => {
  const {
    EMOJI,
    TITLE,
    DESCRIPTION,
    IMAGE,
    TYPE,
    ROLE,
    TEAM,
    PERIOD,
    KEY_POINT,
    TECH_STACK,
    LINKS,
  } = experience;

  return (
    <div key={TITLE} className='my-3 flex-col p-6 flex items-center w-full bg-transparency-primary'>
      <div className='flex justify-between items-center w-full mb-4'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl mr-1'>{`${EMOJI}`}</p>
          <h3 className={`text-2xl font-bold ${TYPE.STYLE.TEXT}`}>{TITLE}</h3>
        </div>
        <p className={`px-2 py-1 rounded-full font-semibold ${TYPE.STYLE.TYPE}`}>{TYPE.TEXT}</p>
      </div>
      <p className='w-full text-left text-base mb-4'>{DESCRIPTION}</p>

      <div className='flex items-start w-full mb-4 max-lg:flex-col'>
        {IMAGE && (
          <div className='relative min-w-[500px] h-full mr-5 aspect-[1555/972] max-xl:min-w-[400px] max-lg:min-w-full 2xl:min-w-[600px]'>
            <Image fill className='object-cover' sizes='100vw' src={IMAGE.URI} alt={IMAGE.ALT} />
          </div>
        )}
        <div className='h-full max-lg:mt-6 max-lg:h-auto'>
          <div className={`flex w-full mb-3 items-center text-base ${TYPE.STYLE.TEXT}`}>
            <PERIOD.ICON className='scale-[0.7] mr-1 ' />
            <h4>{PERIOD.TEXT}</h4>
            <span className='mx-2'>:</span>
          </div>
          <p className='ml-1 mb-4 w-full text-left'>{PERIOD.DATE}</p>

          <div
            className={`flex w-full mb-3 items-center text-base font-semibold ${TYPE.STYLE.TEXT}`}
          >
            <ROLE.ICON className='scale-[0.8] mr-1 ' />
            <h4>{ROLE.TEXT}</h4>
            <span className='mx-2'>:</span>
          </div>
          <p className='ml-1 mb-4 w-full text-left'>{ROLE.ROLE}</p>

          {TEAM && (
            <div className='w-full items-center text-base max-lg:mb-0'>
              <div className={`flex w-full mb-4 items-center font-semibold ${TYPE.STYLE.TEXT}`}>
                <TEAM.ICON className='scale-[0.8] mr-1 ' />
                <h4>{TEAM.TEXT}</h4>
                <span className='mx-2'>:</span>
              </div>
              <div className='flex flex-wrap'>
                {TEAM.ROLE.map((role) => (
                  <p
                    key={role}
                    className={`${TYPE.STYLE.BADGE} text-text px-2 py-1 rounded-full mr-2 mb-2 text-sm`}
                  >
                    {role}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='w-full mb-2 items-center text-base'>
        <div className={`flex w-full mb-1 items-center font-semibold ${TYPE.STYLE.TEXT}`}>
          <KEY_POINT.ICON className='scale-[0.8] mr-1 ' />
          <h4 className=''>{KEY_POINT.TEXT}</h4>
          <span className='mx-2'>:</span>
        </div>
        <ul className='flex flex-wrap flex-col'>
          {KEY_POINT.WORKS.map((work) => (
            <li key={work} className='text-text px-2 py-1 rounded mr-2 mb-2 text-start'>
              {work}
            </li>
          ))}
        </ul>
      </div>

      <div className='w-full mb-4 text-base'>
        <div className={`flex w-full items-center mb-2 font-semibold ${TYPE.STYLE.TEXT}`}>
          <TECH_STACK.ICON className='scale-[0.8] mr-1 ' />
          <h4 className=''>{TECH_STACK.TEXT}</h4>
          <span className='mx-2'>:</span>
        </div>
        <div className='flex flex-wrap'>
          {TECH_STACK.STACK.map((stack) => (
            <p
              key={stack}
              className={`${TYPE.STYLE.BADGE} px-2 py-1 rounded-full mr-2 mb-2 text-sm `}
            >
              {stack}
            </p>
          ))}
        </div>
      </div>

      {LINKS && (
        <div className='w-full mb-4 text-base'>
          <div className={`flex w-full items-center mb-2 font-semibold ${TYPE.STYLE.TEXT}`}>
            <LINKS.ICON className='scale-[0.8] mr-1 ' />
            <h4 className=''>{LINKS.TEXT}</h4>
            <span className='mx-2'>:</span>
          </div>

          <div className='flex flex-wrap'>
            {LINKS.LIST.map((stack) => (
              <a
                key={stack.TEXT}
                href={stack.URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center bg-gray-900 text-primary px-3 py-1 rounded-full mr-2 mb-2 text-sm hover:bg-gray-700 hover:text-blue-400 transition duration-300'
              >
                {stack.TEXT}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
