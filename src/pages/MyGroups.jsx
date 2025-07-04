import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  // Fetch groups created by this logged-in user
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/myGroups?email=${user.email}`)
        .then(res => res.json())
        .then(data => setGroups(data))
        .catch(err => console.error("Failed to fetch groups:", err));
    }
  }, [user]);

  // Handle Update Button
  const handleUpdate = (id) => {
    navigate(`/updateGroup/${id}`);
  };

  // Handle Delete Button
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myGroups/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            // console.log('after delete', data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your group has been deleted.", "success");
              setGroups(prevGroups => prevGroups.filter(group => group._id !== id));
            }
          })
          .catch(error => console.error("Delete failed:", error));
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-10 py-10">
      <Helmet>
        <title>HobbyHub || My Groups</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🎨 My Hobby Groups
      </h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700">
            <tr>
              <th className="border px-4 py-3">#</th>
              <th className="border px-4 py-3">Image</th>
              <th className="border px-4 py-3">Group Name</th>
              <th className="border px-4 py-3">Category</th>
              <th className="border px-4 py-3">Location</th>
              <th className="border px-4 py-3">Members</th>
              <th className="border px-4 py-3">Start Date</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <tr key={group._id} className="hover:bg-gray-50 transition-all">
                  <td className="border px-4 py-3 font-medium text-center">{index + 1}</td>
                  <td className="border px-2 py-2">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-16 h-16 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="border px-4 py-3 text-gray-800 font-semibold">{group.name}</td>
                  <td className="border px-4 py-3 text-gray-600">{group.category}</td>
                  <td className="border px-4 py-3 text-gray-600">{group.location}</td>
                  <td className="border px-4 py-3 text-gray-600 text-center">{group.maxMembers}</td>
                  <td className="border px-4 py-3 text-gray-600">{group.startDate}</td>
                  <td className="border px-4 py-3 space-y-1 flex flex-col items-center">
                    <button
                      onClick={() => handleUpdate(group._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-5">
                  No groups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGroups;
