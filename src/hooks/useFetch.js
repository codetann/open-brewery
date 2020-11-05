import { useState, useEffect } from "react";

export const useFetch = () => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState({});
  const [url, setUrl] = useState();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus("fetching");
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setData(data);
      setStatus("fetched");
      console.log("done");
    };
    fetchData();
  }, [url]);

  return [status, data, setUrl];
};
