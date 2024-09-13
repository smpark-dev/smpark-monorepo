// @ts-check

import { composePlugins, withNx } from '@nx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/webp'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  distDir: 'build', // 빌드 파일을 'build' 폴더에 저장 (쓰기 가능한 경로로 수정)
  experimental: {
    outputFileTracingRoot: '/tmp', // 캐시 파일을 /tmp 폴더에 저장 (GitHub Actions 환경에서 쓰기 가능한 경로)
  },
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);
