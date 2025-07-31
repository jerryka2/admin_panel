import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AdminContextProvider from './context/AdminContext.jsx'; // Fixed name
import AppContextProvider from './context/AppContext.jsx';
import StationContextProvider from './context/StationContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider> {/* Fixed name here */}
      <StationContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </StationContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
