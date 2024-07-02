export const validatePassword = (password: string) => {
  const minLengthRegex = /^.{6,}$/;
  const isMinLengthValid = minLengthRegex.test(password);

  const containsNumberRegex = /\d/;
  const containsNumber = containsNumberRegex.test(password);

  if (!password.trim()) {
    return "Password cannot be empty";
  }

  if (!isMinLengthValid) {
    return "Password must be at least 6 characters long";
  }

  if (!containsNumber) {
    return "Password must contain at least one number";
  }

  return true;
};
