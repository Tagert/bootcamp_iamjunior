export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validateEmail = emailRegex.test(email);

  if (validateEmail) {
    return validateEmail;
  }
};
