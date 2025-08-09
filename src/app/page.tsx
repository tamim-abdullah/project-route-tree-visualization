// app/page.tsx
"use client";

import { useState } from 'react';
import { Node } from '@/types/node';
import { FolderControls } from '@/components/FolderControls';
import { FolderTreeView } from '@/components/FolderTreeView';
import { RadialTreeVisualization } from '@/components/RadialTreeVisualization';
import { useFileSystem } from '@/hooks/useFileSystem';

export default function FolderStructureApp() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const {
    fileSystem,
    editingNodeId,
    inputValue,
    setInputValue,
    addNode,
    handleSaveName,
    handleKeyDown,
    inputRef
  } = useFileSystem();

  return (
    <div className="bg-black text-white min-h-screen p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Project Route Tree Visualization</h1>
        <FolderControls 
              selectedFolderId={selectedFolderId}
              onAddNode={addNode}
            />
        <div className="flex gap-10 items-start">
          {/* Left side - Controls and Tree View */}
          <div className="flex-1">

            <FolderTreeView
              fileSystem={fileSystem}
              selectedFolderId={selectedFolderId}
              editingNodeId={editingNodeId}
              inputValue={inputValue}
              inputRef={inputRef}
              onSetSelectedFolderId={setSelectedFolderId}
              onSetInputValue={setInputValue}
              onHandleKeyDown={handleKeyDown}
              onHandleSaveName={handleSaveName}
            />
          </div>

          {/* Right side - Radial Tree Visualization */}
          <div className="flex-shrink-0">
            <RadialTreeVisualization fileSystem={fileSystem} />
          </div>
        </div>
      </div>
    </div>
  );
}