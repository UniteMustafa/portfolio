// Task 23: Per-route loading skeleton for Work
export default function WorkLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full pt-[80px] md:pt-[100px] py-12">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-8 md:mt-24">
        <div className="flex flex-col xl:flex-row gap-[60px] xl:gap-[30px] animate-pulse">
          <div className="w-full xl:w-[50%] flex flex-col gap-6">
            <div className="h-20 w-16 rounded bg-white/5" />
            <div className="h-10 w-48 rounded bg-white/5" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-white/5" />
              <div className="h-4 w-4/5 rounded bg-white/5" />
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-20 rounded-lg bg-white/5" />
              <div className="h-8 w-20 rounded-lg bg-white/5" />
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <div className="h-[400px] xl:h-[460px] w-full rounded bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
