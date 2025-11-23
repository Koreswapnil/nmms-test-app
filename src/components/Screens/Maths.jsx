import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { quizSet } from '../../questions/maths';
import { onAuthStateChanged } from 'firebase/auth';
import TestScreen from './TestScreen';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Maths = () => {
  const [test, setTest] = useState(0);
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getAnswers = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'answers'),
          where('user', '==', user.email)
        );

        const snapshot = await getDocs(q);

        const userAnswers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnswers(userAnswers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    getAnswers();
  }, [user]);

  // If a test is selected → Show Test Screen
  if (test) {
    return <TestScreen questions={quizSet[test - 1]} test={test} user={user} />;
  }

  return (
    <>
      {user ? (
        <div className="min-h-screen p-6 bg-gray-800 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-100 text-center">
            Total Tests: {quizSet.length}
          </h1>

          <ul className="w-full max-w-sm space-y-3">
            {quizSet.map((arr, index) => {
              const isCompleted = answers.some((a) => a.test === index + 1);

              return (
                <li key={index}>
                  <button
                    onClick={() => !isCompleted && setTest(index + 1)}
                    disabled={isCompleted}
                    className={`
                      w-full py-3 rounded-lg font-semibold transition duration-200
                      ${
                        isCompleted
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] text-white shadow'
                      }
                    `}
                  >
                    Test {index + 1} {isCompleted && '(Completed)'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-6">
          <div className="bg-white shadow-lg p-8 rounded-xl max-w-sm w-full text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              Please Login to Access Math Tests
            </h1>

            <Link to="/login">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Maths;
