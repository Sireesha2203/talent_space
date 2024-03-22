import './App.css';
import RootLayout from './RootLayout/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import ErrorPage from './pages/Errorpage/ErrorPage';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Learning from './components/Learning/Learning';
import Network from './components/Network/Network'
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile'
import SharePost from './components/Home/SharePost'
import CollaboratePost from './components/Home/CollaboratePost'
import FormComponent from './pages/Dashboard/FormComponent';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path:'/form',
          element:<FormComponent/>
        },
        {
          path: "/SharePost",
          element: <SharePost />,
        },
        {
          path: "/CollaboratePost",
          element: <CollaboratePost />,
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
        },
        {
          path: "/learning",
          element:<Learning/>
        },
        {
          path : "/network",
          element : <Network/>
        },
        {
          path : "/profile",
          element : <Profile/>
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