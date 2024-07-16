import React, { ReactNode } from "react";

type ErrorHandlerType = {
  errorElement: ReactNode | null;
  isLoading: boolean;
  hasData: boolean;
};

export const useErrorHandler = <T,>(
  data: T | undefined | null,
  error: Error | undefined,
  isLoading: boolean,
  noDataMessage = "No data to display"
): ErrorHandlerType => {
  if (isLoading) {
    return { errorElement: null, isLoading: true, hasData: false };
  }

  if (error) {
    return {
      errorElement: React.createElement("div", null, `Error: ${error.message}`),
      isLoading: false,
      hasData: false,
    };
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return {
      errorElement: React.createElement("div", null, noDataMessage),
      isLoading: false,
      hasData: false,
    };
  }

  return { errorElement: null, isLoading: false, hasData: true };
};
