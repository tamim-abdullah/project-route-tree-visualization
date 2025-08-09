// components/FolderControls.tsx
import { Button } from '@/components/ui/button';

interface FolderControlsProps {
  selectedFolderId: string | null;
  onAddNode: (type: 'folder' | 'file', parentId: string | null) => void;
}

export const FolderControls = ({ selectedFolderId, onAddNode }: FolderControlsProps) => {
  return (
    <div className="flex items-center space-x-2 mb-8">
      <Button 
        onClick={() => onAddNode('folder', null)} 
        className="bg-white text-black hover:bg-gray-300"
      >
        Create Folder
      </Button>

      {selectedFolderId && (
        <>
          <Button
            onClick={() => onAddNode('folder', selectedFolderId)}
            variant="outline"
            className="text-white border-zinc-700 hover:bg-zinc-800"
          >
            Create Subfolder
          </Button>
          <Button
            onClick={() => onAddNode('file', selectedFolderId)}
            variant="outline"
            className="text-white border-zinc-700 hover:bg-zinc-800"
          >
            New File
          </Button>
        </>
      )}
    </div>
  );
};