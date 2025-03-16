import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    category: "Physical Attributes",
    id: 1,
    text: "What is your body frame?",
    options: ["Thin", "Medium", "Large"],
  },
  {
    category: "Physical Attributes",
    id: 2,
    text: "How would you describe your skin type?",
    options: ["Dry", "Oily", "Normal"],
  },
  {
    category: "Physical Attributes",
    id: 3,
    text: "What is the texture of your hair?",
    options: ["Thin & Dry", "Soft & Silky", "Thick & Wavy"],
  },
  {
    category: "Physical Attributes",
    id: 4,
    text: "What best describes your body weight?",
    options: ["Underweight", "Normal", "Overweight"],
  },

  {
    category: "Psychological & Behavioral Traits",
    id: 5,
    text: "How do you react to stress?",
    options: ["Easily", "Moderately", "Not Well"],
  },
  {
    category: "Psychological & Behavioral Traits",
    id: 6,
    text: "How is your mood usually?",
    options: ["Anxious & Restless", "Short-tempered", "Calm & Content"],
  },
  {
    category: "Psychological & Behavioral Traits",
    id: 7,
    text: "How is your sleep pattern?",
    options: ["Light & Disturbed", "Moderate", "Deep & Long"],
  },
  {
    category: "Psychological & Behavioral Traits",
    id: 8,
    text: "How often do you dream vividly?",
    options: ["Very Often", "Sometimes", "Rarely"],
  },

  {
    category: "Physiological Characteristics",
    id: 9,
    text: "How often do you feel hungry?",
    options: ["Very Often", "Sometimes", "Rarely"],
  },
  {
    category: "Physiological Characteristics",
    id: 10,
    text: "What is your usual body temperature?",
    options: ["Warm", "Cold", "Neutral"],
  },
  {
    category: "Physiological Characteristics",
    id: 11,
    text: "How is your digestion?",
    options: ["Fast", "Moderate", "Slow"],
  },
  {
    category: "Physiological Characteristics",
    id: 12,
    text: "How is your body energy level?",
    options: ["High & Erratic", "Steady & Moderate", "Slow & Stable"],
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [questions[currentQuestion].text]: answer };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results", { state: { answers: updatedAnswers } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-lg font-bold text-gray-800">{questions[currentQuestion].category}</h2>
        <h3 className="text-xl text-black font-semibold mt-2">{questions[currentQuestion].text}</h3>
        <div className="mt-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="block w-full px-4 py-2 my-2 text-lg bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
