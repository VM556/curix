import FlagSkeleton from "./FlagSkeleton";

export default function FullInputSkeleton() {
  return (
    <div className="card w-2xs md:w-lg bg-base-100 shadow-xl border border-gray-300">
      <div className="card-body">
        {/* Title Skeleton */}
        <div className="skeleton h-8 w-32 mb-2"></div>

        {/* Flag Skeleton */}
        <div className="hidden md:flex gap-2 mb-4">
          {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(
            (_, i) => (
              <FlagSkeleton key={i} />
            )
          )}
        </div>

        {/* Input Group Skeleton */}
        <div className="join w-full flex flex-col md:flex-row ">
          <div className="skeleton rounded-b-sm md:rounded-r-sm h-10 md:w-full"></div>
          <div className="divider divider-vertical m-0 md:divider-horizontal"></div>
          <div className="skeleton rounded-t-sm md:rounded-l-sm h-10 md:w-full"></div>
        </div>
      </div>
    </div>
  );
}
