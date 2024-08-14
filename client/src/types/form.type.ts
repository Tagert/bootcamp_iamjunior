export type ContactsFormValues = {
  name: string;
  gender: string;
  phone_number: string;
  contact_email: string;
};

export type LocationFormValues = {
  city: string;
  address: string;
  birthday: string;
};

export type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type LeaveReviewFormValues = {
  title: string;
  description: string;
};
