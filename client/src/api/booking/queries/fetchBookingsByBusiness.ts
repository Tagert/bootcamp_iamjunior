import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { BookingType } from "../../../types/booking.type";
import { BUSINESS_BOOKINGS } from "../../query-keys";

const fetchBookingsByBusinessId = async (
  business_id: string
): Promise<BookingType[]> => {
  const response = await ApiService.get(`/bookings/business/${business_id}`);

  return response.data;
};

export const useBusinessBookings = (business_id: string) => {
  return useQuery({
    queryKey: [BUSINESS_BOOKINGS, business_id],
    queryFn: () => fetchBookingsByBusinessId(business_id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
