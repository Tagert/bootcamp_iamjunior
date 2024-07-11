import axios from "axios";

export const fetchData = async <T>(
  url: string,
  signal: AbortSignal
): Promise<T> => {
  try {
    const response = await axios.get<T>(url, { signal });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `HTTP error! Status: ${error.response?.status}`
      );
    }
    throw new Error("An unknown error occurred");
  }
};
