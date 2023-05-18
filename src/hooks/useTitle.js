// 12.14
import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    // clean up function, unmounting
    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
