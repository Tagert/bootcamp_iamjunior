import styles from "./Button.module.scss";

type ButtonProp = {
  title: string;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  title,
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProp) => {
  return (
    <>
      <button
        type={type}
        className={`${className} ${styles.mainBtn}`}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </>
  );
};
