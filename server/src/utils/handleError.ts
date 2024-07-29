import { Response } from "express";

export const handleError = (err: unknown, res: Response, message: string) => {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.error(`Error during ${message}:`, errorMessage);

  return res.status(500).json({
    error: `An error occurred during the ${message} process.`,
    details: errorMessage,
  });
};
