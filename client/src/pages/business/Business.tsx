import styles from "./Business.module.scss";
import { useParams } from "react-router-dom";
import { Page } from "../../components/template/Page";
import { BusinessWrapper } from "../../components/business/BusinessWrapper/BusinessWrapper";
import { useBusiness } from "../../api/fetchBusinessById";
import { Spinner } from "../../components/common/Spinner/Spinner";

export const Business = () => {
  const { id } = useParams<{ id: string }>();

  const validId = id ?? "";

  const { data: business, isLoading, error } = useBusiness(validId);

  return (
    <Page>
      <main className={styles.businessPage}>
        {isLoading ? (
          <Spinner />
        ) : (
          <BusinessWrapper
            business={business}
            error={error}
            business_params_id={validId}
          />
        )}
      </main>
    </Page>
  );
};
