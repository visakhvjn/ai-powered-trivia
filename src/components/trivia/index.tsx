import React, { useEffect, useState } from "react";

type TriviaProps = {
  question: string;
  options: string[];
  correctOption: string;
  description: string;
};

const Trivia: React.FC<TriviaProps> = ({
  question,
  options,
  correctOption,
  description,
}) => {
  const [isAttempted, setIsAttempted] = useState(false);
  const [correctOptionIndex] = useState<number>(
    options.findIndex((option) => option === correctOption)
  );
  const [clickedOptionIndex, setClickedOptionIndex] = useState<number>(-1);

  const onOptionClick = (optionIndex: number) => {
    setClickedOptionIndex(optionIndex);
    setIsAttempted(true);
  };

  const onNexTriviaClick = () => {
    setIsAttempted(false);
  };

  useEffect(() => {
    console.log(clickedOptionIndex, correctOptionIndex);
  }, [clickedOptionIndex, correctOptionIndex]);

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h2 className="font-bold text-2xl">{question}</h2>
      </div>
      <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-1">
        {options.map((option, index) => (
          <button
            onClick={() => onOptionClick(index)}
            key={index}
            disabled={isAttempted}
            className={`p-4 ${
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
          <div className="p-4 mt-2">
            <p className="text-md text-wrap">{description}</p>
          </div>
          <div>
            <button onClick={onNexTriviaClick}>Next Question</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trivia;
