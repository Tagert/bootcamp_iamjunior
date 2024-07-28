import styles from "./CalendarModal.module.scss";
import calendar_modal from "../../../styles/mantine_ui/calendar-modal.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { addHours } from "date-fns";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { WorkingHoursType } from "../../../types/business.type";
import { useInsertBooking } from "../../../api/booking/mutation/insertBooking";
import { formatDate } from ".././../../utils/format-date";
import { handleDateChange } from "../../../utils/handle-date-change";
import { useBusinessBookings } from "../../../api/booking/queries/fetchBookingsByBusiness";

type CalendarModalProps = {
  business_id: string;
  working_hours: WorkingHoursType;
  isCalendarModalVisible: boolean;
  setIsCalendarModalVisible: (state: boolean) => void;
};
export const CalendarModal = ({
  business_id,
  working_hours,
  isCalendarModalVisible,
  setIsCalendarModalVisible,
}: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const { mutate: insertBooking } = useInsertBooking();
  const { data: bookings = [], refetch } = useBusinessBookings(business_id);

  const closeModal = () => {
    setIsCalendarModalVisible(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBooking = () => {
    if (business_id && selectedDate && selectedTime) {
      const formattedDate = formatDate(selectedDate);
      const newBooking = {
        booking_date: formattedDate,
        time: selectedTime,
      };

      insertBooking(
        { booking: newBooking, business_id },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success(
              `Success, Date: ${formattedDate} Time: ${selectedTime}`
            );
          },
        }
      );
    } else {
      toast.error("Please select a booking date and time.");
      console.error(
        "Business ID, selected date, or selected time is not available",
        { business_id, selectedDate, selectedTime }
      );
    }
  };

  return (
    <section className={styles.calendarModal}>
      <Modal
        classNames={{
          close: calendar_modal.close,
          title: calendar_modal.title,
          content: calendar_modal.content,
        }}
        opened={isCalendarModalVisible}
        onClose={closeModal}
        title="Book a Service"
        transitionProps={{ transition: "rotate-right" }}
      >
        <div className={styles.modalContent}>
          <h3>Select Date and Time to book a service</h3>

          <h4>Select Date</h4>

          <DatePicker
            classNames={{
              levelsGroup: calendar_modal.levelsGroup,
              calendarHeaderControl: calendar_modal.calendarHeaderControl,
            }}
            className={styles.calendarBody}
            value={selectedDate}
            minDate={addHours(new Date(), 24)}
            highlightToday={true}
            size="lg"
            onChange={(date) =>
              handleDateChange({
                date,
                working_hours,
                setSelectedDate,
                setTimeSlots,
                bookings,
              })
            }
          />

          {timeSlots.length > 0 ? (
            <>
              <h5>Select Time Slot</h5>

              <div className={styles.timeSlots}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={slot === selectedTime ? styles.selected : ""}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>
              No time slots available for the selected date. The business may be
              closed on this day.
            </p>
          )}
          <div className={styles.modalActions}>
            <Button onClick={handleBooking} size="md">
              Book Now
            </Button>

            <Button variant="outline" onClick={closeModal} size="md">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
