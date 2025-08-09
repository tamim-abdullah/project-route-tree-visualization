// components/TreeLegend.tsx
export const TreeLegend = () => {
  return (
    <div className="mt-4 text-xs text-zinc-400">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-700"></div>
          <span>Folders</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-100"></div>
          <span>Files</span>
        </div>
      </div>
    </div>
  );
};