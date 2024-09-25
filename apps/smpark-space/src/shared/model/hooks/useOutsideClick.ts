import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent) => void;

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
    };
  }, [ref, handler, mouseEvent]);
};

export default useOutsideClick;
