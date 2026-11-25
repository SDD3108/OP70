import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({ label = "Загрузка..." }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-12 text-sm text-zinc-600">
      <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /><span>{label}</span>
    </div>
  );
}
