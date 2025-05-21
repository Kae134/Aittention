export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-t-blue-500 rounded-full animate-spin" />
      <span className="mt-4">Chargement...</span>
    </div>
  );
}
