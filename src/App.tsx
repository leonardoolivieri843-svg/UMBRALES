import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { knowledgeNodes, knowledgeEdges } from './data/knowledge'
import { toReactFlowNodes, toReactFlowEdges } from './utils/transform'
import { certaintyColor } from './utils/colors'
import KnowledgeNodeComponent from './components/KnowledgeNode'
import NodePanel from './components/NodePanel'
import FilterBar from './components/FilterBar'
import Header from './components/Header'

import type { KnowledgeNode, FilterState, CertaintyLevel } from './types'

const nodeTypes = { knowledge: KnowledgeNodeComponent }

const defaultFilters: FilterState = {
  certainty: [5, 4, 3, 2, 1],
  statuses: [],
  domains: [],
}

export default function App() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null)
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const filteredNodes = knowledgeNodes.filter(node => {
    const certaintyMatch = filters.certainty.includes(node.certainty as CertaintyLevel)
    const statusMatch =
      filters.statuses.length === 0 || filters.statuses.includes(node.status)
    const domainMatch =
      filters.domains.length === 0 || filters.domains.includes(node.domain)
    return certaintyMatch && statusMatch && domainMatch
  })

  const filteredNodeIds = new Set(filteredNodes.map(n => n.id))
  const filteredEdges = knowledgeEdges.filter(
    e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
  )

  const rfNodes = toReactFlowNodes(filteredNodes)
  const rfEdges = toReactFlowEdges(filteredEdges)

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const found = knowledgeNodes.find(n => n.id === node.id)
      setSelectedNode(found ?? null)
    },
    []
  )

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 relative">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={() => setSelectedNode(null)}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.15}
          maxZoom={2.5}
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={28}
            size={1}
            color="#1a1a30"
          />
          <Controls position="bottom-right" />
          <MiniMap
            position="top-right"
            nodeColor={n => certaintyColor((n.data?.certainty as CertaintyLevel) ?? 3)}
            maskColor="rgba(5,5,16,0.75)"
          />
        </ReactFlow>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          totalNodes={knowledgeNodes.length}
          visibleNodes={filteredNodes.length}
        />

        {selectedNode && (
          <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </div>
    </div>
  )
}
