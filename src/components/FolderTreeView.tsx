// components/FolderTreeView.tsx
import { KeyboardEvent, RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Node } from '@/types/node';

interface FolderTreeViewProps {
  fileSystem: Node[];
  selectedFolderId: string | null;
  editingNodeId: string | null;
  inputValue: string;
  inputRef: RefObject<HTMLInputElement>;
  onSetSelectedFolderId: (id: string | null) => void;
  onSetInputValue: (value: string) => void;
  onHandleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onHandleSaveName: () => void;
}

export const FolderTreeView = ({
  fileSystem,
  selectedFolderId,
  editingNodeId,
  inputValue,
  inputRef,
  onSetSelectedFolderId,
  onSetInputValue,
  onHandleKeyDown,
  onHandleSaveName,
}: FolderTreeViewProps) => {
  const renderTree = (nodes: Node[], level = 0): JSX.Element => {
    return (
      <div className={`space-y-2 ${level > 0 ? 'ml-6' : ''}`}>
        {nodes.map(node => (
          <div key={node.id}>
            {editingNodeId === node.id ? (
              <div className="flex items-center space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    if (e && e.target) {
                      onSetInputValue(e.target.value);
                    }
                  }}
                  onKeyDown={onHandleKeyDown}
                  placeholder={node.type === 'folder' ? 'Folder Name' : 'File Name'}
                  className="bg-zinc-800 text-white border-zinc-700 w-64"
                />
                <Button 
                  onClick={onHandleSaveName} 
                  className="bg-white text-black hover:bg-gray-300"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div
                onClick={() => node.type === 'folder' && onSetSelectedFolderId(node.id)}
                className={`flex items-center cursor-pointer ${
                  selectedFolderId === node.id ? 'text-yellow-400' : ''
                }`}
              >
                <span className="text-sm">
                  {node.name}
                  {node.type === 'folder' && '/'}
                </span>
              </div>
            )}
            {node.children && renderTree(node.children, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Folder Structure</h2>
      {fileSystem.length === 0 ? (
        <p className="text-zinc-500">No folders or files created yet.</p>
      ) : (
        renderTree(fileSystem)
      )}
    </div>
  );
};