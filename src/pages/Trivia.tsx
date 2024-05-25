import React, { useEffect, useState } from "react";
import Loader from "../components/loader/index";
import { useQuery } from "@tanstack/react-query";
import { useCoinContext } from "../context/coin";
import { getTriviaFromGemini } from "../services/gemini";
import { AppHeader } from "../components";

const Trivia: React.FC = () => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["trivia"],
    queryFn: async () => {
      const selectedCategories = localStorage.getItem("selectedCategories");
      return getTriviaFromGemini(
        selectedCategories ? JSON.parse(selectedCategories) : []
      );
    },
  });

  const { addCoin } = useCoinContext();

  const [isAttempted, setIsAttempted] = useState(false);

  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(-1);
  const [clickedOptionIndex, setClickedOptionIndex] = useState<number>(-1);

  const onOptionClick = (optionIndex: number) => {
    setClickedOptionIndex(optionIndex);
    setIsAttempted(true);

    if (correctOptionIndex === optionIndex) {
      addCoin(1);
    }
  };

  const onNexTriviaClick = () => {
    setIsAttempted(false);
    refetch();
  };

  useEffect(() => {
    if (!isLoading && data?.correctOption) {
      setCorrectOptionIndex(
        data?.options?.findIndex(
          (option: string) => option === data?.correctOption
        )
      );
    }
  }, [isLoading, isRefetching]);

  return (
    <>
      <AppHeader />
      <div>
        {(isLoading || isRefetching) && <Loader />}
        {!isLoading && !isRefetching && (
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-slate-500 font-bold text-sm">
                #
                {data?.category
                  ?.toLowerCase()
                  .replace(/[^a-z]/g, "")
                  .split(" ")
                  .map((word, index) =>
                    index === 0
                      ? word
                      : word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join()}
              </span>
            </div>
            <div>
              <h2 className="font-bold text-2xl text-left">{data?.question}</h2>
            </div>
            <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-1">
              {data?.options?.map((option, index) => (
                <button
                  onClick={() => onOptionClick(index)}
                  key={index}
                  disabled={isAttempted}
                  className={`p-4  border border-black  ${
                    !isAttempted &&
                    "text-black bg-white hover:bg-black hover:text-white"
                  } ${
                    isAttempted &&
                    (index === clickedOptionIndex
                      ? clickedOptionIndex === correctOptionIndex
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : index === correctOptionIndex
                      ? "bg-green-500 text-white"
                      : "")
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {isAttempted && (
              <div className="flex flex-col justify-center mt-2">
                <div className="my-2">
                  <p className="text-slate-500 text-left">{data?.summary}</p>
                </div>
                <div>
                  <button
                    className="text-white bg-black px-8 py-3 mt-10"
                    disabled={!isAttempted}
                    onClick={onNexTriviaClick}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Trivia;
