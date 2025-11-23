import { useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch answers for this user
  useEffect(() => {
    const getAnswers = async () => {
      if (!user) return;

      try {
        // 🔥 Query Firestore for logged in user's answers
        const q = query(
          collection(db, 'answers'),
          where('user', '==', user.email)
        );

        const querySnapshot = await getDocs(q);

        const userAnswers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnswers(userAnswers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    getAnswers();
  }, [user]); // runs when user becomes available

  if (!user) return <h2>Loading profile...</h2>;

  const newTestHandler = () => {
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-800 text-white p-8 rounded-2xl shadow-lg border border-gray-700">
        {/* Profile Header */}
        <h2 className="text-3xl font-bold mb-2 text-center">User Profile</h2>
        <p className="text-gray-300 text-center mb-8">Email: {user.email}</p>

        {/* Test Results */}
        <h3 className="text-2xl font-semibold mb-4">Your Test Results</h3>

        {answers.length === 0 ? (
          <p className="text-gray-400 bg-gray-700 p-4 rounded-lg text-center">
            No tests found.
          </p>
        ) : (
          <ul className="space-y-4">
            {answers.map((a) => (
              <li
                key={a.id}
                className="p-4 bg-gray-700 rounded-xl shadow hover:bg-gray-600 transition-all"
              >
                <p className="text-lg font-medium">
                  <span className="text-blue-400">Test:</span> {a.test}
                </p>
                <p className="text-lg font-medium">
                  <span className="text-green-400">Score:</span> {a.score}
                </p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={newTestHandler}
          className="m-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          New Test
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
