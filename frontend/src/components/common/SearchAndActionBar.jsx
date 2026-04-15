export default function SearchAndActionBar({ searchValue, onSearchChange, actionLabel, onActionClick, placeholder = "Search by name..." }) {
  return (
    <div className="flex gap-2 w-full md:w-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {actionLabel && (
        <button
          onClick={onActionClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 whitespace-nowrap"
        >
          <span className="material-symbols-outlined">add</span>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
