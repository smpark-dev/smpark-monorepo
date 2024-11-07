export const HOME = {
  ID: 'home',
  TITLE: "smpark's portfolio",
  WELCOME_MESSAGE: ['우리는 홀로 빛나면서', '동시에 다 같이 빛난다'],
  IMAGE_ALT: (index: number) => `주인장 ${index + 1}번째 그림카드`,
  IMAGES_URL: [
    '/imgs/smpark1.webp',
    '/imgs/smpark2.webp',
    '/imgs/smpark3.webp',
    '/imgs/smpark4.webp',
    '/imgs/smpark5.webp',
    '/imgs/smpark6.webp',
    '/imgs/smpark7.webp',
    '/imgs/smpark8.webp',
    '/imgs/smpark9.webp',
  ],
  ANIMATION: {
    ROTATE_DELAY: 700,
    STATES: {
      INIT: 'INIT',
      ROTATING: 'ROTATING',
      PAUSED: 'PAUSED',
    } as const,
    CLASSES: {
      INIT: '',
      ROTATING: 'animate-rotate-y-90',
      PAUSED: 'animate-rotate-y-0',
    } as const,
  },
};
