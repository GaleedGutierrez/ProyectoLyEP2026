import "../css/modal.css";

const ModalConfirmacion = ({ estaAbierto, alConfirmar, alCancelar, titulo, mensaje }) => {
  if (!estaAbierto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenedor">
        <h3 className="modal-titulo">{titulo}</h3>
        <p className="modal-mensaje">{mensaje}</p>
        <div className="modal-acciones">
          <button
            type="button"
            className="btn-modal-cancelar"
            onClick={alCancelar}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-modal-confirmar"
            onClick={alConfirmar}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
