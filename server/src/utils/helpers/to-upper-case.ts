export const toUpperCase = (user: string) => {
  const writtenName = user;
  const editedName = writtenName
    .split(" ")
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return editedName;
};
