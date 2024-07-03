import { Navbar } from "../spec/Navbar/Navbar";
import styles from "./Page.module.scss";
import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <main className={styles.container}>
      <Navbar />

      <div className={styles.content}>{children}</div>
    </main>
  );
};
