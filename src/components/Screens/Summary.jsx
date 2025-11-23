import { useNavigate } from 'react-router-dom';

const Summary = ({ questions, userAnswer, correctAnswer }) => {
  const navigate = useNavigate();

  const score = questions.filter(
    (q, idx) => userAnswer[idx] === correctAnswer[idx]
  ).length;

  const newTestHandler = () => {
    navigate('/profile');
    userAnswer = [];
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-0">
      <button
        onClick={newTestHandler}
        className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        See All Results
      </button>

      <div className="mb-8 p-6 bg-gray-800 text-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Your Score: {score}</h1>
      </div>

      {questions.map((que, idx) => (
        <div
          key={que.id}
          className="mb-4 p-2 bg-white dark:bg-gray-900 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            {que.id}. {que.text}
          </h2>

          <div className="space-y-1 ">
            <p className="text-green-600 font-medium">
              ✓ Correct Answer: {que.answers[0]}
            </p>

            <p
              className={
                userAnswer[idx] === que.answers[0]
                  ? 'text-green-600 font-medium'
                  : 'text-red-600 font-medium'
              }
            >
              Your Answer: {userAnswer[idx] ?? 'Skipped'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Summary;
