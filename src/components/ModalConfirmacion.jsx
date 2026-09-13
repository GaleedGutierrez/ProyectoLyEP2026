import '@styles/modal.css';

/**
 * Modal to confirm an action.
 * @param {Object} props - The component props.
 * @param {boolean} props.estaAbierto - Whether the modal is open.
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.handleConfirm - Function to call when confirming.
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.handleCancel - Function to call when canceling.
 * @param {string} props.titulo - The title of the modal.
 * @param {string} props.mensaje - The message of the modal.
 * @returns The modal component or null if not open.
 */
const ModalConfirmacion = ({
	estaAbierto,
	handleConfirm,
	handleCancel,
	titulo,
	mensaje,
}) => {
	if (!estaAbierto) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-contenedor">
				<h3 className="modal-titulo">{titulo}</h3>
				<p className="modal-mensaje">{mensaje}</p>
				<div className="modal-acciones">
					<button
						className="btn-modal-cancelar"
						type="button"
						onClick={handleCancel}
					>
						Cancelar
					</button>
					<button
						className="btn-modal-confirmar"
						type="button"
						onClick={handleConfirm}
					>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirmacion;
