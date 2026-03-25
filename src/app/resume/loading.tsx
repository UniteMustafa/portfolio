// Task 23: Per-route loading skeleton for Resume
export default function ResumeLoading() {
  return (
    <div className="min-h-screen flex justify-center w-full pt-[80px] md:pt-[100px] py-12">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-12 md:mt-16">
        <div className="flex flex-col xl:flex-row gap-[40px] animate-pulse">
          {/* Left nav skeleton */}
          <div className="w-full xl:w-[400px] flex flex-col gap-8">
            <div className="h-10 w-48 rounded bg-white/5" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-white/5" />
              <div className="h-4 w-4/5 rounded bg-white/5" />
            </div>
            <div className="flex flex-col gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-lg bg-white/5" />
              ))}
            </div>
          </div>
          {/* Right content skeleton */}
          <div className="w-full xl:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-36 rounded-xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
