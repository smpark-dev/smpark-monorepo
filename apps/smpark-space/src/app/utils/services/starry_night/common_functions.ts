export function convertStarCount(width: number, count: number): number {
  return Math.floor((width / 10) * count);
}

export function randomStarSize(size: number): number {
  return Math.random() * 0.2 * size;
}

export function randomShootingStarSize(size: number): number {
  return Math.random() * 0.5 * size;
}

export function randomStarOpacity(): number {
  return Math.floor(Math.random() * 100);
}

export function randomStarColor(): string {
  const colors = ['#FFFFFF', '#FFA500', '#FFD700', '#800080', '#008000', '#87CEEB']; // white, orange, gold, purple, green, sky blue
  const index = Math.floor(Math.random() * colors.length); // 0 ~ 5 
  return colors[index];
}
