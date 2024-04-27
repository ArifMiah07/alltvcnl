import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
// import router from './routes/Routes.jsx'
// import AuthProvider from './providers/AuthProvider'
import router from './Routes/Routes'
import { HelmetProvider } from 'react-helmet-async'
// import { HoverProvider } from './Contexts/HoverContext'
import { BannerProvider } from './Contexts/BannerContext'
// import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BannerProvider>
        <HelmetProvider>
          <RouterProvider router={router}>      
          </RouterProvider>
        </HelmetProvider>
      </BannerProvider>
    {/* <AuthProvider>
    </AuthProvider> */}
      
  </React.StrictMode>,
)