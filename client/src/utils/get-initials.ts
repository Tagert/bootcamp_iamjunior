export const getInitials = (name: string) => {
  if (!name) return "";

  const [firstLetter, secondLetter] = name
    .split("")
    .map((char, index) =>
      index === 0 ? char.toUpperCase() : char.toLowerCase()
    );
  return `${firstLetter}${secondLetter}`;
};
