import styles from "./CheckboxStar.module.scss";
import { Checkbox } from "@mantine/core";
import { Progress } from "@mantine/core";
import { FaStar } from "react-icons/fa";

type CheckboxStarProps = {
  ratingNumber: number;
  progressValue: number;
};

export const CheckboxStar = ({
  ratingNumber,
  progressValue,
}: CheckboxStarProps) => {
  return (
    <div className={styles.checkboxStarHolder}>
      <Checkbox label={ratingNumber} />

      <FaStar className={styles.filledStar} />

      <Progress
        classNames={{ root: styles.progressBar }}
        value={progressValue}
      />
    </div>
  );
};
