import { useState, useEffect } from "react";

// This is a custom hooks, for reusabilty.
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // This data is fetch inside the useEffect so as to avoid using the useCallback
  useEffect(() => {
    // Abort Controller
    const controller = new AbortController();
    //Associate the AbortController with the fetch request, if we don't the controller won't know the fetch request to abort when the time comes.

    const fetchData = async () => {
      setIsPending(true);

      //   This is to catch errors when found
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);

      } catch (err) {
        if (err.name === "AbortError") {
          console.log("The Fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data!");

          // This will take the new Error message
          console.log(err.message);
        }
      }
    };

    fetchData();

    // Clean Up Function. The Clean Up function get a return from the useEffect and the fires whenever the component which the useEffect is used is unmounts. 
    return () => {
      controller.abort();
    };
  }, [url]);

  //   These are "returned as a property so it can be reusable in other component" & they are destructured in the component they are used.
  return { data, isPending, error };
};
