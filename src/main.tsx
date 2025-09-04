//import App from '@/App';
//import initMSW from '@/mock';
//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
function createRootElement() {
  createRoot(document.getElementById('root')!).render(
    <div>Table Master</div>
  );
}

  createRootElement();