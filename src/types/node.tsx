// types/node.ts
export interface Node {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: Node[];
}

export interface D3Node {
  name: string;
  type: 'folder' | 'file';
  id?: string;
  children?: D3Node[];
}