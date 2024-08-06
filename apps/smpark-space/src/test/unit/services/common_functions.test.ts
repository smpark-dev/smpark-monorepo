// yourModule.test.ts

import {
  convertStarCount,
  randomStarSize,
  randomShootingStarSize,
  randomStarOpacity,
  randomStarColor,
} from '@/app/utils/services/starry_night/common_functions';

describe('convertStarCount', () => {
  test('width와 count를 올바른 별 개수로 변환', () => {
    expect(convertStarCount(100, 5)).toBe(50); // 100 / 10 * 5 = 50
    expect(convertStarCount(200, 2)).toBe(40); // 200 / 10 * 2 = 40
    expect(convertStarCount(150, 3)).toBe(45); // 150 / 10 * 3 = 45
  });
});

describe('randomStarSize', () => {
  test('0에서 size의 0.2배 사이의 숫자를 반환', () => {
    const size = 100;
    const result = randomStarSize(size);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(0.2 * size);
  });
});

describe('randomShootingStarSize', () => {
  test('0에서 size의 0.5배 사이의 숫자를 반환', () => {
    const size = 100;
    const result = randomShootingStarSize(size);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(0.5 * size);
  });
});

describe('randomStarOpacity', () => {
  test('0에서 100 사이의 숫자를 반환', () => {
    const result = randomStarOpacity();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});

describe('randomStarColor', () => {
  test('미리 정의된 색상 리스트에서 반환', () => {
    const colors = ['#FFFFFF', '#FFA500', '#FFD700', '#800080', '#008000', '#87CEEB'];
    const result = randomStarColor();
    expect(colors).toContain(result);
  });
});
