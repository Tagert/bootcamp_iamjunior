export const formatWorkingHours = (
  day: string,
  hours: { open?: string; close?: string; status: string }
) => {
  if (hours.status === "closed") {
    return `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed`;
  } else {
    return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours.open} - ${
      hours.close
    }`;
  }
};
