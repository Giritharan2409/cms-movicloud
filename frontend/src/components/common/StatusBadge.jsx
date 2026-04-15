const statusColors = {
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Pending: 'bg-orange-100 text-orange-800',
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Completed: 'bg-blue-100 text-blue-800',
  InProgress: 'bg-yellow-100 text-yellow-800',
  Draft: 'bg-slate-100 text-slate-800',
};

export default function StatusBadge({ status, customColors = {} }) {
  const colors = { ...statusColors, ...customColors };
  const statusClass = colors[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
      {status}
    </span>
  );
}
