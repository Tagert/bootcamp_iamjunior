import styles from "./styles/Button.module.css";

type ButtonProp = {
  title: string;
  className: string;
  onClick?: () => void;
};

export const Button = ({ title, className, onClick }: ButtonProp) => {
  return (
    <>
      <button className={`${className} ${styles.mainBtn}`} onClick={onClick}>
        {title}
      </button>
    </>
  );
};
