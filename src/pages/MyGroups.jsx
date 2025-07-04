import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// import { FaSpinner } from "react-icons/fa";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/myGroups?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setGroups(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch groups:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleUpdate = (id) => {
    navigate(`/updateGroup/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1F1A70",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myGroups/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your group has been deleted.", "success");
              setGroups(initialGroups => initialGroups.filter(group => group._id !== id));
            }
          })
          .catch(error => console.error("Delete failed:", error));
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <Helmet>
        <title>HobbyHub || My Groups</title>
      </Helmet>

      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        🎨 My Hobby Groups
      </h2>

      {loading ? (
        <div className='min-h-screen  flex items-center justify-center'>
          <span className="loading text-[#1F1A70] loading-dots loading-xl"></span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-primary">
          <table className="table-auto w-full text-left">
            <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800">
              <tr>
                <th className="border border-primary px-4 py-3">#</th>
                <th className="border border-primary px-4 py-3">Image</th>
                <th className="border border-primary px-4 py-3">Group Name</th>
                <th className="border border-primary px-4 py-3">Category</th>
                <th className="border border-primary px-4 py-3">Location</th>
                <th className="border border-primary px-4 py-3">Members</th>
                <th className="border border-primary px-4 py-3">Start Date</th>
                <th className="border border-primary px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.length > 0 ? (
                groups.map((group, index) => (
                  <tr key={group._id} className="hover:bg-gray-50 transition-all">
                    <td className="border border-primary px-4 py-3 text-center font-semibold">{index + 1}</td>
                    <td className="border border-primary px-2 py-2">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className="border border-primary px-4 py-3 font-medium text-gray-900">{group.name}</td>
                    <td className="border border-primary px-4 py-3 text-gray-700">{group.category}</td>
                    <td className="border border-primary px-4 py-3 text-gray-700">{group.location}</td>
                    <td className="border border-primary px-4 py-3 text-center text-gray-700">{group.maxMembers}</td>
                    <td className="border border-primary px-4 py-3 text-gray-700">{group.startDate}</td>
                    <td className="border border-primary px-4 py-3 flex flex-col space-y-2 items-center">
                      <button
                        onClick={() => handleUpdate(group._id)}
                        className="bg-primary hover:bg-indigo-800 text-white px-3 py-1.5 rounded text-sm w-24 transition-all"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(group._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm w-24 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-8 text-lg">
                    No groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
