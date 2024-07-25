import styles from "./ButtonImage.module.scss";

type ButtonImageProp = {
  imgSrc: string;
  className: string;
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const ButtonImage = ({
  imgSrc,
  className,
  text,
  disabled,
  onClick,
}: ButtonImageProp) => {
  return (
    <>
      <button
        className={`${styles.buttonImage} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <img
          className="fill-current text-white"
          src={imgSrc}
          alt="search icon"
        />
        <p>{text}</p>
      </button>
    </>
  );
};
