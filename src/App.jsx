import './App.css';
import RootLayout from './RootLayout/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feeds from './pages/Feeds/Feeds';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import ErrorPage from './pages/Errorpage/ErrorPage';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Feeds />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path:"/signup",
          element:<SignUp />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path:"/dashboard",
          element: <Dashboard />, 
        }
      ],
    },
  ]);
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
