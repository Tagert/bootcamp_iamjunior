export type BookingType = {
  id?: string;
  business_id?: string;
  booking_date: string;
  time: string;
  user_id?: string;
  user_name?: string;
  user_email?: string;
  //TODO: add specific status selections.
  status?: string;
};
