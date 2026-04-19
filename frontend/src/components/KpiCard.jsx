/**
 * KpiCard Component
 * Standardized KPI/Statistic Card used across all pages
 * 
 * Design Reference: Admission Management Page
 * - Consistent sizing and layout
 * - Icon in rounded background (top-left)
 * - Large bold value
 * - Small muted label
 * - Color-coded backgrounds
 */

export default function KpiCard({ 
  icon, 
  label, 
  value,
  colorScheme = 'blue'
}) {
  // Consistent color scheme across all KPI cards
  const colorSchemes = {
    blue: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: 'bg-green-100'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      icon: 'bg-green-100'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-600',
      icon: 'bg-emerald-100'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      icon: 'bg-red-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      icon: 'bg-purple-100'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      icon: 'bg-orange-100'
    },
    cyan: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      text: 'text-cyan-600',
      icon: 'bg-cyan-100'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      icon: 'bg-amber-100'
    }
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.blue;

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 transition-all duration-300 hover:shadow-md`}>
      {/* Icon Container - Top Left */}
      <div className={`${colors.icon} ${colors.text} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      
      {/* Value - Large and Bold */}
      <p className={`text-3xl font-bold ${colors.text} mb-2`}>{value}</p>
      
      {/* Label - Small and Muted */}
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}
