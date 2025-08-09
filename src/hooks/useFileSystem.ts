// hooks/useFileSystem.ts
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Node } from '@/types/node';
import { updateNode, addNodeToParent, createNode } from '@/utils/fileSystemUtils';

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<Node[]>([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingNodeId) {
      inputRef.current?.focus();
    }
  }, [editingNodeId]);

  const addNode = (type: 'folder' | 'file', parentId: string | null) => {
    const newNode = createNode(type);

    if (!parentId) {
      setFileSystem(prev => [...prev, newNode]);
    } else {
      setFileSystem(prev => addNodeToParent(prev, parentId, newNode));
    }
    setEditingNodeId(newNode.id);
  };

  const handleSaveName = () => {
    if (editingNodeId && typeof inputValue === 'string' && inputValue.trim()) {
      setFileSystem(prev => updateNode(prev, editingNodeId, inputValue.trim()));
      setEditingNodeId(null);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveName();
    }
  };

  return {
    fileSystem,
    editingNodeId,
    inputValue,
    inputRef,
    setInputValue,
    addNode,
    handleSaveName,
    handleKeyDown,
  };
};