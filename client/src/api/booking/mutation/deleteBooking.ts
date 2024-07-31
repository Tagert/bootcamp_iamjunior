import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { USER_BOOKINGS, BUSINESS_BOOKINGS } from "../../query-keys";
import { BookingType } from "../../../types/booking.type";

const deleteBooking = async (
  booking_id: string,
  user_id: string
): Promise<void> => {
  const response = await ApiService.delete(`/booking/${booking_id}`, {
    data: { user_id },
  });

  return response.data;
};

export const useDeleteBooking = (): UseMutationResult<
  void,
  Error,
  { booking_id: string; user_id: string; business_id: string | undefined },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ booking_id, user_id }) => deleteBooking(booking_id, user_id),
    onSuccess: (_, { booking_id, user_id, business_id }) => {
      queryClient.setQueryData<BookingType[]>(
        [USER_BOOKINGS, user_id],
        (prevBookings) => {
          const updatedBookings = prevBookings
            ? prevBookings.filter((booking) => booking.id !== booking_id)
            : [];

          return updatedBookings;
        }
      );

      queryClient.setQueryData<BookingType[]>(
        [BUSINESS_BOOKINGS, business_id],
        (prevBookings) => {
          const updatedBookings = prevBookings
            ? prevBookings.filter((booking) => booking.id !== booking_id)
            : [];

          return updatedBookings;
        }
      );
    },
  });
};
