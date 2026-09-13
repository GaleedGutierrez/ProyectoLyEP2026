const usuarios = [
	{
		email: 'antonella@gmail.com',
		password: 'Admin123',
		nombre: 'Antonella',
		sector: 'Soporte',
	},
	{
		email: 'jimena@gmail.com',
		password: 'Admin123',
		nombre: 'Jimena',
		sector: 'Gerencia',
	},
	{
		email: 'maia@gmail.com',
		password: 'Admin123',
		nombre: 'Maia',
		sector: 'Gerencia',
	},
	{
		email: 'abril@gmail.com',
		password: 'Admin123',
		nombre: 'Abril',
		sector: 'Soporte',
	},
	{
		email: 'guadalupe@gmail.com',
		password: 'Admin123',
		nombre: 'Guadalupe',
		sector: 'Soporte',
	},
	{
		email: 'lourdes@gmail.com',
		password: 'Admin123',
		nombre: 'Lourdes',
		sector: 'Gerencia',
	},
];

/**
 *
 * @param {string} email
 * @param {string} password
 * @param {string} sector
 * @returns
 */
const login = (
	/** @type {string} */ email,
	/** @type {string} */ password,
	/** @type {string} */ sector,
) =>
	usuarios.find(
		(usuario) =>
			usuario.email === email &&
			usuario.password === password &&
			usuario.sector === sector,
	);

export default {
	login,
};
