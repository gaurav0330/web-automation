import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from './layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Tasks from './pages/Tasks.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/tasks", element: <Tasks /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
