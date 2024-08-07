export const handleKeyDown = (
  e: React.KeyboardEvent,
  submitForm: () => void,
  key: string
) => {
  if (e.key === key) {
    e.preventDefault();
    submitForm();
  }
};
