export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-[260px_1fr] gap-6 animate-pulse">
      <div className="h-[90vh] bg-slate-200 rounded-3xl" />
      <div className="space-y-6">
        <div className="h-32 bg-slate-200 rounded-3xl" />
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-slate-200 rounded-3xl" />
      </div>
    </div>
  );
}
