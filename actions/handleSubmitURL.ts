export const handleSubmit = async (
  e: any,
  setLoading: any,
  setShortUrl: any,
  longUrl: string,
  urlLength: number,
  customUrlCode: string
) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await fetch(`/api/shorten/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longUrl: longUrl,
        urlLength: urlLength,
        customUrlCode,
      }),
    });
    const data = await response?.json();
    setShortUrl(data?.shortUrl);
  } catch (error) {
    console.error("Error shortening URL:", error);
  } finally {
    setLoading(false);
  }
};
