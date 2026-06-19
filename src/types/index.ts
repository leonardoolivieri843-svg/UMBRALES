export type CertaintyLevel = 1 | 2 | 3 | 4 | 5;
export type NodeStatus = 'activo' | 'en_disputa' | 'superado' | 'sin_verificar';
export type EdgeType = 'apoya' | 'contradice' | 'depende_de' | 'emergio_de';

export interface KnowledgeNode {
  id: string;
  title: string;
  description: string;
  domain: string;
  cluster: string;
  certainty: CertaintyLevel;
  status: NodeStatus;
  lastVerified: string;
  sources: string[];
  position: { x: number; y: number };
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  edgeType: EdgeType;
}

export interface FilterState {
  certainty: CertaintyLevel[];
  statuses: NodeStatus[];
  domains: string[];
}
