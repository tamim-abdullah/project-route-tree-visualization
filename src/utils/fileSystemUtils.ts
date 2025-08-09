// utils/fileSystemUtils.ts
import { Node } from '@/types/node';

export const generateId = (): string => 
  Math.random().toString(36).substring(2, 11);

export const updateNode = (nodes: Node[], nodeId: string, newName: string): Node[] => {
  return nodes.map(node => {
    if (node.id === nodeId) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return { ...node, children: updateNode(node.children, nodeId, newName) };
    }
    return node;
  });
};

export const addNodeToParent = (nodes: Node[], parentId: string, newNode: Node): Node[] => {
  return nodes.map(node => {
    if (node.id === parentId && node.type === 'folder') {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToParent(node.children, parentId, newNode),
      };
    }
    return node;
  });
};

export const createNode = (type: 'folder' | 'file'): Node => ({
  id: generateId(),
  name: '',
  type,
  ...(type === 'folder' && { children: [] }),
});