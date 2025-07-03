// import { toast } from "react-hot-toast";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router";

const GroupDetails = () => {
  const {
    _id,
    name,
    category,
    image,
    description,
    startDate,
    maxMembers,
    userName,
    userEmail,
    location,
  } = useLoaderData();

  const isExpired = new Date(startDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

  const handleJoin = () => {
    if (isExpired) return;
    toast.success(`You've joined the "${name}" group!`);
    // Optionally you can call API to add this user to group's member list
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-xl overflow-hidden border border-base-300 bg-base-100 shadow-md">
        <img
          src={image}
          alt={name}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-primary mb-3">{name}</h2>

          <div className="flex items-center flex-wrap gap-3 mb-5">
            <span className="badge badge-primary">{category}</span>
            <span className="badge badge-ghost">Start Date: {startDate}</span>
            <span className="badge badge-ghost">Max Members: {maxMembers}</span>
          </div>

          <p className="text-gray-600 mb-4">{description}</p>

          <div className="space-y-2 text-gray-500">
            <p>📍 <strong>Location:</strong> {location}</p>
            <p>👥 <strong>Max Members:</strong> {maxMembers}</p>
            <p>📧 <strong>Created by:</strong> {userName} ({userEmail})</p>
          </div>

          <div className="mt-6">
            {isExpired ? (
              <button className="btn btn-disabled w-full">
                This group is no longer active
              </button>
            ) : (
              <button onClick={handleJoin} className="btn btn-primary w-full">
                Join Group
              </button>
            )}
          </div>
          <Link to={'/'}>
            <button className="btn mt-3 bg-gray-500 btn-primary w-full">
              Back to discovery
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
