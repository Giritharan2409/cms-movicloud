export default function ActionButtons({ onView, onEdit, onDelete, onApprove, onReject }) {
  return (
    <>
      {onView && (
        <button
          onClick={onView}
          className="p-2 hover:bg-green-100 text-green-700 rounded transition"
          title="View details"
        >
          <span className="material-symbols-outlined text-lg">visibility</span>
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 hover:bg-yellow-100 text-yellow-600 rounded transition"
          title="Edit"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </button>
      )}
      {onApprove && (
        <button
          onClick={onApprove}
          className="p-2 hover:bg-green-100 text-green-600 rounded transition"
          title="Approve"
        >
          <span className="material-symbols-outlined text-lg">check_circle</span>
        </button>
      )}
      {onReject && (
        <button
          onClick={onReject}
          className="p-2 hover:bg-red-100 text-red-600 rounded transition"
          title="Reject"
        >
          <span className="material-symbols-outlined text-lg">cancel</span>
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-100 text-red-600 rounded transition"
          title="Delete"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      )}
    </>
  );
}
