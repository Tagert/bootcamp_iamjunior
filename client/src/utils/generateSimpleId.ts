let idCounter = 0;

export const generateSimpleId = (prefix: string = "service"): string => {
  idCounter += 1;
  return `${prefix}_${idCounter}`;
};
