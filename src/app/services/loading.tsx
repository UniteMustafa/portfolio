// Task 23: Per-route loading skeleton for Services
export default function ServicesLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full pt-[80px] md:pt-[100px] py-12">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] mt-8 md:mt-16 animate-pulse">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="h-12 w-14 rounded bg-white/5" />
                <div className="w-[70px] h-[70px] rounded-full bg-white/5" />
              </div>
              <div className="h-9 w-40 rounded bg-white/5" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-3/4 rounded bg-white/5" />
              </div>
              <div className="h-[1px] bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
