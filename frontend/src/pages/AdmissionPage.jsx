import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { useAdmission } from '../context/AdmissionContext';
import AddMemberModal from '../components/AddMemberModal';
import AdmissionDetailsModal from '../components/AdmissionDetailsModal';
import { PageContainer, StatsSection, StatusBadge, ActionButtons } from '../components/common';

export default function AdmissionPage() {
  const {
    studentApps,
    facultyApps,
    updateStudentStatus,
    updateFacultyStatus,
    deleteStudentApp,
    deleteFacultyApp,
  } = useAdmission();

  const [activeTab, setActiveTab] = useState('students');
  const [searchName, setSearchName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredApps = useMemo(() => {
    let apps = activeTab === 'students' ? studentApps : facultyApps;
    
    return apps.map(app => {
      if (activeTab === 'faculty' || app.designation) {
        return {
          ...app,
          role: app.designation || app.role,
          experience: app.yearsOfExperience,
          highestQualification: app.qualification,
        };
      }
      return app;
    }).filter((app) =>
      app.name?.toLowerCase().includes(searchName.toLowerCase()) ||
      app.fullName?.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [activeTab, studentApps, facultyApps, searchName]);

  const stats = [
    { value: studentApps.length, label: 'Total Student Adm', icon: 'group' },
    { value: facultyApps.length, label: 'Total Faculty', icon: 'person' },
    {
      value:
        studentApps.filter((a) => a.status === 'Approved').length +
        facultyApps.filter((a) => a.status === 'Approved').length,
      label: 'Approved',
      icon: 'check_circle',
    },
    {
      value:
        studentApps.filter((a) => a.status === 'Rejected').length +
        facultyApps.filter((a) => a.status === 'Rejected').length,
      label: 'Rejected',
      icon: 'cancel',
    },
  ];

  const handleApprove = (id) => {
    if (activeTab === 'students') {
      updateStudentStatus(id, 'Approved');
    } else {
      updateFacultyStatus(id, 'Approved');
    }
  };

  const handleReject = (id) => {
    if (activeTab === 'students') {
      updateStudentStatus(id, 'Rejected');
    } else {
      updateFacultyStatus(id, 'Rejected');
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this application?')) {
      if (activeTab === 'students') {
        deleteStudentApp(id);
      } else {
        deleteFacultyApp(id);
      }
    }
  };

  const handleView = (app) => {
    setSelectedApp({
      ...app,
      type: activeTab === 'students' ? 'student' : 'faculty',
    });
    setShowDetailsModal(true);
  };

  const getValue = (field) => {
    if (typeof field === 'string') return field;
    if (typeof field === 'object' && field !== null) {
      return field.course || field.name || field.value || JSON.stringify(field);
    }
    return '';
  };

  return (
    <Layout title="Admission Management">
      <PageContainer>
        {/* Stats Section */}
        <StatsSection stats={stats} />

        {/* Tabs and Table Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex gap-2">
              {['students', 'faculty'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchName('');
                  }}
                  className={`px-4 py-2 font-medium rounded-lg transition-all ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span>
                Add Member
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    {activeTab === 'students' ? 'Application ID' : 'Employee ID'}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    {activeTab === 'students' ? 'Course' : 'Role'}
                  </th>
                  {activeTab === 'faculty' && (
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{app.id}</td>
                    <td className="py-3 px-4 text-gray-700">{app.name || app.fullName}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {activeTab === 'students' ? getValue(app.course) : getValue(app.role)}
                    </td>
                    {activeTab === 'faculty' && (
                      <td className="py-3 px-4 text-gray-700">{getValue(app.department)}</td>
                    )}
                    <td className="py-3 px-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status="Pending" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <ActionButtons
                          onView={() => handleView(app)}
                          onApprove={app.status === 'Pending' ? () => handleApprove(app.id) : null}
                          onReject={app.status === 'Pending' ? () => handleReject(app.id) : null}
                          onDelete={() => handleDelete(app.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredApps.length === 0 && (
              <div className="text-center py-8 text-gray-500">No applications found</div>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Modals */}
      {showAddModal && (
        <AddMemberModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          type={activeTab === 'students' ? 'student' : 'faculty'}
        />
      )}

      {showDetailsModal && selectedApp && (
        <AdmissionDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          application={selectedApp}
        />
      )}
    </Layout>
  );
}
