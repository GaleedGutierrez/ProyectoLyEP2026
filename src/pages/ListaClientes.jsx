/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import '@styles/listaclientes.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FormCliente from '../components/FormCliente';
import ModalConfirmacion from '../components/ModalConfirmacion';

const ListaClientes = () => {
	const [clientes, setClientes] = useState([]);
	const [busqueda, setBusqueda] = useState('');
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

  const agregarNuevoCliente = (nuevoCliente) => {
    setClientes([nuevoCliente, ...clientes]);
  };

	const abrirModalEliminar = (cliente) => {
		setClienteSeleccionado(cliente);
		setModalAbierto(true);
	};

	const cerrarModalEliminar = () => {
		setClienteSeleccionado(null);
		setModalAbierto(false);
	};

	const eliminarClienteConfirmado = () => {
		if (!clienteSeleccionado) {
			return;
		}

		fetch(`https://fakestoreapi.com/users/${clienteSeleccionado.id}`, {
			method: 'DELETE',
		})
			.then(() => {
				setClientes((previous) =>
					previous.filter(
						(item) => item.id !== clienteSeleccionado.id,
					),
				);
				cerrarModalEliminar();
			})
			.catch(() => {
				setClientes((previous) =>
					previous.filter(
						(item) => item.id !== clienteSeleccionado.id,
					),
				);
				cerrarModalEliminar();
			});
	};

	const clientesFiltrados = clientes.filter(
		(cliente) =>
			cliente.name.lastname
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.address.city.toLowerCase().includes(busqueda.toLowerCase()),
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
  return (
    <div className="clientes-container">

      <h1>Clientes</h1>
      <FormCliente onClienteCreado={agregarNuevoCliente} />

			<div className="contenedor-buscador">
				<h2 className="titulo-buscador">Buscar Clientes</h2>

				<input
					className="buscador"
					placeholder="Buscar por apellido o ciudad"
					type="text"
					value={busqueda}
					onChange={(event_) => setBusqueda(event_.target.value)}
				/>

				<p className="cantidad-clientes">
					Clientes encontrados: {clientesFiltrados.length}
				</p>
			</div>
			<div className="tabla-responsive">
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
        <p className="cantidad-clientes">
          Clientes encontrados: {clientesFiltrados.length}
        </p>

      </div>
      <div className="tabla-responsive">

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
          <tbody>

            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>

                <td>{cliente.id}</td>

								<td>
									{cliente.name.firstname}{' '}
									{cliente.name.lastname}
								</td>
                <td>
                  {cliente.name.firstname} {cliente.name.lastname}
                </td>

								<td>{cliente.email}</td>
                <td>{cliente.email}</td>

								<td>{cliente.phone}</td>
                <td>{cliente.phone}</td>

								<td>{cliente.address.city}</td>
                <td>{cliente.address.city}</td>

								<td className="acciones-cliente">
									<Link
										className="btn-ficha"
										to={`/clientes/${cliente.id}`}
									>
										Ver Ficha Completa
									</Link>
                <td className="acciones-cliente">

                  <Link
                    className="btn-ficha"
                    to={`/clientes/${cliente.id}`}
                  >
                    Ver Ficha Completa
                  </Link>

									<button
										className="btn-eliminar"
										type="button"
										onClick={() =>
											abrirModalEliminar(cliente)
										}
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
                  <button
                    type="button"
                    className="btn-eliminar"
                    onClick={() =>
                      abrirModalEliminar(cliente)
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

			<ModalConfirmacion
				estaAbierto={modalAbierto}
				handleCancel={cerrarModalEliminar}
				handleConfirm={eliminarClienteConfirmado}
				titulo="Confirmar eliminación"
				mensaje={
					clienteSeleccionado
						? `¿Está seguro de que desea eliminar al cliente ${clienteSeleccionado.name.firstname} ${clienteSeleccionado.name.lastname}?`
						: ''
				}
			/>
		</div>
	);
};

export default ListaClientes;
