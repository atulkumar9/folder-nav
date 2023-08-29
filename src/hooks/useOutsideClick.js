import { useEffect } from "react";

const useOutsideClick = (callback, refArr) => {
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  const handleOutsideClick = (e) => {
    const shouldCallCallback = refArr.reduce((acc, ref) => {
      return acc && ref.current && !ref.current.contains(e.target);
    }, true);
    if (shouldCallCallback) {
      callback();
    }
  };
};

export default useOutsideClick;
