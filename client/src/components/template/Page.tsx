import { ToastContainer } from "react-toastify";
import { Navbar } from "../specific/Navbar/Navbar";
import styles from "./Page.module.scss";
import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <main className={styles.container}>
        <Navbar />

        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
};
