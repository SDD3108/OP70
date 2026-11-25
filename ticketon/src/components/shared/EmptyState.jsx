import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Ничего не найдено", description = "Попробуйте изменить параметры поиска." }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
      <Inbox className="mx-auto h-12 w-12 text-zinc-400" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-bold text-zinc-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">{description}</p>
    </div>
  );
}
