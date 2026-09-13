import '@styles/nav.css';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
	const [menuAbierto, setMenuAbierto] = useState(false);

	const handleCloseMenu = () => {
		setMenuAbierto(false);
	};

	return (
		<nav className="nav">
			<button
				aria-expanded={menuAbierto}
				aria-label="Abrir menú"
				className="nav-toggle"
				type="button"
				onClick={() => setMenuAbierto(!menuAbierto)}
			>
				☰
			</button>

			<ul
				className={`nav-lista ${menuAbierto ? 'nav-lista-abierta' : ''}`}
			>
				<li>
					<NavLink
						to="/"
						onClick={handleCloseMenu}
					>
						Dashboard
					</NavLink>
				</li>

				<li>
					<NavLink
						to="/clientes"
						onClick={handleCloseMenu}
					>
						Clientes
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
