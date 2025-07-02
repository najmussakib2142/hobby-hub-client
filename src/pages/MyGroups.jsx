import React from "react";
import { useLoaderData, useNavigate } from "react-router"; 

const MyGroups = () => {
  const groups = useLoaderData();
//   console.log(groups);

  const navigate = useNavigate()

  const handleUpdate = (id) => {
    console.log("Update group with ID:", id);
    // navigate or open modal here
    navigate(`/updateGroup/${id}`)
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (confirmDelete) {
      console.log("Deleted group with ID:", id);
      // delete logic here
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-10 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🎨 My Hobby Groups</h2>

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
            {groups.map((group, index) => (
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
            ))}
          </tbody>
        </table>

        {groups.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No groups found.</p>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
