import styles from "./LeaveReviewModal.module.scss";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import { FormField } from "../../common/FormField/FormField";
import { TextField } from "../../common/TextField/TextField";
import { RatingStars } from "../../common/RatingStars/RatingStars";
import { leaveReviewValidationSchema } from "../../../constants/yup.schemas";
import { LeaveReviewFormValues } from "../../../types/form.type";

type LeaveReviewModalProps = {
  provider: string;
  onSubmit: (
    values: LeaveReviewFormValues,
    actions: FormikHelpers<LeaveReviewFormValues>
  ) => void;
  formRef: React.Ref<FormikProps<LeaveReviewFormValues>>;
};

export const LeaveReviewModal = ({
  provider,
  onSubmit,
  formRef,
}: LeaveReviewModalProps) => {
  const initialValues: LeaveReviewFormValues = {
    title: "",
    description: "",
  };

  const handleRatingChange = (rating: number) => {
    // eslint-disable-next-line no-console
    console.log("Selected Rating:", rating);
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
        onSubmit={onSubmit}
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
