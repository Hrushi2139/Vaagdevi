import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={40} className="text-accent animate-spin" />
        <p className="text-white/50 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
