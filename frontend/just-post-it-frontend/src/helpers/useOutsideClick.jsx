import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    return ref;
  };

  export default useOutsideClick;