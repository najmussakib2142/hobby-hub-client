// import { Link } from "react-router-dom";

import { Link } from "react-router";

const GroupCard = ({ group }) => {
    const { _id, name, category, image, description, startDate } = group;

    return (
        <div className="border border-base-300 rounded-xl overflow-hidden bg-base-100 transition-all duration-300 hover:scale-[1.015] hover:border-primary">
            <div className="relative h-56">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full"
                />
                <span className="absolute top-2 left-2 badge badge-primary text-white">
                    {category}
                </span>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-primary">{name}</h2>
                <p className="text-sm text-gray-500 line-clamp-3">
                    {description.length > 10 ? description.slice(0, 70) + '...' : description}
                </p>
                <div className="text-xs text-gray-400">Start: {startDate}</div>

                <Link to={`/groupDetails/${_id}`} className="mt-3">
                    <button className="btn btn-primary w-full">See More</button>
                </Link>
            </div>
        </div>
    );
};

export default GroupCard;
