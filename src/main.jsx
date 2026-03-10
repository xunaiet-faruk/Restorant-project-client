import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Component/Routes/Router';
import AuthProbider from './Authentication/Provider/AuthProbider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProbider>
      <RouterProvider router={router} />
    </AuthProbider>

  </StrictMode>,
)
