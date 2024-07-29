import styles from "./UserProfile.module.scss";
import { Page } from "../../components/template/Page";
import { UserContactForm } from "../../components/user-profile/UserContactForm/UserContactForm";
import { UserLocationForm } from "../../components/user-profile/UserLocationForm/UserLocationForm";
import { UserPasswordChangeForm } from "../../components/user-profile/UserPasswordChangeForm/UserPasswordChangeForm";

export const UserProfile = () => {
  return (
    <Page>
      <main className={styles.userProfile}>
        <div className={styles.titleContainer}>
          <h1>Profile</h1>
        </div>

        <section className={styles.formsContainer}>
          <UserContactForm className={styles.formHolder} />

          <UserLocationForm className={styles.formHolder} />

          <UserPasswordChangeForm className={styles.formHolder} />
        </section>
      </main>
    </Page>
  );
};
