import Footer from '@components/Footer';
import Header from '@components/Header';
import Nav from '@components/Nav';
import RutaProtegida from '@components/RutaProtegida';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => (
	<RutaProtegida>
		<Header />
		<Nav />
		<Outlet />
		<Footer />
	</RutaProtegida>
);

export default PrivateLayout;
