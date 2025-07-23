export const EMOTIONS = {
  joy: { icon: '✨', text: '기쁨', color: '#f2d038' },
  sadness: { icon: '💧', text: '슬픔', color: '#268BD2' },
  anger: { icon: '🔥', text: '분노', color: '#ff6863' },
  fear: { icon: '⚡', text: '두려움', color: '#bdbdbd' },
  surprise: { icon: '💫', text: '놀람', color: '#fe918d' },
  love: { icon: '💖', text: '사랑', color: '#ff6863' },
  neutral: { icon: '🌟', text: '평온', color: '#7c7979' },
} as const;

export type EmotionType = keyof typeof EMOTIONS;

export const DIARY_CONFIG = {
  TYPING_DEBOUNCE: 1500,
  MIN_ANALYSIS_LENGTH: 10,
  MAX_CHARACTERS: 5000,
} as const;