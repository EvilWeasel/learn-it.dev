// src/hooks/useHttp.js

import { useState, useEffect, useRef } from "react";

const usePost = (url: string, options: RequestInit) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data === undefined || null)
          throw new Error("No data in response body");
        setData(data);
      } catch (err: Error | any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
};

export default usePost;
