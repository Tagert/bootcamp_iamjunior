import styles from "./CalendarModal.module.scss";
import calendar_modal from "../../../styles/mantine_ui/calendar-modal.module.scss";
import open_modal from "../../../styles/mantine_ui/open-confirm-modal.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { addHours } from "date-fns";
import { Modal, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { DatePicker } from "@mantine/dates";
import { WorkingHoursType } from "../../../types/business.type";
import { useInsertBooking } from "../../../api/booking/mutation/insertBooking";
import { formatDate } from ".././../../utils/format-date";
import { handleDateChange } from "../../../utils/handle-date-change/handle-date-change";
import { useBusinessBookings } from "../../../api/booking/queries/fetchBookingsByBusiness";

type CalendarModalProps = {
  business_id: string;
  business_category: string;
  working_hours: WorkingHoursType;
  isCalendarModalVisible: boolean;
  setIsCalendarModalVisible: (state: boolean) => void;
};

export const CalendarModal = ({
  business_id,
  business_category,
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
    setTimeSlots([]);
  };

  const openConfirmationModal = () => {
    if (business_id && selectedDate && selectedTime) {
      const formattedDate = formatDate(selectedDate);
      modals.openConfirmModal({
        title: "Please confirm your booking",
        children: (
          <Text size="lg" className={styles.modalText}>
            Are you sure you want to book a {business_category.toLowerCase()}{" "}
            service on <span>{formattedDate}</span> at{" "}
            <span>{selectedTime}</span> for this business?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onCancel: () =>
          toast("Booking cancelled. Please choose another date.", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            draggable: true,
            progress: undefined,
          }),
        onConfirm: handleBooking,
        classNames: {
          title: open_modal.title,
          content: open_modal.content,
          body: open_modal.body,
        },
      });
    } else {
      toast.error("Please select a booking date and time.");
      console.error(
        "Business ID, selected date, or selected time is not available",
        { business_id, selectedDate, selectedTime }
      );
    }
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
            toast.success("Booking confirmed! Your appointment is set.");
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

  // console.log("businessBooking:", bookings);

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
            <p className={styles.noTimeSlotsTex}>
              No available time slots.*
              <span>
                *This could be because you haven't selected a date yet, the
                business is not operating on the chosen date, or the business is
                fully booked. Please select a date to view available time slots.
              </span>
            </p>
          )}
          <div className={styles.modalActions}>
            <Button onClick={openConfirmationModal} size="md">
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
