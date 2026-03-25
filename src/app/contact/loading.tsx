// Task 23: Per-route loading skeleton for Contact
export default function ContactLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full pt-[80px] md:pt-[100px] py-12">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-8 md:mt-24 pb-20">
        <div className="flex flex-col xl:flex-row gap-[60px] xl:gap-[30px]">
          {/* Form skeleton */}
          <div className="w-full xl:w-[60%] bg-white/5 rounded-xl p-10 animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 rounded-lg bg-white/5" />
              <div className="h-12 rounded-lg bg-white/5" />
              <div className="h-12 rounded-lg bg-white/5" />
              <div className="h-12 rounded-lg bg-white/5" />
            </div>
            <div className="h-12 rounded-lg bg-white/5" />
            <div className="h-32 rounded-lg bg-white/5" />
            <div className="h-12 w-36 rounded-full bg-white/5" />
          </div>
          {/* Info skeleton */}
          <div className="w-full xl:w-[40%] flex flex-col gap-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-6 animate-pulse">
                <div className="w-16 h-16 rounded-xl bg-white/5 shrink-0" />
                <div className="space-y-2">
                  <div className="h-3 w-14 rounded bg-white/5" />
                  <div className="h-5 w-40 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
