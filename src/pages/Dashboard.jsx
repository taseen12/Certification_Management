import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { oems, fetchOems, loading, user, logout } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user && (!oems || oems.length === 0)) {
      const loadOems = async () => {
        try {
          await fetchOems(user.token);
        } catch (err) {
          setError('Failed to load OEMs');
          console.error('Error loading OEMs:', err);
        }
      };
      loadOems();
    }
  }, [user, oems, fetchOems]);

  const filteredOems = oems
    .filter(oem => oem.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    console.log('Delete OEM with ID:', id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-container min-h-screen flex flex-col bg-[#475569] text-gray-100 font-sans">
      <header className="dashboard-header p-4 flex justify-between items-center bg-[#1E293B]">
        <h1 className="text-xl text-purple-300 font-semibold">CERTIFICATION</h1>
        <div className="flex items-center gap-6">
          <span>CONFIGURATION</span>
          <span>OEMS</span>
          <span>CERTIFICATIONS</span>
          <span>EMPLOYEES</span>
          <span>CERTIFICATE</span>
          <div className="flex items-center gap-4 ml-4">
            <span>🔔</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm">{user?.email}</span>
              <button 
                onClick={logout}
                className="px-3 py-1 bg-[#1E293B] border border-purple-500 text-purple-300 rounded text-sm hover:bg-purple-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content flex flex-1 p-6">
        <aside className="w-64">
          <button className="w-full bg-[#6C63FF] text-white py-3 rounded mb-8 text-center">
            Export Report
          </button>
          
          <div>
            <h3 className="text-gray-300 text-lg mb-4">Filters</h3>
            <div>
              <h4 className="text-gray-300 mb-2">OEM Name</h4>
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full px-3 py-2 bg-[#1E293B] text-gray-100 rounded focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </aside>

        <main className="flex-1 ml-6">
          <div className="overflow-x-auto">
            <table className="w-full bg-[#1E293B]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">OEM NAME</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">ADMIN</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">LEVEL</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">CERTIFICATES</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">CERTIFIED ENG.</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">PARTNERSHIP</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">PARTNER ID</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">PARTNER TYPE</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">TAG</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">NOTE</th>
                  <th className="p-2 text-left text-xs font-normal text-purple-400 bg-[#1E293B]">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredOems.map((oem, index) => (
                  <tr 
                    key={oem.id} 
                    className={`${
                      index % 2 === 0 ? 'bg-[#1E293B]' : 'bg-[#243447]'
                    } hover:bg-[#2D3748]`}
                  >
                    <td className="p-2 text-xs text-gray-300">{oem.name}</td>
                    <td className="p-2">
                      {oem.admins && oem.admins.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {oem.admins.map((admin, idx) => (
                            <span 
                              key={idx} 
                              className="bg-yellow-500 text-black text-[10px] px-1.5 py-[1px] rounded-[1px]"
                            >
                              {admin}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="bg-black text-yellow-500 text-[10px] px-1.5 py-[1px] rounded-[1px]">
                          none
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-xs text-gray-300">N/A</td>
                    <td className="p-2 text-xs text-gray-300">N/A</td>
                    <td className="p-2 text-xs text-gray-300">N/A</td>
                    <td className="p-2">
                      <span className="bg-yellow-500 text-black text-[10px] px-1.5 py-[1px] rounded-[1px]">
                        No
                      </span>
                    </td>
                    <td className="p-2 text-xs text-gray-300">N/A</td>
                    <td className="p-2 text-xs text-gray-300">N/A</td>
                    <td className="p-2">
                      <span className="bg-black text-yellow-500 text-[10px] px-1.5 py-[1px] rounded-[1px]">
                        none
                      </span>
                    </td>
                    <td className="p-2 text-xs text-gray-300">N/A</td>
                    <td className="p-2">
                      <button 
                        onClick={() => handleDelete(oem.id)}
                        className="text-red-400 text-sm hover:text-red-600"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 gap-1 text-xs">
            <button 
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              className={`px-2 text-[#6C63FF] ${currentPage === 1 ? 'opacity-50' : 'hover:text-purple-400'}`}
            >
              Prev
            </button>
            {[...Array(Math.ceil(oems.length / itemsPerPage))].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-2 ${
                  currentPage === idx + 1 
                    ? 'text-[#6C63FF] bg-[#6C63FF]/10 rounded' 
                    : 'text-gray-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              onClick={() => currentPage < Math.ceil(oems.length / itemsPerPage) && handlePageChange(currentPage + 1)}
              className={`px-2 text-[#6C63FF] ${currentPage === Math.ceil(oems.length / itemsPerPage) ? 'opacity-50' : 'hover:text-purple-400'}`}
            >
              Next
            </button>
          </div>
        </main>
      </div>

      <footer className="p-3 bg-[#9cadbe] text-black text-xs flex justify-between">
        <span>Copyright ©ESL 2024</span>
        <span>Employee Certification Management from Express Systems Ltd</span>
      </footer>
    </div>
  );
};

export default Dashboard;
