import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import CategoryProvider from './contexts/CategoryProvider';
import AuthProvider from './contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';
import 'react-photo-view/dist/react-photo-view.css';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <CategoryProvider>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </CategoryProvider>
    </Provider>
  </React.StrictMode>
)
