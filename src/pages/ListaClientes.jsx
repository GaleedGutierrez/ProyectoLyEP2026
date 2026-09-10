import "../css/listaclientes.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";
import ModalConfirmacion from "../components/ModalConfirmacion";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener clientes");
        }
        return res.json();
      })
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const abrirModalEliminar = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalAbierto(true);
  };

  const cerrarModalEliminar = () => {
    setClienteSeleccionado(null);
    setModalAbierto(false);
  };

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.name.lastname
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      cliente.address.city
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <h2>Cargando clientes...</h2>;
  }

  if (error) {
    return <h2>Error al cargar los clientes.</h2>;
  }

  return (
    <div className="clientes-container">

      <h1>Clientes</h1>
      <FormCliente />

      <hr />

      <div className="contenedor-buscador">

        <h2 className="titulo-buscador">
          Buscar Clientes
        </h2>

        <input
          className="buscador"
          type="text"
          placeholder="Buscar por apellido o ciudad"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <p className="cantidad-clientes">
          Clientes encontrados: {clientesFiltrados.length}
        </p>

      </div>
      <table className="tabla-clientes">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>

              <td>{cliente.id}</td>

              <td>
                {cliente.name.firstname} {cliente.name.lastname}
              </td>

              <td>{cliente.email}</td>

              <td>{cliente.phone}</td>

              <td>{cliente.address.city}</td>

              <td className="acciones-cliente">
                <Link
                  className="btn-ficha"
                  to={`/clientes/${cliente.id}`}
                >
                  Ver Ficha Completa
                </Link>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => abrirModalEliminar(cliente)}
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <ModalConfirmacion
        estaAbierto={modalAbierto}
        alCancelar={cerrarModalEliminar}
        alConfirmar={cerrarModalEliminar}
        titulo="Confirmar eliminación"
        mensaje={
          clienteSeleccionado
            ? `¿Está seguro de que desea eliminar al cliente ${clienteSeleccionado.name.firstname} ${clienteSeleccionado.name.lastname}?`
            : ""
        }
      />

    </div>
  );
};

export default ListaClientes;