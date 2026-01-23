import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUser, FaArrowLeft, FaEnvelope, FaCheckCircle, FaRocket } from "react-icons/fa";
import { MdVerified, MdErrorOutline, MdSignalCellularAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hobby-hub-server-psi-bay.vercel.app/groups/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { setGroup(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  
  if (!group) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <MdErrorOutline size={64} className="text-error opacity-20" />
      <h2 className="text-3xl font-bold">Group not found</h2>
      <Link to="/" className="btn btn-primary btn-outline">Go back to Home</Link>
    </div>
  );

  const {
    name, category, image, description, startDate, 
    maxMembers, membersCount, location, focusAreas, difficultyLevel,
    userName, userEmail, meetupType
  } = group;

  const isExpired = new Date(startDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
  const hostEmail = group?.createdBy?.email || userEmail;
  const hostName = group?.createdBy?.name || userName || "Anonymous Host";

  const handleJoin = () => {
    if (isExpired) return toast.error("This group is no longer active!");
    toast.success(`Welcome to ${name}!`);
  };

  return (
    <div className="min-h-screen bg-base-200/30 pb-20">
      <Helmet><title>HobbyHub | {name}</title></Helmet>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <FaArrowLeft /> Back to Discovery
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="badge badge-primary font-bold px-4 py-3">{category}</span>
              <span className={`badge border-none text-white font-bold px-4 py-3 ${isExpired ? 'bg-error' : 'bg-success'}`}>
                {isExpired ? "Expired" : "Active Group"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">{name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-4 md:-mt-10 relative z-10">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#fcfcfd] dark:bg-slate-950 rounded-3xl p-8 shadow-xl shadow-base-300/50 border border-base-200">
            <h3 className="text-2xl font-bold mb-4">About this Hobby Group</h3>
            <p className="text-lg text-base-content/70 leading-relaxed mb-8">{description}</p>
            
            {focusAreas && focusAreas.length > 0 && (
              <div>
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <FaRocket className="text-primary" /> Focus Areas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {focusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-base-200/50 p-4 rounded-xl border border-base-300">
                      <FaCheckCircle className="text-success shrink-0" />
                      <span className="font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-[#fcfcfd] dark:bg-slate-950 rounded-3xl p-6 shadow-xl border border-base-200">
            <h3 className="font-bold text-xl mb-6 pb-4 border-b">Event Details</h3>
            
            <div className="space-y-6">
              <DetailItem icon={<FaCalendarAlt />} label="Start Date" value={new Date(startDate).toLocaleDateString('en-US', { dateStyle: 'long' })} />
              <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={location} subValue={meetupType} />
              <DetailItem icon={<FaUsers />} label="Availability" value={`${membersCount || 1} / ${maxMembers} Members`} />
              <DetailItem icon={<MdSignalCellularAlt />} label="Difficulty" value={difficultyLevel || "All Levels"} />
              <DetailItem icon={<FaUser />} label="Hosted By" value={hostName} />
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={handleJoin}
                disabled={isExpired}
                className="btn btn-primary btn-block btn-lg rounded-2xl shadow-lg shadow-primary/20"
              >
                {isExpired ? "Registration Closed" : "Join this Group"}
              </button>
              
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${hostEmail}`}
                className="btn btn-outline btn-block btn-lg rounded-2xl"
              >
                <FaEnvelope /> Contact Host
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Sidebar Items
const DetailItem = ({ icon, label, value, subValue }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[11px] uppercase font-bold text-base-content/40 tracking-wider leading-none mb-1">{label}</p>
      <p className="font-bold text-base-content">{value}</p>
      {subValue && <p className="text-xs text-primary font-medium">{subValue}</p>}
    </div>
  </div>
);

export default GroupDetails;