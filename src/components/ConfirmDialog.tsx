interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <div className="confirm-dialog">
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <button className="btn btn--danger" onClick={onConfirm}>
          Да
        </button>
        <button className="btn" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;