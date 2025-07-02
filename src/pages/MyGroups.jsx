// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

// const MyGroups = () => {
//     const [myGroups, setMyGroups] = useState([]);
//     const { user } = useContext(AuthContext);

//     useEffect(() => {
//         fetch(`https://your-server.com/groups?email=${user.email}`)
//             .then((res) => res.json())
//             .then((data) => setMyGroups(data))
//             .catch(() => toast.error("Failed to load your groups"));
//     }, [user.email]);

//     const handleDelete = (id) => {
//         if (confirm("Are you sure you want to delete this group?")) {
//             fetch(`https://your-server.com/groups/${id}`, {
//                 method: "DELETE",
//             })
//                 .then((res) => res.json())
//                 .then(() => {
//                     toast.success("Group deleted successfully");
//                     setMyGroups(myGroups.filter((group) => group._id !== id));
//                 });
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto p-6">
//             <h2 className="text-3xl font-bold text-primary mb-6 text-center">
//                 My Hobby Groups
//             </h2>

//             <div className="overflow-x-auto">
//                 <table className="table table-zebra border border-base-300">
//                     <thead className="bg-base-200">
//                         <tr>
//                             <th>#</th>
//                             <th>Group Name</th>
//                             <th>Category</th>
//                             <th>Max Members</th>
//                             <th>Start Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {myGroups.map((group, index) => (
//                             <tr key={group._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{group.groupName}</td>
//                                 <td>{group.category}</td>
//                                 <td>{group.maxMembers}</td>
//                                 <td>{group.startDate}</td>
//                                 <td className="flex gap-2">
//                                     <Link to={`/updateGroup/${group._id}`}>
//                                         <button className="btn btn-sm btn-outline btn-primary">Update</button>
//                                     </Link>
//                                     <button
//                                         onClick={() => handleDelete(group._id)}
//                                         className="btn btn-sm btn-outline btn-error"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {myGroups.length === 0 && (
//                 <p className="text-center text-gray-500 mt-6">
//                     You haven't created any groups yet.
//                 </p>
//             )}
//         </div>
//     );
// };

// export default MyGroups;
