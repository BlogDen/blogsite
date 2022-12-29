import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BlogsProvider } from './context/BlogContext';
import { AuthContextProvider } from './context/AuthContext';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BlogsProvider>
      <App />
    </BlogsProvider>
  </AuthContextProvider>



);

