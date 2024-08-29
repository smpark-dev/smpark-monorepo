import Image from 'next/image';

interface IProjectProps {
  project: {
    id: number;
    title: string;
    url: string;
    type: string;
    imgUrl: string;
    alt: string;
  };
}

export const Project = ({ project }: IProjectProps) => {
  const { url, imgUrl, alt, title, type } = project;

  return (
    <a
      href={url}
      className={`relative flex flex-col justify-center mb-[15px] group ${type}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image src={`/${imgUrl}`} alt={alt} className='rounded-full' width={180} height={180} />
      <div className='group-hover:opacity-0 transition-all absolute bg-black w-full h-full top-0 left-0 flex flex-col justify-center opacity-[0.8] rounded-full border border-solid border-bg-primary'>
        <h3 className='p-2 font-bold margin-0 whitespace-pre-wrap text-white'>{title}</h3>
      </div>
    </a>
  );
};
