type ButtonProp = {
  title: string;
  className: string;
  onClick?: () => void;
};

const Button = ({ title, className, onClick }: ButtonProp) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default Button;
