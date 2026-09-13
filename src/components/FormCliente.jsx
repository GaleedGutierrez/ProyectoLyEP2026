import '../css/formcliente.css'
import { useState } from "react";
import { Form, Button, Alert, Spinner, Modal } from "react-bootstrap";
import clientesService from "../services/clientesService";

const FormCliente = ({ onClienteCreado }) => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        if (
            nombre.trim() === "" ||
            email.trim() === "" ||
            telefono.trim() === "" ||
            ciudad.trim() === ""
        ) {

            setError("Complete todos los campos.");

            return;
        }

        const nuevoCliente = {

            email,

            username: nombre.toLowerCase().replace(/\s/g, ""),

            password: "1234",

            name: {
                firstname: nombre,
                lastname: "-"
            },

            address: {
                city: ciudad
            },

            phone: telefono
        };

        try {

            setLoading(true);

            const respuesta =
                await clientesService.crearCliente(nuevoCliente);

            handleClose();

            const clienteParaLaTabla = {
                ...nuevoCliente,
                id: respuesta.id
            };

            onClienteCreado(clienteParaLaTabla);


            setMensaje(
                `Cliente creado correctamente. ID: ${respuesta.id}`
            );

            setNombre("");
            setEmail("");
            setTelefono("");
            setCiudad("");

        } catch {

            setError(
                "Ocurrió un error al crear el cliente."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className='formulario-cliente'>
            <Button variant="primary" onClick={handleShow} className="mb-3">
                Crear Nuevo Cliente
            </Button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Cliente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={manejarSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Guardar Cliente"}
                        </Button>
                    </Form>

                    {mensaje && <Alert className="mt-3" variant="success">{mensaje}</Alert>}
                    {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FormCliente;