import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './components/Screens/HomeScreen';
import LoginScreen from './components/Screens/LoginScreen';
import UserRegisterationScreen from './components/Screens/UserRegisterationScreen';
import ProfileScreen from './components/Screens/ProfileScreen';
import Maths from './components/Screens/Maths';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/signup" element={<UserRegisterationScreen />} />
      <Route path="/test" element={<Maths />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
