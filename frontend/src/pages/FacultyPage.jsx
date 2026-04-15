import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FacultyTable from '../components/FacultyTable';
import SearchFilter from '../components/SearchFilter';
import AddEditFacultyModal from '../components/AddEditFacultyModal';
import { PageContainer, StatsSection } from '../components/common';
import '../styles.css';

const API_BASE_URL = '/api';

export default function FacultyPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/faculty`);
      if (!response.ok) throw new Error('Failed to fetch faculty');
      const data = await response.json();
      setFacultyList(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching faculty:', err);
      setError(err.message);
      setFacultyList([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = facultyList.filter(faculty =>
    faculty.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.employeeId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredFaculty.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleEditFaculty = (faculty) => {
    setEditingFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleDeleteFaculty = async (faculty) => {
    if (!window.confirm(`Are you sure you want to delete ${faculty.name}?`)) return;
    
    try {
      const facultyId = faculty._id || faculty.id || faculty.employeeId;
      const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFacultyList(facultyList.filter(f => f._id !== faculty._id && f.employeeId !== faculty.employeeId));
        alert('Faculty member deleted successfully');
      } else {
        alert('Failed to delete faculty member');
      }
    } catch (err) {
      console.error('Error deleting faculty:', err);
      alert('Error deleting faculty member');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingFaculty(null);
  };

  const handleModalSuccess = async () => {
    setIsModalOpen(false);
    setEditingFaculty(null);
    await fetchFaculty();
  };

  const activeFaculty = facultyList.filter(f => f.employment_status === 'Active').length;
  const onLeave = facultyList.filter(f => f.employment_status === 'On-Leave').length;
  const departmentsCount = new Set(facultyList.map((f) => f.department_id || f.departmentId)).size;

  const stats = [
    { value: loading ? '...' : facultyList.length, label: 'Total Faculty', icon: 'group' },
    { value: loading ? '...' : activeFaculty, label: 'Active Members', icon: 'bolt' },
    { value: loading ? '...' : departmentsCount, label: 'Departments', icon: 'domain' },
    { value: loading ? '...' : onLeave, label: 'On Leave', icon: 'schedule' },
  ];

  return (
    <Layout title="Faculty Directory">
      <PageContainer>
        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Search and Filter */}
        <div className="mb-6">
          <SearchFilter 
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            placeholder="Search faculty by name, ID, or email..."
            onAddClick={() => setIsModalOpen(true)}
          />
        </div>

        {/* Error State */}
        {error ? (
          <div className="bg-red-50 border border-red-100 rounded-lg p-8 text-center">
            <span className="material-symbols-outlined text-red-400 text-5xl mb-4">cloud_off</span>
            <h3 className="text-lg font-bold text-red-900">Connection Error</h3>
            <p className="text-red-700 mt-1 max-w-sm mx-auto">{error}</p>
            <button 
              onClick={fetchFaculty}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : loading ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow p-6">
            <div className="w-full h-96 flex flex-col items-center justify-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-slate-100 rounded-full" />
              <div className="w-48 h-4 bg-slate-100 rounded" />
              <div className="w-32 h-3 bg-slate-50 rounded" />
            </div>
          </div>
        ) : (
          <FacultyTable 
            faculty={paginatedFaculty}
            onEdit={handleEditFaculty}
            onDelete={handleDeleteFaculty}
          />
        )}
      </PageContainer>

      {/* Modal */}
      {isModalOpen && (
        <AddEditFacultyModal 
          faculty={editingFaculty}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </Layout>
  );
}
