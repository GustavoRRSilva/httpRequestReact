import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  //Loader
  const [loading,setLoading] = useState(false);
  
  //Refatoring post

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod("POST");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoading(false)
    };
    fetchData();
  }, [url, callFetch]);

  //Refatoring post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];
        let res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json);
      }
    };
    httpRequest();
  }, [config]);

  return { data, httpConfig,loading };
};
