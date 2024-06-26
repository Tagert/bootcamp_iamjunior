import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { categories } from "./constants/categories";
import { Category } from "./components/common/Category/Category";
import search from "./assets/search.svg";
import Navbar from "./components/spec/Navbar/Navbar";
import ButtonImage from "./components/common/ButtonImage/ButtonImage";
import { CardWrapper } from "./components/spec/CardWrapper/CardWrapper";

const App = () => {
  const [onSearch, setOnSearch] = useState<string>("");

  return (
    <>
      <Router>
        <Navbar />
      </Router>

      <section className="flex flex-col items-center gap-8 pt-16 px-16">
        <h2 className="text-center text-5xl font-extrabold leading-20">
          Find Home <span className="text-indigo-500">Service/Repair</span>
          <br /> Near You
        </h2>

        <h4
          className="text-center text-2xl  text-gray-400 
        "
        >
          Explore Best Home Service & Repair near you
        </h4>

        <div className="flex gap-4 pt-6">
          <input
            type="search"
            name="search_bar"
            placeholder="Search"
            value={onSearch}
            onChange={(e) => {
              setOnSearch(e.target.value);
            }}
            className="w-96 p-4 border-solid border-2 border-opacity-40 focus:border-sky-500 rounded-3xl border-gray-400 hover:border-gray-400 bg-white"
          />

          <ButtonImage
            className="flex items-center justify-center w-16 h-16 bg-indigo-500  rounded-full"
            imgSrc={search}
          />
        </div>

        <div className="flex gap-4 mt-16">
          {categories.map((category) => (
            <Category imgSrc={category.imgSrc} text={category.text} />
          ))}
        </div>
      </section>

      <CardWrapper />
    </>
  );
};

export default App;
