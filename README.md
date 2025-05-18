## main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

## App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ChatbotPage from './pages/ChatbotPage';
import FeedbackPage from './pages/FeedbackPage';
import DashboardPage from './pages/DashboardPage';
import { PreferencesProvider } from './context/PreferencesContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="preferences" element={<PreferencesPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="chat" element={<ChatbotPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
