import axios, { AxiosError } from "axios";

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
};

export const getErrorMessage = (error: Error | AxiosError): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (isErrorWithMessage(error.response.data)) {
        return error.response.data.message;
      }
      return `Server error: ${error.response.status}`;
    }

    if (error.request) {
      return "Network error: No response received from server.";
    }

    return "Request setup error: " + error.message;
  }

  return "An unexpected error occurred: " + error.message;
};
