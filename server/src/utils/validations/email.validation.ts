export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validateEmail = emailRegex.test(email);

  if (validateEmail) {
    return validateEmail;
  }
};
