interface WorkExperienceProps {
  item: {
    id: number;
    company: string;
    period: string;
    works: {
      id: number;
      title: string;
      period: string;
      description: string;
      stack: string;
      link?: {
        id: number;
        link: string;
        description: string;
      }[];
      experience?: {
        id: number;
        detail: string;
      }[];
    }[];
  };
}

export const WorkExperience = ({ item }: WorkExperienceProps) => (
  <div className='flex'>
    <div className='flex-[0.4]'>
      <h1 className='text-3xl'>{item.company}</h1>
      <p className='font-light'>{item.period}</p>
    </div>
    <ul className='flex-[0.6]'>
      {item.works &&
        item.works.map((work) => (
          <li className='text-left mb-16' key={work.id}>
            <div>
              <h1 className='text-3xl'>{work.title}</h1>
              <p className='font-light'>{work.period}</p>
            </div>
            <div className='text-base font-light'>
              <h2 className='text-text text-xl mt-7 mb-4 font-bold'>Description</h2>
              <p>{work.description}</p>
              <h3 className='text-text text-xl mt-7 mb-4 font-bold'>Work Experience</h3>
              <ul>
                {work.experience &&
                  work.experience.map((exp) => (
                    <li key={exp.id} className='p-0 list-disc text-text ml-4'>
                      <p className='text-4 font-light my-1'>{exp.detail}</p>
                    </li>
                  ))}
              </ul>
              <h4 className='text-text text-xl mt-7 mb-4 font-bold'>Tech Stack</h4>
              <p>{work.stack}</p>
              {work?.link && (
                <div>
                  <h4 className='text-text text-xl mt-7 mb-4 font-bold'>Link</h4>
                  <ul>
                    {work.link.map((link) => (
                      <li className='p-0 list-disc text-text my-1 mx-4' key={link.id}>
                        <a
                          className='text-base font-light text-primary underline'
                          href={link.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {link.description}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
    </ul>
  </div>
);
