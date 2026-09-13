import { Navigate } from 'react-router-dom';

import useAutorizaciones from '../hooks/useAutorizaciones';

/**
 * A component that protects a route by checking if the user is authenticated.
 * If the user is not authenticated, it redirects to the login page.
 * @param {{children: import('react').ReactNode}	} param
 * @returns The children components if the user is authenticated, otherwise a redirect to the login page.
 */
const RutaProtegida = ({ children }) => {
	const { admin } = useAutorizaciones();

	if (!admin) {
		return (
			<Navigate
				replace
				to="/login"
			/>
		);
	}

	return children;
};

export default RutaProtegida;
