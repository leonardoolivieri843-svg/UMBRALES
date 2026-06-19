import type { Node as RFNode, Edge as RFEdge } from '@xyflow/react';
import type { KnowledgeNode, KnowledgeEdge } from '../types';
import { edgeColor } from './colors';

export function toReactFlowNodes(nodes: KnowledgeNode[]): RFNode[] {
  return nodes.map(node => ({
    id: node.id,
    type: 'knowledge',
    position: node.position,
    data: { ...node },
  }));
}

export function toReactFlowEdges(edges: KnowledgeEdge[]): RFEdge[] {
  return edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.edgeType === 'contradice',
    style: {
      stroke: edgeColor(edge.edgeType),
      strokeWidth: 1.5,
      opacity: 0.55,
    },
    data: { edgeType: edge.edgeType },
  }));
}
