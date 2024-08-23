import styles from "./LeaveReviewModal.module.scss";
import { useState } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import { FormField } from "../../common/FormField/FormField";
import { TextField } from "../../common/TextField/TextField";
import { RatingStars } from "../../common/RatingStars/RatingStars";
import { leaveReviewValidationSchema } from "../../../constants/yup.schemas";
import { LeaveReviewFormValues } from "../../../types/form.type";
import { useInsertReview } from "../../../api/business/mutations/insertBusinessReview";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type LeaveReviewModalProps = {
  provider: string;
  business_id: string;
  formRef: React.Ref<FormikProps<LeaveReviewFormValues>>;
};

export const LeaveReviewModal = ({
  provider,
  business_id,
  formRef,
}: LeaveReviewModalProps) => {
  const { mutate: insertReview } = useInsertReview();
  const [rating, setRating] = useState(0);

  const initialValues: LeaveReviewFormValues = {
    title: "",
    description: "",
    rating: 0,
  };

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleSubmit = async (
    values: LeaveReviewFormValues,
    actions: FormikHelpers<LeaveReviewFormValues>
  ) => {
    const reviewValues = { ...values, rating };

    try {
      insertReview(
        {
          ...reviewValues,
          business_id,
        },
        {
          onSuccess: () => {
            toast.success(
              `Thank you for reviewing ${provider}! Your feedback has been submitted.`
            );

            actions.setSubmitting(false);
          },
          onError: (error: Error) => {
            const axiosError = error as AxiosError<{ error: string }>;

            toast.error(axiosError.response?.data.error || "An error occurred");
            actions.setSubmitting(false);
          },
        }
      );
    } catch (err) {
      toast.error("An unexpected error occurred.");
      actions.setSubmitting(false);
    }
  };

  return (
    <section className={styles.leaveReviewModal}>
      <div className={styles.clickToRateBox}>
        <h4>Click to rate:</h4>

        <RatingStars
          starStyle={styles.rateBtn}
          onRatingChange={handleRatingChange}
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={leaveReviewValidationSchema}
        onSubmit={handleSubmit}
        innerRef={formRef}
        enableReinitialize
      >
        {() => (
          <Form className={styles.formFields}>
            <FormField label="Title" name="title" type="text" />

            <TextField
              label="Review"
              name="description"
              placeholder={`Describe what it was like working with ${provider} and the reasoning behind your rating.`}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};
