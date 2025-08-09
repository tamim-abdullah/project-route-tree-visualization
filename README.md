# Project Folder Structure Maker

A modern Next.js application for creating and visualizing project folder structures with an interactive radial tree diagram.

## ✨ Features

- **Interactive Folder Creation**: Create folders and files with a simple click interface
- **Nested Structure Support**: Build complex folder hierarchies with subfolders and files
- **Real-time Visualization**: Watch your folder structure come to life in a beautiful radial tree diagram
- **Inline Editing**: Edit folder and file names directly in the interface
- **Visual Distinction**: Folders and files are clearly differentiated with colors and icons
- **Responsive Design**: Works seamlessly across different screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd folder-structure-maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**
   ```bash
   # D3.js for tree visualization
   npm install d3 @types/d3
   
   # UI components (shadcn/ui)
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button input
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Creating Folders and Files

1. **Create Root Folder**: Click "Create Folder" to add a top-level folder
2. **Select Folder**: Click on any folder name to select it (highlighted in yellow)
3. **Add Subfolders**: With a folder selected, click "Create Subfolder"
4. **Add Files**: With a folder selected, click "New File"
5. **Name Items**: Type the name and press Enter or click Save

### Understanding the Visualization

- **Yellow circles**: Represent folders
- **Blue circles**: Represent files
- **Lines**: Show parent-child relationships
- **Radial layout**: Efficiently displays hierarchical structure

## 📁 Project Structure

```
├── app/
│   └── page.tsx                     # Main application component
├── components/
│   ├── FolderControls.tsx          # Control buttons for creating items
│   ├── FolderTreeView.tsx          # List view of folder structure
│   ├── RadialTreeVisualization.tsx # D3 radial tree component
│   └── TreeLegend.tsx              # Color legend for the tree
├── hooks/
│   └── useFileSystem.ts            # File system state management
├── types/
│   └── node.ts                     # TypeScript type definitions
└── utils/
    ├── fileSystemUtils.ts          # File system utility functions
    ├── d3Utils.ts                  # D3 data conversion utilities
    └── treeConfig.ts               # Tree visualization configuration
```

## 🎨 Customization

### Tree Appearance

Modify `utils/treeConfig.ts` to customize the visualization:

```typescript
export const TREE_CONFIG = {
  // Change canvas size
  width: 400,
  height: 400,
  
  // Customize node appearance
  nodes: {
    folder: {
      radius: 6,           // Size of folder circles
      color: '#fbbf24',    // Folder color
    },
    file: {
      radius: 4,           // Size of file circles  
      color: '#60a5fa',    // File color
    }
  },
  
  // Customize connecting lines
  links: {
    color: '#666',         // Line color
    width: 1.5,           // Line thickness
  }
};
```

### Adding Custom Styles

The app uses Tailwind CSS for styling. Modify component classes to change the appearance:

- `bg-black text-white` - Dark theme
- `bg-zinc-900` - Component backgrounds
- `text-yellow-400` - Selection highlight

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[D3.js](https://d3js.org/)** - Data visualization
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- D3.js community for the powerful visualization library
- Next.js team for the excellent React framework
- shadcn for the beautiful UI components
