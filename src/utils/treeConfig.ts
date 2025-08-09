// utils/treeConfig.ts
export const TREE_CONFIG = {
  // Canvas dimensions
  width: 500,
  height: 300,
  padding: 10,
  
  // Node styling
  nodes: {
    folder: {
      radius: 3,
      color: '#ff1919ff',
      strokeColor: '#ff0000ff',
      strokeWidth: 2
    },
    file: {
      radius: 4,
      color: '#ffffffff',
      strokeColor: '#fff',
      strokeWidth: 1.5
    }
  },
  
  // Link styling
  links: {
    color: '#666',
    width: 1.5,
    dashArray: null // or '3,3' for dashed lines
  },
  
  // Text styling
  text: {
    fontSize: '10px',
    color: '#fff',
    fontWeight: 'normal',
    fontFamily: 'inherit'
  },
  
  // Layout
  separation: {
    sibling: 1,
    cousin: 5
  }
};

export type TreeConfig = typeof TREE_CONFIG;