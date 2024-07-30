export type listItem = {
  id: string;
  title: string;
};

export interface Link {
  id: number;
  link: string;
  description: string;
}

export interface Experience {
  id: number;
  detail: string;
}

export interface WorkItem {
  id: number;
  title: string;
  period: string;
  descript: string;
  stack: string;
  link?: Link[];
  experience?: Experience[];
}

export interface CompanyWork {
  id: number;
  company: string;
  period: string;
  works: WorkItem[];
}
