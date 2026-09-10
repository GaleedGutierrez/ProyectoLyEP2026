import '../css/header.css'
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAutorizaciones from "../hooks/useAutorizaciones";

const Header = () => {
    const { admin, cerrarSesion } = useAutorizaciones();
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
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
                            onClick={manejarCerrarSesion}
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