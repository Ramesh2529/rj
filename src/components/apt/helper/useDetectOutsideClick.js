import { useEffect } from "react";

export const useDetectOutsideClick = (ref, funcToExecute) => {
  useEffect(() => {
    // call funcToExecute if the user clicked outside of the ref
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current?.contains(event?.target)) {
        funcToExecute();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, funcToExecute]);
};
