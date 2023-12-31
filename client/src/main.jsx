import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/SettingsPage/settings.jsx';
import Workout from './pages/Workout/WorkoutPage.jsx';
import NotFound from './pages/NotFound.jsx';
import Signup from './pages/Signup'
import Login from './pages/Login'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path:'/settings',
        element:<Settings />
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/workout',
        element:<Workout />
      },
      {
        path:'/workout/:workoutId',
        element: <Workout />
      },
      {
        path:'/profile/:userId',
        element: <Profile />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
