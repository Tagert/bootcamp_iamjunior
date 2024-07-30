import styles from "./UserProfile.module.scss";
import { Page } from "../../components/template/Page";
import { Tabs, rem } from "@mantine/core";
import { IconUserScan, IconMapPin, IconLock } from "@tabler/icons-react";
import { UserContactForm } from "../../components/user-profile/UserContactForm/UserContactForm";
import { UserLocationForm } from "../../components/user-profile/UserLocationForm/UserLocationForm";
import { UserPasswordChangeForm } from "../../components/user-profile/UserPasswordChangeForm/UserPasswordChangeForm";
import { useAuthStore } from "../../store/use-auth.store";

export const UserProfile = () => {
  const { user } = useAuthStore();

  const iconStyle = { width: rem(24), height: rem(24) };

  return (
    <Page>
      <main className={styles.userProfile}>
        <div className={styles.titleContainer}>
          <h1>Profile</h1>
        </div>

        <section className={styles.formsContainer}>
          <Tabs
            variant="outline"
            radius="md"
            defaultValue="contact"
            classNames={{ list: styles.list, tabLabel: styles.tabLabel }}
          >
            <Tabs.List>
              <Tabs.Tab
                value="contact"
                leftSection={<IconUserScan style={iconStyle} />}
              >
                Contact
              </Tabs.Tab>

              <Tabs.Tab
                value="location"
                leftSection={<IconMapPin style={iconStyle} />}
              >
                Location
              </Tabs.Tab>

              <Tabs.Tab
                value="password"
                leftSection={<IconLock style={iconStyle} />}
              >
                Password
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="contact">
              <UserContactForm className={styles.formHolder} />
            </Tabs.Panel>

            <Tabs.Panel value="location">
              <UserLocationForm className={styles.formHolder} />
            </Tabs.Panel>

            <Tabs.Panel value="password">
              {user && (
                <UserPasswordChangeForm
                  className={styles.formHolder}
                  user_id={user.id}
                />
              )}
            </Tabs.Panel>
          </Tabs>
        </section>
      </main>
    </Page>
  );
};
