import React, { useEffect, useState } from "react";
import Loader from "../components/loader/index";
import { useQuery } from "@tanstack/react-query";
import { useCoinContext } from "../context/coin";
import { getTriviaFromGemini } from "../services/gemini";

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
    <div>
      {(isLoading || isRefetching) && <Loader />}
      {!isLoading && !isRefetching && (
        <div className="flex flex-col text-left">
          <div>
            <h2 className="font-bold text-2xl">{data?.question}</h2>
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
                      ? "bg-green-500"
                      : "bg-red-500"
                    : index === correctOptionIndex
                    ? "bg-green-500"
                    : "")
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {isAttempted && (
            <div>
              <div className="my-2">
                <p className="text-slate-500">{data?.summary}</p>
              </div>
              <div>
                <button
                  className="text-white bg-black px-4 py-3"
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
  );
};

export default Trivia;
