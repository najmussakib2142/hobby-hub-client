import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaPlus } from "react-icons/fa";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "https://hobby-hub-server-psi-bay.vercel.app";

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`${API_URL}/myGroups?email=${user.email}`);
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        toast.error("Could not load your groups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6366F1",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/myGroups/${id}?email=${user.email}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          setGroups(prev => prev.filter(group => group._id !== id));
          Swal.fire("Deleted!", "Group has been removed.", "success");
        }
      } catch (error) {
        toast.error("Failed to delete group.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading your hobby groups...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <Helmet>
        <title>My Groups | HobbyHub</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            My Hobby Groups
          </h2>
          <p className="text-gray-500 mt-1">Manage and update the communities you've created.</p>
        </div>
        <button 
          onClick={() => navigate('/createGroup')}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <FaPlus size={14} /> Create New Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
          <div className="bg-indigo-50 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-indigo-500 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">No Groups Found</h3>
          <p className="text-gray-500 mb-6">You haven't started any hobby circles yet.</p>
          <button onClick={() => navigate('/createGroup')} className="text-indigo-600 font-bold hover:underline">
            Start your first group today →
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Group Info</th>
                  <th className="px-6 py-4 font-semibold hidden md:table-cell">Details</th>
                  <th className="px-6 py-4 font-semibold hidden lg:table-cell">Schedule</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {groups.map((group) => (
                  <tr key={group._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img 
                          src={group.image} 
                          alt="" 
                          className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-600"
                        />
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white text-lg">{group.name}</div>
                          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
                            {group.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> {group.location}</div>
                        <div className="flex items-center gap-2"><FaUsers className="text-gray-400" /> {group.maxMembers} Members</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        {new Date(group.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/updateGroup/${group._id}`)}
                          className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit Group"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(group._id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Group"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroups;