import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { BookingType } from "../../../types/booking.type";
import { USER_BOOKINGS } from "../../query-keys";

const fetchBookingsByUserId = async (id: string): Promise<BookingType[]> => {
  const response = await ApiService.get(`/bookings/user/${id}`);

  return response.data;
};

export const useUserBookings = (id: string) => {
  return useQuery({
    queryKey: [USER_BOOKINGS, id],
    queryFn: () => fetchBookingsByUserId(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
