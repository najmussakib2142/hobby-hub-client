import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
// import { FaSpinner } from "react-icons/fa";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://hobby-hub-server-psi-bay.vercel.app/myGroups?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setGroups(data);
          setLoading(false);
        })
        .catch(err => {
          toast.error(`Failed to fetch groups: ${err.message}`);
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
        fetch(`https://hobby-hub-server-psi-bay.vercel.app/myGroups/${id}?email=${user.email}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your group has been deleted.", "success");
              setGroups(initialGroups => initialGroups.filter(group => group._id !== id));
            }
          })
          .catch(error => {
            toast.error(`Delete failed: ${error.message}`);
          });
      }
    });
  };

  return (
    <div className="max-w-5xl min-h-screen flex flex-col items-center-center-center mx-auto px-6 md:px-12 py-8 md:py-16">
      <Helmet>
        <title>HobbyHub || My Groups</title>
      </Helmet>

      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        🎨 My Hobby Groups
      </h2>

      {loading ? (
        <div className='min-h-screen  flex items-center justify-center'>
          <span className="loading text-[#1F1A70] dark:text-gray-300 loading-dots loading-xl"></span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow dark:border-gray-600  border-primary">
          <table className="table-auto w-full text-left">
            <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 dark:from-gray-800 dark:text-gray-200 dark:to-gray-900">
              <tr>
                <th className=" border-primary dark:border-gray-600  px-4 py-3">No</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Image</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Group Name</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Category</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Location</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Members</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Start Date</th>
                <th className=" border-primary dark:border-gray-600 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.length > 0 ? (
                groups.map((group, index) => (
                  <tr key={group._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm last:border-b-0">
                    <td className=" border-primary px-4 dark:border-gray-600 py-3 text-center font-semibold">{index + 1}</td>
                    <td className=" border-primary dark:border-gray-600 px-2 py-2">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className=" border-primary dark:text-gray-100 dark:border-gray-600 px-4 py-3 font-medium text-gray-900">{group.name}</td>
                    <td className=" border-primary dark:text-gray-100 dark:border-gray-600 px-4 py-3 text-gray-700">{group.category}</td>
                    <td className=" border-primary dark:text-gray-100 dark:border-gray-600 px-4 py-3 text-gray-700">{group.location}</td>
                    <td className=" border-primary dark:text-gray-100 dark:border-gray-600 px-4 py-3 text-center text-gray-700">{group.maxMembers}</td>
                    <td className=" border-primary dark:text-gray-100 dark:border-gray-600 px-4 py-3 text-gray-700">{group.startDate}</td>
                    <td className=" border-primary dark:text-gray-100 dark:border-gray-600 px-4 py-3 flex flex-col space-y-2 items-center">
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
                    You have not created any groups.
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
