import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";
// 1. Importing React Icons
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUser, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { MdVerified, MdErrorOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const GroupDetails = () => {

  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hobby-hub-server-psi-bay.vercel.app/groups/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API request failed');
        }
      })
      .then(data => {
        setGroup(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />
  }
  if (!group) {
    return <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-red-600">Group not found</h2>
      <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
    </div>
  }

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
  } = group;

  const groupStartDate = new Date(startDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const isExpired = groupStartDate < today;
  const isIncomplete = !name || !startDate || !image || !description || !maxMembers || !userName || !userEmail || !location;

  const handleJoin = () => {
    if (isExpired) {
      toast.error("Sorry — this group is no longer active!");
      return;
    }
    toast.success(`Welcome to ${name}!`);
  };

  return (
    <div className=" ">
      <div className=" max-w-6xl    md:py-12  w-full px-6">
        <div >
          <Helmet>
            <title>HobbyHub | {name}</title>
          </Helmet>

          {/* Navigation */}
          <Link to="/" className="inline-flex items-center gap-2 mb-6  text-primary hover:underline font-medium">
            <FaArrowLeft /> Back to Discovery
          </Link>

          <div className="bg-base-100 mb-12 rounded-3xl shadow-2xl border border-base-200 overflow-hidden lg:flex">

            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <img
                src={image}
                alt={name}
                className="w-full h-[400px] lg:h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className={`badge badge-lg gap-2 py-5 px-6 font-bold border-none shadow-xl ${isExpired ? 'bg-error text-white' : 'bg-success text-white'}`}>
                  {isExpired ? <MdErrorOutline size={20} /> : <MdVerified size={20} />}
                  {isExpired ? "Expired" : "Active Now"}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-base-content">{name}</h1>

              <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary shadow-inner">
                    <FaCalendarAlt size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">Date</p>
                    <p className="font-semibold text-sm md:text-base">{new Date(startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary shadow-inner">
                    <FaUsers size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">Max Capacity</p>
                    <p className="font-semibold text-sm md:text-base">{maxMembers} Members</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary shadow-inner">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">Location</p>
                    <p className="font-semibold text-sm md:text-base">{location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary shadow-inner">
                    <FaUser size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">Organizer</p>
                    <p className="font-semibold text-sm md:text-base">{userName}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-base-200">
                <button
                  onClick={handleJoin}
                  disabled={isExpired || isIncomplete}
                  className={`btn btn-lg flex-1 rounded-2xl font-bold transition-all hover:scale-105 ${isExpired ? 'btn-disabled' : 'btn-primary shadow-lg shadow-primary/30'
                    }`}
                >
                  {isExpired ? "Registration Closed" : "Join this Hobby Group"}
                </button>

                <a
                  href={`mailto:${userEmail}`}
                  className="btn btn-lg btn-outline btn-secondary rounded-2xl px-6"
                  title="Contact Host"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default GroupDetails;