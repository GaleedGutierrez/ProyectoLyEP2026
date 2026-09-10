import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
 
const DetalleCliente = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargandoCliente, setCargandoCliente] = useState(true);
  const [errorCliente, setErrorCliente] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    setCargandoCliente(true);
    setErrorCliente(false);
    setMensajeError("");

    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`No se pudo encontrar el cliente con el ID ${id}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setErrorCliente(true);
          setMensajeError(`No se encontró ningún cliente asociado al ID ${id}.`);
        } else {
          setCliente(data);
        }
      })
      .catch((err) => {
        setErrorCliente(true);
        setMensajeError(err.message || "Error al intentar obtener los datos del cliente.");
      })
      .finally(() => {
        setCargandoCliente(false);
      });
  }, [id]);

  const eliminarCliente = async () => {
    try {
      const respuesta = await fetch(
        `https://fakestoreapi.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (respuesta.ok) {
        setMensaje("Cliente eliminado correctamente");

        setTimeout(() => {
          navigate("/clientes");
        }, 2000);
      }
    } catch (error) {
      setMensaje("Error al eliminar cliente");
    }
  };

  if (cargandoCliente) {
    return <h2>Cargando cliente...</h2>;
  }

  if (errorCliente || !cliente) {
    return (
      <div className="detalle-cliente contenedor-error-cliente">
        <h2 className="titulo-error-cliente">Cliente no encontrado</h2>
        <p>{mensajeError || "No se pudo obtener la información del cliente solicitado."}</p>
        <Link to="/clientes" className="btn-volver-listado">
          Volver al listado de clientes
        </Link>
      </div>
    );
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className = 'mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar'onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;