import { useEffect, useRef } from "react";

export const useScrollIntoView = () => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    if (window.innerWidth > 960) return;

    scrollTo({
      top: elRef.current.getBoundingClientRect().top,
      left: 0,
      behavior: "smooth",
    });
  }, [elRef]);

  return elRef;
};
