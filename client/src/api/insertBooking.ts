import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiService } from "../services/api.services";
import { BookingType } from "../types/booking.type";
import { INSERT_BOOKING } from "./query-keys";

const insertBooking = async (
  booking: BookingType,
  business_id: string
): Promise<BookingType> => {
  const response = await ApiService.post(
    `/business/${business_id}/booking`,
    booking
  );

  return response.data;
};

export const useInsertBooking = (): UseMutationResult<
  BookingType,
  Error,
  { booking: BookingType; business_id: string },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ booking, business_id }) =>
      insertBooking(booking, business_id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [INSERT_BOOKING] }),
  });
};
