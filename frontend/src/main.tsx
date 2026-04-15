import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/global.css'
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ThemeProvider from "@/components/ThemeProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
