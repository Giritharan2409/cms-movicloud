import TabsSection from './TabsSection';
import SearchAndActionBar from './SearchAndActionBar';
import DataTable from './DataTable';

export default function TableContentSection({
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  actionLabel,
  onActionClick,
  columns,
  rows,
  actions,
  searchPlaceholder = "Search by name...",
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder={searchPlaceholder}
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
      </div>

      {/* Data Table */}
      <DataTable columns={columns} rows={rows} actions={actions} />
    </div>
  );
}
