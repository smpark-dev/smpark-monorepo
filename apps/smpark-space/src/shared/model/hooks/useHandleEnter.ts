import { useCallback, KeyboardEvent } from 'react';

export const useHandleEnter = (
  callback: (event: KeyboardEvent<HTMLElement>) => void,
  preventDefault?: boolean,
) => {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter') {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }
    },
    [callback, preventDefault],
  );
};
