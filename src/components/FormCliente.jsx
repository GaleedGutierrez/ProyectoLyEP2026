/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable unicorn/prevent-abbreviations */
// @ts-nocheck
import '@styles/formcliente.css';

import { useState } from 'react';
import {
	Alert,
	Button,
	Form,
	Modal,
	Spinner,
	Toast,
	ToastContainer,
} from 'react-bootstrap';

import clientesService from '../services/clientesService';

const FormCliente = ({ onClienteCreado }) => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [ciudad, setCiudad] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const manejarSubmit = async (e) => {
		e.preventDefault();

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
				// La tabla también busca por apellido; se conserva el formato
				// esperado por la API aunque el formulario solo solicite nombre.
				lastname: '',
			},

			address: {
				city: ciudad,
			},

			phone: telefono,
		};

		try {
			setLoading(true);

			const respuesta = await clientesService.crearCliente(nuevoCliente);

			handleClose();
			setShowToast(true);

			const clienteParaLaTabla = {
				...nuevoCliente,
				id: respuesta.id,
			};

			onClienteCreado(clienteParaLaTabla);

			setMensaje(`Cliente creado correctamente. ID: ${respuesta.id}`);

			limpiarFormulario();
		} catch (error_) {
			setError('Ocurrió un error al crear el cliente.', error_);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="formulario-cliente">
			<Button
				className="mb-3"
				variant="primary"
				onClick={handleShow}
			>
				Crear Nuevo Cliente
			</Button>

			<Modal
				centered
				show={showModal}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Nuevo Cliente</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form onSubmit={manejarSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="text"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								type="text"
								value={telefono}
								onChange={(e) => setTelefono(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Ciudad</Form.Label>
							<Form.Control
								type="text"
								value={ciudad}
								onChange={(e) => setCiudad(e.target.value)}
							/>
						</Form.Group>

						<Button
							disabled={loading}
							type="submit"
							variant="primary"
						>
							{loading ? (
								<Spinner size="sm" />
							) : (
								'Guardar Cliente'
							)}
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
				</Modal.Body>
			</Modal>
			<ToastContainer
				className="p-3"
				position="top-end"
				style={{ position: 'fixed', zIndex: 1050 }}
			>
				<Toast
					autohide
					bg="success"
					delay={3000}
					show={showToast}
					onClose={() => setShowToast(false)}
				>
					<Toast.Header>
						<strong className="me-auto">Notificación</strong>
					</Toast.Header>
					<Toast.Body className="text-white">
						Cliente creado exitosamente.
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
};

export default FormCliente;
