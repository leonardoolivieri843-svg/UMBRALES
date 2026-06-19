import type { CertaintyLevel, EdgeType, NodeStatus } from '../types';

export function certaintyColor(certainty: CertaintyLevel): string {
  const map: Record<CertaintyLevel, string> = {
    5: '#22c55e',
    4: '#06b6d4',
    3: '#eab308',
    2: '#f97316',
    1: '#ef4444',
  };
  return map[certainty];
}

export function certaintyLabel(certainty: CertaintyLevel): string {
  const map: Record<CertaintyLevel, string> = {
    5: 'Ley establecida',
    4: 'Consenso sólido',
    3: 'Consenso frágil',
    2: 'Especulación informada',
    1: 'Mito / Refutado',
  };
  return map[certainty];
}

export function statusColor(status: NodeStatus): string {
  const map: Record<NodeStatus, string> = {
    activo: '#22c55e',
    en_disputa: '#eab308',
    superado: '#ef4444',
    sin_verificar: '#94a3b8',
  };
  return map[status];
}

export function statusLabel(status: NodeStatus): string {
  const map: Record<NodeStatus, string> = {
    activo: 'Activo',
    en_disputa: 'En disputa',
    superado: 'Superado / Refutado',
    sin_verificar: 'Sin verificar reciente',
  };
  return map[status];
}

export function edgeColor(type: EdgeType): string {
  const map: Record<EdgeType, string> = {
    apoya: '#22c55e',
    contradice: '#ef4444',
    depende_de: '#6366f1',
    emergio_de: '#eab308',
  };
  return map[type];
}

export function edgeLabel(type: EdgeType): string {
  const map: Record<EdgeType, string> = {
    apoya: 'apoya',
    contradice: 'contradice',
    depende_de: 'depende de',
    emergio_de: 'emergió de',
  };
  return map[type];
}
