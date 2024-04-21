export const getOriginalURL = async (
  setOriginalURL: any,
  setLoading: any,
  urlCode: string
) => {
  setLoading(true);
  try {
    const response = await fetch(`/api/redirection/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urlCode: urlCode,
      }),
    });
    const data = await response.json();
    console.log("data ", data);
    setOriginalURL(data.originalUrl);
  } catch (error) {
    console.error("Error fetching Original URL:", error);
  } finally {
    setLoading(false);
  }
};
