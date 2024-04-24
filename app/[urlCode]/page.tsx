"use client"
import { getOriginalURL } from "@/actions/getOriginalURL";
import { redirect } from "next/navigation";
import { useState, useMemo, useEffect } from 'react';

const UrlCode = ({ params }) => {
  const [originalUrl, setOriginalUrl] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUrl = async () => {
      setFetching(true);
      try {
        const originalUrl = await getOriginalURL(params?.urlCode);
        if (isMounted) {
          setOriginalUrl(originalUrl);
          setFetching(false);
        }
      } catch (error) {
        console.error("Error fetching Original URL:", error);
        setFetching(false);
      }
    };

    if (params?.urlCode) {
      fetchUrl();
    }

    return () => {
      isMounted = false;
    };
  }, [params?.urlCode]);

  useMemo(() => {
    if (originalUrl !== null) {
      return redirect(originalUrl);
    } else return null
  }, [originalUrl]);

  if (fetching) {
    return <div className="text-center text-2xl text-red-500 font-bold">Fetching URL...</div>;
  }

  return <div className="text-center text-2xl text-red-500 font-bold">Not a valid Url</div>;
};

export default UrlCode;
