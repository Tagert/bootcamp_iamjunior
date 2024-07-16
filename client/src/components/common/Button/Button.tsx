import styles from "./Button.module.scss";

type ButtonProp = {
  title: string;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({ title, className, onClick, disabled }: ButtonProp) => {
  return (
    <>
      <button
        className={`${className} ${styles.mainBtn}`}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </>
  );
};
