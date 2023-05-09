// 10.6
import { useState, useEffect } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(
    // JSON.parse() = parse the JSON string (localStorage can only store strings) back into JSON
    // localStorage.getItem("persist") = retrieve the persist data from localStorage
    JSON.parse(localStorage.getItem("persist")) || false
  );

  useEffect(() => {
    // convert the persist state(JSON) into a JSON string that can be stored in localStorage
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
