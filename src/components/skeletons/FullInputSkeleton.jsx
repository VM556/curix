export default function FullInputSkeleton() {
  return (
    <div className="card w-125 bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Title Skeleton */}
        <div className="skeleton h-8 w-32 mb-4"></div>

        {/* Flags Container Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="skeleton w-12 h-8"></div>
          <div className="skeleton w-12 h-8"></div>
          <div className="skeleton w-12 h-8"></div>
        </div>

        {/* Input Group Skeleton */}
        <div className="join w-full bg-base-200 rounded-box">
          <div className="skeleton h-12 w-24"></div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className="skeleton h-12 flex-1"></div>
        </div>
      </div>
    </div>
  );
}
