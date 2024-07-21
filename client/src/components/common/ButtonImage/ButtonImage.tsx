import styles from "./ButtonImage.module.scss";

type ButtonImageProp = {
  imgSrc: string;
  className: string;
  text?: string;
  onClick?: () => void;
};

export const ButtonImage = ({
  imgSrc,
  className,
  text,
  onClick,
}: ButtonImageProp) => {
  return (
    <>
      <button
        className={`${styles.buttonImage} ${className}`}
        onClick={onClick}
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
