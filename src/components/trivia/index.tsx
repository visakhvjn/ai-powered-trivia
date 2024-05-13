/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getTriviaFromGemini } from "../../services/gemini";
import Loader from "../loader";
import { useQuery } from "@tanstack/react-query";
import { useCoinContext } from "../../context/coin";

const Trivia: React.FC = () => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["trivia"],
    queryFn: async () => getTriviaFromGemini(),
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
    console.log(data);
    if (!isLoading && data?.correctOption) {
      setCorrectOptionIndex(
        data.options.findIndex(
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
          <div className="flex">
            <span className="text-slate-500 font-bold text-sm">
              #
              {data?.category
                .toLowerCase()
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
            <h2 className="font-bold text-2xl">{data?.question}</h2>
          </div>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-1">
            {data?.options.map((option, index) => (
              <button
                onClick={() => onOptionClick(index)}
                key={index}
                disabled={isAttempted}
                className={`p-4 text-white ${!isAttempted && "bg-black"} ${
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
                  className="text-white"
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
