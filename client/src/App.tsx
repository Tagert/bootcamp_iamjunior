import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { Routes } from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <Notifications />
          <Routes />
        </ModalsProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
