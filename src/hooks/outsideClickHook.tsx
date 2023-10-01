import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      // Check if the clicked target is outside ref
      const isOutside = ref.current && !ref.current.contains(event.target);

      // Check if a child input of ref has focus
      const isChildInputFocused =
        ref.current &&
        ref.current.contains(document.activeElement) &&
        document.activeElement?.tagName === "INPUT";

      if (isOutside && isChildInputFocused) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useOutsideClick;
