export const getOriginalURL = async (urlCode: string) => {
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
    const data = await response?.json();
    if (data?.status === 403) {
      return "invalid";
    } else if (data?.status === 429) {
      return "limit";
    } else return data?.originalUrl;
  } catch (error) {
    console.error("Error fetching Original URL:", error);
  }
};
