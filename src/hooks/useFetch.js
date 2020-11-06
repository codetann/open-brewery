import { useState, useEffect } from "react";

export const useFetch = () => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState({});
  const [url, setUrl] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setStatus("fetching");
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setError(false);
          setStatus("fetched");
          console.log("done");
        }
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, [url]);

  return [status, data, setUrl, error];
};
