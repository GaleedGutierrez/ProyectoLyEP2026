import '@styles/header.css';

import useAutorizaciones from '@hooks/useAutorizaciones';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const { admin, cerrarSesion } = useAutorizaciones();
	const navigate = useNavigate();

	const handleLogout = () => {
		cerrarSesion();
		navigate('/login');
	};

	return (
		<Navbar className="header-principal">
			<Container className="header-container">
				<Navbar.Brand className="header-titulo">
					Panel de Control de Clientes
				</Navbar.Brand>

				{admin && (
					<div className="usuario-header">
						<p className="usuario-info">
							{admin.nombre} - {admin.sector}
						</p>

						<Button
							className="btn-header"
							onClick={handleLogout}
						>
							Cerrar Sesión
						</Button>
					</div>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
