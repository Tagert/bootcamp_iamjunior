type CategoryProp = {
  imgSrc: string;
  text: string;
};

export const Category = ({ imgSrc, text }: CategoryProp) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-44 h-32 rounded-xl  bg-indigo-500 bg-opacity-10 cursor-pointer">
      <img className="w-12 h-12" src={imgSrc} alt={`${text} icon`} />

      <p className="text-lg font-medium text-indigo-500">{text}</p>
    </div>
  );
};
