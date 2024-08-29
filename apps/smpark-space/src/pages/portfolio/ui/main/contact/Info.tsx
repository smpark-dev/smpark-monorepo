interface IInfoProps {
  INFO: {
    ID: number;
    TITLE: string;
    ICON: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    URL: string;
    CONTENT: string;
  };
}

export const Info = ({ INFO }: IInfoProps) => {
  return (
    <div className='justify-center flex flex-col h-[220px] text-5xl'>
      <h2 className='mb-[25px] text-[28px] after:content-[""] after:relative after:block after:w-[50px] after:h-[3px] after:bg-white after:mt-[15px] after:left-1/2 after:-ml-[25px]'>
        {INFO.TITLE}
      </h2>
      <a
        className='group flex text-xl justify-between h-[125px] flex-col'
        href={INFO.URL}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='url'
      >
        <INFO.ICON
          width='48px'
          height='48px'
          viewBox='0 0 24 24'
          className='group-hover:scale-[1.2] transition-all mx-auto my-[15px]'
        />
        {INFO.CONTENT}
      </a>
    </div>
  );
};
