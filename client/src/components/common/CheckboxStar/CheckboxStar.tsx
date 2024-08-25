import styles from "./CheckboxStar.module.scss";
import { Checkbox } from "@mantine/core";
import { Progress } from "@mantine/core";
import { FaStar } from "react-icons/fa";

type CheckboxStarProps = {
  ratingNumber: number;
  progressValue: number;
  onChange: () => void;
  checked: boolean;
};

export const CheckboxStar = ({
  ratingNumber,
  progressValue,
  onChange,
  checked,
}: CheckboxStarProps) => {
  return (
    <div className={styles.checkboxStarHolder}>
      <Checkbox label={ratingNumber} checked={checked} onChange={onChange} />

      <FaStar className={styles.filledStar} />

      <Progress
        classNames={{ root: styles.progressBar }}
        value={progressValue}
        color="rgb(247, 198, 50)"
      />
    </div>
  );
};
