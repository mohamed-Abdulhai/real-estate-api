import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import Properties from './pages/Properties/Properties';
import Property from './pages/Property/Property';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/properties", element: <Properties/> },
  { path: "Property", element: <Property/>},
  { path: "/*", element: <NotFound /> }
]);

const App = () => {
  return (<>
      <NavBar />
      <RouterProvider router={router} />
      <Footer />
  </>
  );
};

export default App;
