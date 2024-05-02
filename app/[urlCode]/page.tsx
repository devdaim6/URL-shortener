"use client";
import { getOriginalURL } from "@/actions/getOriginalURL";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UrlCode = ({ params }) => {
  const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUrl = async () => {
      setFetching(true);
      try {
        const response = await getOriginalURL(params?.urlCode);
        if (response === "invalid") {
          setError("Invalid URL");
        } else if (response === "limit") {
          setError("Rate Limit Exceeded");
        } else {
          if (isMounted) {
            setOriginalUrl(response);
          }
        }
        setFetching(false);
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

  useEffect(() => {
    if (originalUrl) {
      router.push(originalUrl);
    }
  }, [originalUrl, router]);

  if (fetching) {
    return (
      <div className="text-center text-2xl text-red-500 font-bold">
        Fetching URL...
      </div>
    );
  }

  if (error) {
    if (error === "Rate Limit Exceeded") {
      return (
        <div className="text-center text-lg my-10 mx-10 px-10 text-red-500 font-bold">
          Limit Exceeded: You have exceeded the maximum number of requests
          allowed for this endpoint. To ensure fair access for all users, each
          user is limited to 10 requests per minute. Please wait for a moment
          before trying again or consider upgrading your plan for higher request
          limits. Thank you for your understanding.
        </div>
      );
    } else {
      return (
        <div className="text-center text-2xl text-red-500 font-bold">
          {error}
        </div>
      );
    }
  }
  if (!fetching && !originalUrl)
    return (
      <div className="text-center text-2xl text-red-500 font-bold">
        Not a valid Url
      </div>
    );
};

export default UrlCode;
