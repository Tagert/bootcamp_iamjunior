type ButtonImageProp = {
  imgSrc: string;
  className: string;
};

const ButtonImage = ({ imgSrc, className }: ButtonImageProp) => {
  return (
    <>
      <button className={className}>
        <img
          className="fill-current text-white"
          src={imgSrc}
          alt="search icon"
        />
      </button>
    </>
  );
};

export default ButtonImage;
