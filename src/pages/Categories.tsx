import React, { useEffect, useState } from "react";
import { getTriviaCategoriesFromGemini } from "../services/gemini";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(
    (JSON.parse(localStorage.getItem("categories") as string) as string[]) || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!categories.length) {
      getTriviaCategoriesFromGemini().then((result) => {
        localStorage.setItem("categories", JSON.stringify(result));
        setCategories(result.sort());
      });
    }
  }, []);

  const onClickCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((_category) => _category !== category)
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <span className="text-4xl font-bold">Categories</span>
      <span className="mt-1">Choose the one(s) you think you are good at</span>
      <div className="flex flex-wrap p-10 justify-center">
        {categories.map((category, _index) => {
          return (
            <button
              key={_index}
              className={`px-10 py-2 m-1 border border-black ${
                selectedCategories.includes(category)
                  ? "bg-black text-white"
                  : ""
              } hover:bg-black hover:text-white shadow-sm`}
              onClick={() => onClickCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className="mt-10 flex">
        <button className="px-10 py-3 m-1 border border-black bg-black text-white shadow-lg tracking-widest flex items-center">
          Get Started{""}
          {!!selectedCategories.length && (
            <span className="bg-white text-black rounded-full w-6 h-6 items-center justify-center ml-2">
              {selectedCategories.length ? selectedCategories.length : ""}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Categories;
