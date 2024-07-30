const path = require('path');
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    // Next.js에서 사용되는 파일 타입을 변환할 수 있도록 설정
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    // '\\.(css|scss|sass)$': 'identity-obj-proxy', // CSS 파일을 처리하기 위한 설정
  },
  moduleNameMapper: {
    // 스타일 시트와 이미지 파일 등을 모의 처리
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1', // 절대경로(alias) 설정
  },
};
