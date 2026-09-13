import '@styles/formcliente.css';

import clientesService from '@services/clientesService';
import { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

const FormCliente = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [ciudad, setCiudad] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleFormSubmit = async (
		/** @type {{ preventDefault: () => void; }} */ event_,
	) => {
		event_.preventDefault();

		setMensaje('');
		setError('');

		const limpiarFormulario = () => {
			setNombre('');
			setEmail('');
			setTelefono('');
			setCiudad('');
		};

		const nuevoCliente = {
			email,

			username: nombre.toLowerCase().replace(/\s/g, ''),

			//Se envía sin password porque los clientes no tienen acceso al sistema

			name: {
				firstname: nombre,
				//Se envia sin lastname porque no se pide en el formulario
			},

			address: {
				city: ciudad,
			},

			phone: telefono,
		};

		try {
			setLoading(true);

			const respuesta = await clientesService.crearCliente(nuevoCliente);

			setMensaje(`Cliente creado correctamente. ID: ${respuesta.id}`);

			limpiarFormulario();
		} catch (error_) {
			if (error_ instanceof Error) {
				setError(
					`Ocurrió un error al crear el cliente: ${error_.message}`,
				);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="formulario-cliente">
			<h3>Nuevo Cliente</h3>

			<Form onSubmit={handleFormSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Nombre</Form.Label>

					<Form.Control
						required
						type="text"
						value={nombre}
						onChange={(event_) => setNombre(event_.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>

					<Form.Control
						required
						type="email"
						value={email}
						onChange={(event_) => setEmail(event_.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Teléfono</Form.Label>

					<Form.Control
						required
						type="text"
						value={telefono}
						onChange={(event_) => setTelefono(event_.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Ciudad</Form.Label>

					<Form.Control
						required
						type="text"
						value={ciudad}
						onChange={(event_) => setCiudad(event_.target.value)}
					/>
				</Form.Group>

				<Button
					disabled={loading}
					type="submit"
					variant="primary"
				>
					{loading ? <Spinner size="sm" /> : 'Guardar Cliente'}
				</Button>
			</Form>

			{mensaje && (
				<Alert
					className="mt-3"
					variant="success"
				>
					{mensaje}
				</Alert>
			)}

			{error && (
				<Alert
					className="mt-3"
					variant="danger"
				>
					{error}
				</Alert>
			)}
		</div>
	);
};

export default FormCliente;
