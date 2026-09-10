import '../css/nav.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Nav = () => {

    const [menuAbierto, setMenuAbierto] = useState(false)

    const cerrarMenu = () => {
        setMenuAbierto(false)
    }

    return (
        <nav className="nav">

            <button
                className="nav-toggle"
                type="button"
                onClick={() =>
                    setMenuAbierto(!menuAbierto)
                }
                aria-label="Abrir menú"
                aria-expanded={menuAbierto}
            >
                ☰
            </button>

            <ul
                className={
                    `nav-lista ${menuAbierto ? 'nav-lista-abierta' : ''}`
                }
            >

                <li>
                    <NavLink
                        to="/"
                        onClick={cerrarMenu}
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/clientes"
                        onClick={cerrarMenu}
                    >
                        Clientes
                    </NavLink>
                </li>

            </ul>

        </nav>
    )
}

export default Nav