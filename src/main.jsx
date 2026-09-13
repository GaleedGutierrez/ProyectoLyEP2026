import 'bootstrap/dist/css/bootstrap.min.css';

import AutorizacionesProvider from '@context/AutorizacionesContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

const ROOT = document.querySelector('#root');

if (ROOT) {
	createRoot(ROOT).render(
		<StrictMode>
			<BrowserRouter>
				<AutorizacionesProvider>
					<App />
				</AutorizacionesProvider>
			</BrowserRouter>
		</StrictMode>,
	);
}
