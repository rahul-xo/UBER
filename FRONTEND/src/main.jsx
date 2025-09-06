import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import LoginUser from './Pages/LoginUser.jsx'
import RegisterUser from './Pages/RegisterUser.jsx'
import LoginCaptain from './Pages/LoginCaptain.jsx'
import RegisterCaptain from './Pages/RegisterCaptain.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/loginUser",
        element:<LoginUser/>
      },
      {
        path:"/registerUser",
        element:<RegisterUser/>
      },
      {
        path:"loginCaptain",
        element:<LoginCaptain/>
      },
      {
        path:"/registerCaptain",
        element:<RegisterCaptain/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
