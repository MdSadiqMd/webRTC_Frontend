import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { SocketProvider } from './context/SocketContext.tsx';

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
