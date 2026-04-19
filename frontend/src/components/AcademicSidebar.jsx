import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { getUserSession, destroyUserSession } from '../auth/sessionController'
import { cmsRoles, roleMenuGroups } from '../data/roleConfig'

const iconMap = {
  Dashboard: 'dashboard',
  Students: 'group',
  Faculty: 'person',
  Department: 'domain',
  Exams: 'school',
  Timetable: 'calendar_today',
  Attendance: 'rule',
  Placement: 'work',
  Facility: 'apartment',
  Fees: 'payments',
  Reports: 'assessment',
  Admission: 'person_add',
  Payroll: 'receipt_long',
  Invoices: 'description',
  Analytics: 'query_stats',
  Notifications: 'notifications',
  Settings: 'settings',
}

const routeMap = {
  Dashboard: '/dashboard',
  Students: '/students',
  Faculty: '/faculty',
  Department: '/department',
  Exams: '/exams',
  Timetable: '/timetable',
  Attendance: '/attendance',
  Placement: '/placement',
  Facility: '/facility',
  Fees: '/fees',
  Reports: '/reports',
  Admission: '/admission',
  Payroll: '/payroll',
  Invoices: '/invoices',
  Analytics: '/analytics',
  Notifications: '/notifications',
  Settings: '/settings',
}

export default function AcademicSidebar({ isSidebarVisible = true, onToggleSidebar }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const session = getUserSession()
  const role = session?.role || 'student'
  const roleMeta = cmsRoles[role] || cmsRoles.student
  const menuGroups = roleMenuGroups[role] || []

  function getRoute(item) {
    if (item === 'Fees') {
      return role === 'admin' ? '/admin-fees' : '/fees'
    }
    if (item === 'Invoices') {
      if (role === 'admin') return '/admin-invoices'
      if (role === 'finance') return '/finance-invoices'
      return '/invoices'
    }
    return routeMap[item] || '/dashboard'
  }

  function withRoleQuery(pathname) {
    return `${pathname}?role=${encodeURIComponent(role)}`
  }

  function handleLogout() {
    destroyUserSession()
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('cmsSidebarScroll')
    if (navRef.current && saved) {
      const value = Number.parseInt(saved, 10)
      if (Number.isFinite(value)) {
        navRef.current.scrollTop = value
      }
    }
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    const handleScroll = () => {
      sessionStorage.setItem('cmsSidebarScroll', String(navRef.current.scrollTop))
    }
    navRef.current.addEventListener('scroll', handleScroll)
    return () => navRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    const saved = sessionStorage.getItem('cmsSidebarScroll')
    if (saved) {
      const value = Number.parseInt(saved, 10)
      if (Number.isFinite(value)) {
        navRef.current.scrollTop = value
      }
    }
  }, [location.pathname])

  return (
    <aside style={{ background: 'linear-gradient(180deg, #1f4d1c 0%, #276221 100%)' }} className={`w-64 border-r border-slate-700 flex flex-col fixed h-full overflow-y-auto z-50 transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-5 flex items-center justify-between border-b border-slate-600/40 mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-[#276221] w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[18px] font-bold">school</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-white text-base leading-none truncate">MIT Connect</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)' }} className="text-[10px] mt-1 truncate">{roleMeta.label} Portal</p>
          </div>
        </div>
        <button
          onClick={onToggleSidebar}
          style={{ color: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="p-1 rounded-md border transition-colors flex items-center justify-center flex-shrink-0 hover:bg-white/10"
          title="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-lg font-semibold">menu</span>
        </button>
      </div>

      <nav ref={navRef} className="flex-1 px-4 space-y-6 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)' }} className="px-3 text-[10px] font-bold uppercase tracking-wider mb-2">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const route = getRoute(item)
                const to = withRoleQuery(route)
                return (
                  <NavLink
                    key={item}
                    to={to}
                    style={({ isActive }) => isActive ? {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    } : {
                      color: 'rgba(255, 255, 255, 0.75)'
                    }}
                    className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm tracking-wide transition-all duration-200 relative z-10 w-full text-left font-medium hover:bg-white/8 ${isActive ? '' : ''}`}
                  >
                    {item}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-600/40 mt-auto">
        <button
          onClick={handleLogout}
          style={{ color: '#ef4444' }}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
