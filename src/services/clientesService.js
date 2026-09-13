/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';

const URL = 'https://fakestoreapi.com/users';

const crearCliente = async (cliente) => {
	const respuesta = await axios.post(URL, cliente);

	return respuesta.data;
};

export default {
	crearCliente,
};
