import styles from "./BusinessReviewWrapper.module.scss";
import { useRef } from "react";
import { modals } from "@mantine/modals";
import { Button } from "@mantine/core";
import { FormikProps } from "formik";
import { LeaveReviewFormValues } from "../../../types/form.type";
import { ReviewType } from "../../../types/business.type";
import { LeaveReviewModal } from "../LeaveReviewModal/LeaveReviewModal";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { RatingSummary } from "../RatingSummary/RatingSummary";

type BusinessReviewWrapperProps = {
  provider: string;
  business_id: string;
  reviews: ReviewType[];
  review_count: number;
  average_rating: number;
};

export const BusinessReviewWrapper = ({
  provider,
  business_id,
  reviews,
  review_count,
  average_rating,
}: BusinessReviewWrapperProps) => {
  const formikRef = useRef<FormikProps<LeaveReviewFormValues>>(null);

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
            Review <span>({review_count})</span>
          </h2>

          <Button
            variant="default"
            classNames={{ label: styles.btnLabel }}
            onClick={openLeaveReviewModal}
          >
            Leave Review
          </Button>
        </div>

        <RatingSummary
          review_count={review_count}
          average_rating={average_rating}
        />
      </div>
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          rating={review.rating}
          title={review.title}
          description={review.description}
          date={review.date}
          user_id={review.user_id}
        />
      ))}
    </section>
  );
};
