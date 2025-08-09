// utils/d3Utils.ts
import { Node, D3Node } from '@/types/node';

export const convertToD3Data = (nodes: Node[]): D3Node => {
  if (nodes.length === 0) {
    return { name: 'Root', type: 'folder', children: [] };
  }
  
  const root: D3Node = {
    name: 'Root',
    type: 'folder',
    children: nodes.map(node => convertNodeToD3(node))
  };
  
  return root;
};

export const convertNodeToD3 = (node: Node): D3Node => {
  const d3Node: D3Node = {
    name: node.name || 'Unnamed',
    type: node.type,
    id: node.id
  };
  
  if (node.children && node.children.length > 0) {
    d3Node.children = node.children.map(child => convertNodeToD3(child));
  }
  
  return d3Node;
};