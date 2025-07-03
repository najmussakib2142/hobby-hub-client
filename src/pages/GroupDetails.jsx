import { Helmet } from "react-helmet-async";
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

  // Parse both dates and zero the time to compare only by date
  const groupStartDate = new Date(startDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const isExpired = groupStartDate < today;
  const isIncomplete =
    !name || !startDate || !image || !description || !maxMembers || !userName || !userEmail || !location;

  const handleJoin = () => {
    if (isExpired) {
      toast.error("Sorry — this group is no longer active!");
      return;
    }

    toast.success(`You've joined the "${name}" group!`);
    // Call your API here if you have a membership endpoint
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>HobbyHub || Group Details</title>
      </Helmet>
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
            {isIncomplete ? (
              <button className="btn btn-disabled w-full">
                Group information is incomplete
              </button>
            ) : isExpired ? (
              <button className="btn btn-disabled w-full">
                This group is no longer active
              </button>
            ) : (
              <button onClick={handleJoin} className="btn btn-primary w-full">
                Join Group
              </button>
            )}
          </div>


          <Link to="/">
            <button className="btn mt-3 bg-secondary btn-primary w-full">
              Back to discovery
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
