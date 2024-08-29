import Image from 'next/image';

import { URIS } from '@/shared/constant';

interface ILoadingProps {
  width: number;
  height: number;
  className?: string;
}

export const Loading = ({ width, height, className = '' }: ILoadingProps) => {
  return (
    <Image
      className={className}
      src={URIS.loading.src}
      alt={URIS.loading.alt}
      width={width}
      height={height}
      unoptimized
    />
  );
};
