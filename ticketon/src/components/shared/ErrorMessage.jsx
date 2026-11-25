export default function ErrorMessage({ message = "Не удалось загрузить данные", onRetry }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
      <p>{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="mt-3 rounded-lg border border-red-300 px-3 py-2 font-semibold hover:bg-red-100">Повторить</button>}
    </div>
  );
}
