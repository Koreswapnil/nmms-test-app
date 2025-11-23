import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserRegisterationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate('/test');
      console.log('User Created:', userCredential.user);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already registered. Please login instead.');
      } else {
        console.error(error.message);
      }
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl space-y-4">
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={() => signUp(email, password)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </div>
  );
};

export default UserRegisterationScreen;
