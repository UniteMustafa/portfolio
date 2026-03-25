// Task 23: Per-route loading skeleton for Blog
export default function BlogLoading() {
  return (
    <div className="min-h-screen w-full pt-[80px] md:pt-[100px] py-12">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-8 md:mt-16 pb-20">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-10 w-32 rounded-lg bg-white/5 animate-pulse mb-3" />
          <div className="h-4 w-80 rounded bg-white/5 animate-pulse" />
        </div>

        {/* Card skeleton */}
        <div className="max-w-[750px] mx-auto rounded-2xl overflow-hidden bg-white/5 animate-pulse">
          <div className="h-[300px] w-full bg-white/5" />
          <div className="p-8 space-y-4">
            <div className="h-3 w-24 rounded bg-white/5" />
            <div className="h-8 w-3/4 rounded bg-white/5" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-5/6 rounded bg-white/5" />
              <div className="h-3 w-2/3 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
