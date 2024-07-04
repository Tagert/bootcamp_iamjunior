export const toUpperCase = (user) => {
  const writtenName = user;
  const editedName = writtenName
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return editedName;
};
