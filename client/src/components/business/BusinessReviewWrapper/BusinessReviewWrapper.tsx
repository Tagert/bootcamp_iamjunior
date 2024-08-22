import styles from "./BusinessReviewWrapper.module.scss";
import { useRef } from "react";
import { modals } from "@mantine/modals";
import { Button } from "@mantine/core";
import { FormikHelpers, FormikProps } from "formik";
import { LeaveReviewFormValues } from "../../../types/form.type";
import { LeaveReviewModal } from "../LeaveReviewModal/LeaveReviewModal";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { RatingSummary } from "../RatingSummary/RatingSummary";

type BusinessReviewWrapperProps = {
  provider: string;
  business_id: string;
};

export const BusinessReviewWrapper = ({
  provider,
  business_id,
}: BusinessReviewWrapperProps) => {
  const formikRef = useRef<FormikProps<LeaveReviewFormValues>>(null);

  const handleSubmit = (
    values: LeaveReviewFormValues,
    actions: FormikHelpers<LeaveReviewFormValues>
  ) => {
    // eslint-disable-next-line no-console
    console.log("Form Submitted with values:", values);

    actions.setSubmitting(false);
  };

  const openLeaveReviewModal = () =>
    modals.openConfirmModal({
      classNames: {
        header: styles.modalHeader,
        title: styles.modalTitle,
      },
      title: (
        <p>
          Leave a review for <span className={styles.provider}>{provider}</span>
          .
        </p>
      ),
      children: (
        <LeaveReviewModal
          provider={provider}
          business_id={business_id}
          onSubmit={handleSubmit}
          formRef={formikRef}
        />
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      // onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        if (formikRef.current) {
          formikRef.current.submitForm();
        }
      },
    });

  return (
    <section className={styles.businessReviewWrapper}>
      <div className={styles.ratingHolder}>
        <div className={styles.addReview}>
          <h2>
            Review <span>(0)</span>
          </h2>

          <Button
            variant="default"
            classNames={{ label: styles.btnLabel }}
            onClick={openLeaveReviewModal}
          >
            Leave Review
          </Button>
        </div>

        <RatingSummary />
      </div>

      <ReviewCard />
    </section>
  );
};
