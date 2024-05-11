import React, { useEffect, useState } from "react";
import { getTriviaFromGemini } from "../../services/gemini";
import Loader from "../loader";

const Trivia: React.FC = () => {
  const [isAttempted, setIsAttempted] = useState(false);
  const [isNextQuestionLoading, setIsNextQuestionLoading] = useState(false);

  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(
    options.findIndex((option) => option === correctOption)
  );
  const [clickedOptionIndex, setClickedOptionIndex] = useState<number>(-1);

  const onOptionClick = (optionIndex: number) => {
    setClickedOptionIndex(optionIndex);
    setIsAttempted(true);
  };

  const onNexTriviaClick = () => {
    setIsAttempted(false);
    getNextTrivia();
  };

  const getNextTrivia = () => {
    setIsNextQuestionLoading(true);
    getTriviaFromGemini().then((trivia) => {
      console.log(trivia);
      setQuestion(trivia?.question);
      setOptions(trivia?.options);
      setCorrectOption(trivia?.correctOption);
      setSummary(trivia?.summary);
      setCategory(trivia?.category);
      setCorrectOptionIndex(
        trivia?.options.findIndex(
          (option: string) => option === trivia?.correctOption
        )
      );
      setIsNextQuestionLoading(false);
    });
  };

  useEffect(() => {
    getNextTrivia();
  }, []);

  return (
    <div>
      {isNextQuestionLoading && <Loader />}
      {!isNextQuestionLoading && (
        <div className="flex flex-col text-left">
          <div className="flex">
            <span className="text-slate-500 font-bold text-sm">
              #
              {category
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
            <h2 className="font-bold text-2xl">{question}</h2>
          </div>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-1">
            {options.map((option, index) => (
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
                <p className="text-slate-500">{summary}</p>
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
