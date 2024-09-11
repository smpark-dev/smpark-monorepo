export const debounce = <T extends unknown[]>(func: (...args: T) => unknown, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
