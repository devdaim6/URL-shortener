export const handleSubmit = async (
  e: any,
  setLoading: any,
  setShortUrl: any,
  longUrl: string,
  urlLength: number,
) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await fetch(
      `/api/shorten/${encodeURIComponent(longUrl)}/${urlLength}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setShortUrl(data.shortUrl);
  } catch (error) {
    console.error("Error shortening URL:", error);
  } finally {
    setLoading(false);
  }
};
