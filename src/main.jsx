import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import CategoryProvider from './contexts/CategoryProvider';
import AuthProvider from './contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CategoryProvider>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </CategoryProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
