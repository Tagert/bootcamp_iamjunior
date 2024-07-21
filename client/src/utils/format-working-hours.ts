export const formatWorkingHours = (hours: {
  open?: string;
  close?: string;
  status: string;
}) => {
  if (hours.status === "closed") {
    return `Closed`;
  } else {
    return `
    ${hours.open} - ${hours.close}`;
  }
};
