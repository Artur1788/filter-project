import { useEffect } from 'react';

export const useOutSideClick = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
  condition: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        callback();
    };
    if (condition)
      document.addEventListener('mousedown', handleClickOutside, true);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside, true);
  }, [ref, callback, condition]);
};
