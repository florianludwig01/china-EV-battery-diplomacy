"use client";

import { useCallback } from "react";

import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  createRelationEdge,
  edges as initialEdges,
  nodes as initialNodes,
  type ActorNode,
  type ActorCategory,
  type RelationEdge,
  type RelationCategory,
} from "@/data/systemsMap";

type SystemsMapProps = {
  visibleActors: ReadonlySet<ActorCategory>;
  visibleRelations: ReadonlySet<RelationCategory>;
};

export default function SystemsMap({
  visibleActors,
  visibleRelations,
}: SystemsMapProps) {
  const [nodes, , onNodesChange] =
    useNodesState<ActorNode>(initialNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState<RelationEdge>(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((currentEdges) =>
        addEdge(
          createRelationEdge({
            id: `${connection.source}-${connection.target}-${Date.now()}`,
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            label: "New relation",
            category: "trade",
          }),
          currentEdges,
        ),
      );
    },
    [setEdges],
  );

  const visibleNodes = nodes.filter((node) =>
    visibleActors.has(node.data.category),
  );
  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = edges.filter(
    (edge) =>
      edge.data?.category &&
      visibleRelations.has(edge.data.category) &&
      visibleNodeIds.has(edge.source) &&
      visibleNodeIds.has(edge.target),
  );

  return (
    <div className="h-[75vh] min-h-[520px] w-full">
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable
        nodesConnectable
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
