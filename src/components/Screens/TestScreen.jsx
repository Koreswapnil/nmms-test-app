import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Summary from './Summary';

const TestScreen = ({ questions, test, user }) => {
  const [userAnswer, setUserAnswer] = useState([]);
  const [isShowScore, setIsShowScore] = useState(false);
  const activeQuestionIndex = userAnswer.length;
  const quizIsComplete = questions && activeQuestionIndex === questions.length;

  const correctAnswer = questions?.map((q) => q.answers[0]) ?? [];

  const handleQuizSubmit = async () => {
    const score = questions.filter(
      (q, idx) => userAnswer[idx] === correctAnswer[idx]
    ).length;

    if (!user) {
      console.log('No user found');
      return;
    }

    try {
      const answerRef = collection(db, 'answers');
      await addDoc(answerRef, {
        test: test,
        user: user.email,
        score: score,
        createdAt: new Date(), // optional
      });
    } catch (err) {
      console.error('Error saving answer:', err);
    }
    setIsShowScore(true);
  };

  // 4️⃣ QUIZ COMPLETED - SUBMIT PAGE
  if (quizIsComplete && !isShowScore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
        <button
          onClick={handleQuizSubmit}
          className="
            bg-red-600 text-white px-8 py-3 rounded-lg 
            font-semibold shadow hover:bg-red-700 
            hover:scale-[1.02] transition
          "
        >
          Submit Test
        </button>
      </div>
    );
  }

  // 5️⃣ COMPLETED + SCORE PAGE
  if (quizIsComplete && isShowScore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 p-3">
        <div className="bg-white shadow-xl rounded-2xl p-3 w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            🎉 Quiz Completed!
          </h1>

          <Summary
            questions={questions}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
          />
        </div>
      </div>
    );
  }

  // 6️⃣ SHUFFLE OPTIONS
  const shuffledAnswers = [...questions[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="min-h-screen bg-gray-800 p-3">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow mb-2">
          TEST - {test}
        </h1>
        <p className="text-gray-300 text-lg">
          Question {activeQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Question Block */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-5 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 leading-snug">
          {questions[activeQuestionIndex].id}.{' '}
          {questions[activeQuestionIndex].text}
        </h2>

        {/* Answer Options */}
        <ul className="space-y-4">
          {shuffledAnswers.map((answer) => (
            <li
              key={answer}
              className="
                bg-gray-900 text-white rounded-xl p-4 text-lg
                hover:bg-gray-700 hover:scale-[1.01]
                transition cursor-pointer
              "
            >
              <button
                className="w-full text-left"
                onClick={() => setUserAnswer([...userAnswer, answer])}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>

        {/* Skip Button */}
        <button
          className="
            mt-6 w-full bg-yellow-500 text-black px-6 py-3 
            rounded-lg font-semibold shadow 
            hover:bg-yellow-600 hover:scale-[1.02]
            transition
          "
          onClick={() => setUserAnswer([...userAnswer, null])}
        >
          Skip Question
        </button>
      </div>
    </div>
  );
};

export default TestScreen;
