export default function StatsSection({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const colors = [
          { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: 'bg-blue-100' },
          { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'bg-green-100' },
          { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', icon: 'bg-emerald-100' },
          { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', icon: 'bg-red-100' },
        ];
        const color = colors[index % 4];
        
        return (
          <div key={stat.label} className={`${color.bg} border ${color.border} rounded-lg p-6`}>
            <div className={`w-12 h-12 ${color.icon} rounded-lg flex items-center justify-center mb-3`}>
              <span className={`material-symbols-outlined ${color.text}`}>{stat.icon}</span>
            </div>
            <p className={`text-3xl font-bold ${color.text} mb-1`}>{stat.value}</p>
            <p className="text-sm font-medium text-gray-700">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
