import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Info = {
  id: number;
  title: string;
  icon: IconDefinition;
  url: string;
  content: string;
};

export type InfoProps = {
  info: Info;
};
