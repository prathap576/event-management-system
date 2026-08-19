import "./DeleteModal.css";

function DeleteModal({
  event,
  onCancel,
  onConfirm,
  loading = false,
}) {

  if (!event) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          ⚠️
        </div>

        <h2>Delete Event?</h2>

        <p>
          Are you sure you want to delete
          <strong> "{event.title}"</strong>?
        </p>

        <span className="delete-warning">
          This action cannot be undone.
        </span>

        <div className="modal-actions">

          <button
            className="modal-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="modal-delete"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Event"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;