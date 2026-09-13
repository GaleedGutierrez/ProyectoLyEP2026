import Dashboard from '@pages/Dashboard';
import DetalleCliente from '@pages/DetalleCliente';
import ErrorPage from '@pages/ErrorPage';
import ListaClientes from '@pages/ListaClientes';
import Login from '@pages/Login';
import { Route, Routes } from 'react-router-dom';

import PrivateLayout from '../layouts/PrivateLayout';
import PublicLayout from '../layouts/PublicLayout';

const AppRoutes = () => (
	<Routes>
		<Route element={<PublicLayout />}>
			<Route
				element={<Login />}
				path="/login"
			/>
			<Route
				element={<ErrorPage />}
				path="*"
			/>
		</Route>
		<Route element={<PrivateLayout />}>
			<Route
				element={<Dashboard />}
				path="/"
			/>
			<Route
				element={<ListaClientes />}
				path="/clientes"
			/>
			<Route
				element={<DetalleCliente />}
				path="/clientes/:id"
			/>
		</Route>
	</Routes>
);

export default AppRoutes;
