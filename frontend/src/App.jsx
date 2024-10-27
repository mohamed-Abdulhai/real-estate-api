import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Register from './pages/Register/Register';


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reset-password", element: <ResetPassword /> },
  // { path: "*", element: <NotFound /> }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
