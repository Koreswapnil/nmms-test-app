import { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate('/test');

      console.log('Logged In:', userCredential.user);
      alert('Login successful!');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else if (error.code === 'auth/invalid-credential') {
        alert('Invalid email or password.');
      } else {
        alert(error.message);
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
          border border-gray-300 
          p-3 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          transition
        "
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
          border border-gray-300 
          p-3 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          transition
        "
          />

          <button
            onClick={() => signIn(email, password)}
            className="
          bg-green-600 
          text-white 
          py-3 
          rounded-lg 
          font-semibold
          shadow 
          hover:bg-green-700 
          hover:scale-[1.02]
          transition 
          duration-200
        "
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
