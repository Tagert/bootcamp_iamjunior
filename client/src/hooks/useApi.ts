import { useState, useEffect, useCallback } from "react";
import { ApiService } from "../services/api.services";

type UseApiState<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

type Method = "get" | "post" | "put" | "delete";

export const useApi = <T = undefined>(
  url: string,
  method: Method = "get"
): [T | undefined, UseApiState<T>] => {
  const [state, setState] = useState<UseApiState<T>>({
    data: undefined,
    isLoading: true,
    error: undefined,
  });

  const fetchData = useCallback(async () => {
    setState({ data: undefined, isLoading: true, error: undefined });

    try {
      const response = await ApiService[method]<T>(url);
      setState({ data: response.data, isLoading: false, error: undefined });
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      setState({ data: undefined, isLoading: false, error });
      console.error("API Error:", error);
    }
  }, [url, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state.data, state];
};
