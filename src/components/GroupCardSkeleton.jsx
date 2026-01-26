const GroupCardSkeleton = () => {
  return (
    <div className="border border-base-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-slate-200 h-48 w-full" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
        
        {/* Description Lines */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
        </div>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 mb-6 border-t border-dashed border-base-300 pt-4">
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-3 bg-slate-200 rounded w-20" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto">
          <div className="h-12 bg-slate-200 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default GroupCardSkeleton;