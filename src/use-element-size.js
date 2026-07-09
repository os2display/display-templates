import { useEffect, useState } from "react";

/**
 * Track the size of a referenced DOM element.
 *
 * @param {import("react").RefObject<HTMLElement>} ref Element ref.
 * @returns {{ width: number; height: number }} Current element dimensions.
 */
function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [ref]);

  return size;
}

export default useElementSize;
