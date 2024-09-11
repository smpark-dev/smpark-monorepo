import BitBucket from '@public/imgs/icons/bitbucket.svg';
import Circle from '@public/imgs/icons/circle.svg';
import Clean from '@public/imgs/icons/clean.svg';
import CSS3 from '@public/imgs/icons/css3.svg';
import Cypress from '@public/imgs/icons/cypress.svg';
import Docker from '@public/imgs/icons/docker.svg';
import Eslint from '@public/imgs/icons/eslint.svg';
import Express from '@public/imgs/icons/express.svg';
import FireBase from '@public/imgs/icons/firebase.svg';
import FSD from '@public/imgs/icons/fsd.svg';
import Git from '@public/imgs/icons/git.svg';
import GitHubActions from '@public/imgs/icons/githubactions.svg';
import HTML5 from '@public/imgs/icons/html5.svg';
import Java from '@public/imgs/icons/java.svg';
import JavaScript from '@public/imgs/icons/javascript.svg';
import Jest from '@public/imgs/icons/jest.svg';
import Jira from '@public/imgs/icons/jira.svg';
import JQuery from '@public/imgs/icons/jquery.svg';
import Koa from '@public/imgs/icons/koa.svg';
import MongoDB from '@public/imgs/icons/mongodb.svg';
import MySQL from '@public/imgs/icons/mysql.svg';
import NextJS from '@public/imgs/icons/nextdotjs.svg';
import NodeJS from '@public/imgs/icons/nodedotjs.svg';
import Npm from '@public/imgs/icons/npm.svg';
import Nx from '@public/imgs/icons/nx.svg';
import PostCSS from '@public/imgs/icons/postcss.svg';
import Prettier from '@public/imgs/icons/prettier.svg';
import Pug from '@public/imgs/icons/pug.svg';
import React from '@public/imgs/icons/react.svg';
import ReactQuery from '@public/imgs/icons/reactquery.svg';
import Redux from '@public/imgs/icons/redux.svg';
import StyledComponents from '@public/imgs/icons/styledcomponents.svg';
import TailwindCSS from '@public/imgs/icons/tailwindcss.svg';
import TypeScript from '@public/imgs/icons/typescript.svg';
import Webpack from '@public/imgs/icons/webpack.svg';
import Yarn from '@public/imgs/icons/yarn.svg';
import Zustand from '@public/imgs/icons/zustand.svg';

export const SKILLS = {
  TITLE: 'Skills',
  SUBTITLE: 'Tech Stack',
  LEGEND: [
    {
      ICON: Circle,
      COLOR: '#EAB308',
      TEXT: '선호 기술',
    },
    {
      ICON: Circle,
      COLOR: '#2e3642',
      TEXT: '사용 기술',
    },
  ],
  SECTIONS: [
    {
      CATEGORY: 'Languages',
      SKILLS: [
        { NAME: 'TypeScript', ICON: TypeScript, COLOR: '#3178C6', PROFICIENCY: true },
        { NAME: 'JavaScript', ICON: JavaScript, COLOR: '#F7DF1E', PROFICIENCY: true },
        { NAME: 'Java', ICON: Java, COLOR: '#007396', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Databases',
      SKILLS: [
        { NAME: 'MongoDB', ICON: MongoDB, COLOR: '#47A248', PROFICIENCY: true },
        { NAME: 'FireBase', ICON: FireBase, COLOR: '#DD2C00', PROFICIENCY: false },
        { NAME: 'MySQL', ICON: MySQL, COLOR: '#4479A1', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Backend',
      SKILLS: [
        { NAME: 'Node.js', ICON: NodeJS, COLOR: '#5FA04E', PROFICIENCY: true },
        { NAME: 'Express', ICON: Express, COLOR: '#ffffff', PROFICIENCY: true },
        { NAME: 'Koa', ICON: Koa, COLOR: 'white', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Frontend',
      SKILLS: [
        { NAME: 'React', ICON: React, COLOR: '#61DAFB', PROFICIENCY: true },
        { NAME: 'Next.js', ICON: NextJS, COLOR: '#ffffff', PROFICIENCY: true },
        { NAME: 'Zustand', ICON: Zustand, COLOR: '#764ABC', PROFICIENCY: true },
        { NAME: 'React Query', ICON: ReactQuery, COLOR: '#FF4154', PROFICIENCY: true },
        { NAME: 'Redux', ICON: Redux, COLOR: '#764ABC', PROFICIENCY: false },
        { NAME: 'JQuery', ICON: JQuery, COLOR: '#0769AD', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Styling',
      SKILLS: [
        { NAME: 'Tailwind CSS', ICON: TailwindCSS, COLOR: '#06B6D4', PROFICIENCY: true },
        { NAME: 'PostCSS', ICON: PostCSS, COLOR: '#DD3A0A', PROFICIENCY: true },
        {
          NAME: 'Styled Components',
          ICON: StyledComponents,
          COLOR: '#DB7093',
          PROFICIENCY: false,
        },
        { NAME: 'CSS3', ICON: CSS3, COLOR: '#1572B6', PROFICIENCY: false },
        { NAME: 'HTML5', ICON: HTML5, COLOR: '#E34F26', PROFICIENCY: false },
        { NAME: 'Pug', ICON: Pug, COLOR: '#A86454', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Tools',
      SKILLS: [
        { NAME: 'Nx Monorepo', ICON: Nx, COLOR: 'white', PROFICIENCY: false },
        { NAME: 'Yarn berry', ICON: Yarn, COLOR: '#2C8EBB', PROFICIENCY: false },
        { NAME: 'NPM', ICON: Npm, COLOR: '#CB3837', PROFICIENCY: false },
        { NAME: 'Git', ICON: Git, COLOR: '#F05032', PROFICIENCY: false },
        { NAME: 'Docker', ICON: Docker, COLOR: '#2496ED', PROFICIENCY: false },
        {
          NAME: 'GitHub Actions',
          ICON: GitHubActions,
          COLOR: '#2088FF',
          PROFICIENCY: false,
        },
        { NAME: 'Webpack', ICON: Webpack, COLOR: '#8DD6F9', PROFICIENCY: false },
        { NAME: 'Jira', ICON: Jira, COLOR: '#0052CC', PROFICIENCY: false },
        { NAME: 'Bitbucket', ICON: BitBucket, COLOR: '#0052CC', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Code Quality & Testing',
      SKILLS: [
        { NAME: 'ESLint', ICON: Eslint, COLOR: '#4B32C3', PROFICIENCY: false },
        { NAME: 'Prettier', ICON: Prettier, COLOR: '#F7B93E', PROFICIENCY: false },
        { NAME: 'Jest', ICON: Jest, COLOR: '#C21325', PROFICIENCY: false },
        { NAME: 'Cypress', ICON: Cypress, COLOR: '#69D3A7', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Architecture & Methodology',
      SKILLS: [
        {
          NAME: 'Clean Architecture',
          ICON: Clean,
          COLOR: 'red',
          PROFICIENCY: false,
        },
        {
          NAME: 'Feature Slice Design',
          ICON: FSD,
          PROFICIENCY: false,
        },
      ],
    },
  ],
};
