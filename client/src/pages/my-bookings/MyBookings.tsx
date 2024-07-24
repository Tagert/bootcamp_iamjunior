import styles from "./MyBookings.module.scss";
import tabs from "../../styles/mantine_ui/tabs.module.scss";
import { useState } from "react";
import { Tabs } from "@mantine/core";
import { Page } from "../../components/template/Page";
import { useUserBookings } from "../../api/booking/queries/fetchBookingsByUser";
import { useParams } from "react-router-dom";
import { BookingCard } from "../../components/my-bookings/BookingCard";
import { BookingType } from "../../types/booking.type";

export const MyBookings = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string | null>("booked");

  const validId = id ?? "";

  const { data: bookings } = useUserBookings(validId);

  return (
    <Page>
      <main className={styles.MyBookings}>
        <div className={styles.titleContainer}>
          <h2>My Bookings</h2>
        </div>

        <Tabs
          classNames={{
            list: tabs.list,
            tabLabel: tabs.tabLabel,
            tab: tabs.tab,
            panel: tabs.panel,
          }}
          value={activeTab}
          onChange={setActiveTab}
          variant="pills"
        >
          <Tabs.List>
            <Tabs.Tab value="booked">Booked</Tabs.Tab>
            <Tabs.Tab value="completed">Completed</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="booked">
            {bookings && bookings.length > 0 ? (
              bookings
                .filter(
                  (booking: BookingType) =>
                    booking.status === "pending" ||
                    booking.status === "approved"
                )
                .map((booking: BookingType) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
            ) : (
              <p>No booked bookings found.</p>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="completed">
            {bookings && bookings.length > 0 ? (
              bookings
                .filter(
                  (booking: BookingType) => booking.status === "completed"
                )
                .map((booking: BookingType) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
            ) : (
              <p>No completed bookings found.</p>
            )}
          </Tabs.Panel>
        </Tabs>
      </main>
    </Page>
  );
};
