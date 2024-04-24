"use client"
import { getOriginalURL } from "@/actions/getOriginalURL";
import { notFound, redirect } from "next/navigation";
import { useState, useMemo, useEffect } from 'react';

const UrlCode = ({ params }) => {
  const [originalUrl, setOriginalUrl] = useState(null);

  useEffect(() => {
    (async () => {

      try {
        const originalUrl = await getOriginalURL(params?.urlCode);
        setOriginalUrl(originalUrl);
      } catch (error) {
        console.error("Error fetching Original URL:", error);
      }
    })();
  }, [params?.urlCode]);

  useMemo(() => {
    if (originalUrl) {
      return redirect(originalUrl);
    }
  }, [originalUrl]);

  return null;
};

export default UrlCode;
