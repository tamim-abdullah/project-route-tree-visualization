// components/RadialTreeVisualization.tsx (Updated with config)
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Node } from '@/types/node';
import { convertToD3Data } from '@/utils/d3Utils';
import { TreeLegend } from './TreeLegend';
import { TREE_CONFIG, TreeConfig } from '@/utils/treeConfig';

interface RadialTreeVisualizationProps {
  fileSystem: Node[];
  config?: Partial<TreeConfig>; // Optional custom configuration
}

export const RadialTreeVisualization = ({ 
  fileSystem, 
  config = {} 
}: RadialTreeVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Merge default config with custom config
  const treeConfig = { ...TREE_CONFIG, ...config };

  useEffect(() => {
    if (typeof window !== 'undefined' && svgRef.current) {
      renderRadialTree();
    }
  }, [fileSystem, config]);

  useEffect(() => {
    if (typeof window !== 'undefined' && svgRef.current) {
      renderRadialTree();
    }
  }, []);

  const renderRadialTree = () => {
    if (typeof window === 'undefined' || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height, padding } = treeConfig;
    const radius = Math.min(width, height) / 2 - padding;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const data = convertToD3Data(fileSystem);
    const root = d3.hierarchy(data);

    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 
        treeConfig.separation.sibling : 
        treeConfig.separation.cousin) / a.depth);

    tree(root);

    // Add links (edges) with config
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d3.linkRadial() as any)
        .angle((d: any) => d.x)
        .radius((d: any) => d.y))
      .style('fill', 'none')
      .style('stroke', treeConfig.links.color)
      .style('stroke-width', treeConfig.links.width)
      .style('stroke-dasharray', treeConfig.links.dashArray);

    // Add nodes with config
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0)
      `);

    // Add circles for nodes with config
    node.append('circle')
      .attr('r', (d: any) => {
        const nodeType = d.data.type === 'folder' ? 'folder' : 'file';
        return treeConfig.nodes[nodeType].radius;
      })
      .style('fill', (d: any) => {
        const nodeType = d.data.type === 'folder' ? 'folder' : 'file';
        return treeConfig.nodes[nodeType].color;
      })
      .style('stroke', (d: any) => {
        const nodeType = d.data.type === 'folder' ? 'folder' : 'file';
        return treeConfig.nodes[nodeType].strokeColor;
      })
      .style('stroke-width', (d: any) => {
        const nodeType = d.data.type === 'folder' ? 'folder' : 'file';
        return treeConfig.nodes[nodeType].strokeWidth;
      });

    // Add labels with config
    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', (d: any) => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', (d: any) => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('transform', (d: any) => d.x >= Math.PI ? 'rotate(180)' : null)
      .style('font-size', treeConfig.text.fontSize)
      .style('fill', treeConfig.text.color)
      .style('font-weight', treeConfig.text.fontWeight)
      .style('font-family', treeConfig.text.fontFamily)
      .text((d: any) => d.data.name);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Visual Tree</h2>
      <div className={`w-[${treeConfig.width}px] h-[${treeConfig.height}px] flex items-center justify-center`}>
        {fileSystem.length === 0 ? (
          <p className="text-zinc-500 text-sm">Tree will appear when you create folders/files</p>
        ) : (
          <svg ref={svgRef} className="w-full h-full"></svg>
        )}
      </div>
      <TreeLegend />
    </div>
  );
};