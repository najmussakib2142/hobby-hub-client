import { Link } from "react-router";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react"; // Optional: Use lucide-react for icons

const GroupCard = ({ group }) => {
  const { 
    _id, name, category, image, description, 
    startDate, difficultyLevel, membersCount, maxMembers, meetupType 
  } = group;

  // Format date to be more readable (e.g., May 14, 2026)
  const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group border border-base-200 rounded-2xl overflow-hidden bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="bg-slate-100 w-full h-full flex items-center justify-center text-slate-400">
            No Image Provided
          </div>
        ) }
        
        {/* Category Overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-primary rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-3 right-3">
            <span className={`px-2 py-1 text-xs font-semibold rounded-md shadow-sm text-white ${
                difficultyLevel === 'Beginner' ? 'bg-success' : 
                difficultyLevel === 'Intermediate' ? 'bg-warning' : 'bg-error'
            }`}>
                {difficultyLevel}
            </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1">
                {name}
            </h2>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[40px]">
          {description}
        </p>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 mb-6 border-t border-dashed border-base-300 pt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={14} className="text-primary" />
            <span className="text-xs font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={14} className="text-primary" />
            <span className="text-xs font-medium">{membersCount}/{maxMembers} joined</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-medium">{meetupType}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link to={`/groupDetails/${_id}`}>
            <button className="btn btn-primary btn-md w-full normal-case flex items-center justify-center gap-2 group/btn">
              View Details
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;