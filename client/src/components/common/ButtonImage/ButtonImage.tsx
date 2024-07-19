type ButtonImageProp = {
  imgSrc: string;
  className: string;
  text?: string;
};

export const ButtonImage = ({ imgSrc, className, text }: ButtonImageProp) => {
  return (
    <>
      <button className={className}>
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
