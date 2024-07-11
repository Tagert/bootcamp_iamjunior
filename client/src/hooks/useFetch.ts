import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

type FetchStateType<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
};

type FetchOptions<B = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
  headers?: { [key: string]: string };
};

export const useFetch = <T, B = unknown>(
  url: string,
  options?: FetchOptions<B>
): [T | undefined, FetchStateType<T>] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      const { method = "GET", body, headers } = options || {};

      try {
        const config: AxiosRequestConfig = {
          url,
          method,
          headers,
          data: body,
          signal: abortController.signal,
        };

        const response = await axios.request<T>(config);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            new Error(
              error.response?.data?.message ||
                `HTTP error! Status: ${error.response?.status}`
            )
          );
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return [
    data,
    {
      data,
      isLoading,
      error,
    },
  ];
};
