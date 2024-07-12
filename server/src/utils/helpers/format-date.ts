import { parseISO, formatISO, isValid } from "date-fns";

export const formatDate = (dateString: string) => {
  const parsedDate = parseISO(dateString);

  if (!isValid(parsedDate)) {
    throw new Error(`Invalid date format: ${dateString}. Please use 'YYYY-MM-DD' format.`);
  }

  return formatISO(parsedDate, { representation: "date" });
};
