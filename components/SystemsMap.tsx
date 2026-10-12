"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";

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
  type FeedbackLoop,
  type RelationEdge,
  type RelationCategory,
} from "@/data/systemsMap";

type SystemsMapProps = {
  visibleActors: ReadonlySet<ActorCategory>;
  visibleRelations: ReadonlySet<RelationCategory>;
  activeFeedbackLoop: FeedbackLoop | null;
};

export default function SystemsMap({
  visibleActors,
  visibleRelations,
  activeFeedbackLoop,
}: SystemsMapProps) {
  const [selectedActor, setSelectedActor] = useState<ActorNode | null>(null);
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

  const loopNodeIds = activeFeedbackLoop
    ? new Set<string>(activeFeedbackLoop.nodeIds)
    : null;
  const loopEdgeIds = activeFeedbackLoop
    ? new Set<string>(activeFeedbackLoop.edgeIds)
    : null;
  const visibleNodes = nodes
    .filter((node) => visibleActors.has(node.data.category))
    .map((node) => ({
      ...node,
      style: {
        ...node.style,
        opacity: !loopNodeIds || loopNodeIds.has(node.id) ? 1 : 0.16,
        transition: "opacity 200ms ease",
      },
    }));
  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = edges
    .filter(
      (edge) =>
        edge.data?.category &&
        visibleRelations.has(edge.data.category) &&
        visibleNodeIds.has(edge.source) &&
        visibleNodeIds.has(edge.target),
    )
    .map((edge) => {
      const highlighted = loopEdgeIds?.has(edge.id) ?? false;

      return {
        ...edge,
        animated: highlighted || edge.animated,
        style: {
          ...edge.style,
          opacity: !loopEdgeIds || highlighted ? 1 : 0.1,
          stroke: highlighted ? activeFeedbackLoop?.color : edge.style?.stroke,
          strokeWidth: highlighted ? 4 : edge.style?.strokeWidth,
          transition: "opacity 200ms ease",
        },
        zIndex: highlighted ? 10 : edge.zIndex,
      };
    });
  const visibleSelectedActor =
    selectedActor && visibleActors.has(selectedActor.data.category)
      ? selectedActor
      : null;

  return (
    <div
      className={`grid w-full bg-slate-900 ${
        visibleSelectedActor
          ? "lg:grid-cols-[minmax(0,1fr)_280px]"
          : ""
      }`}
    >
      <div className="h-[75vh] min-h-[520px] min-w-0">
        <ReactFlow
          nodes={visibleNodes}
          edges={visibleEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedActor(node)}
          onPaneClick={() => setSelectedActor(null)}
          nodesDraggable
          nodesConnectable
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {visibleSelectedActor ? (
        <aside
          className="relative border-t border-slate-700 bg-slate-950 p-6 lg:h-[75vh] lg:min-h-[520px] lg:overflow-y-auto lg:border-t-0 lg:border-l"
          aria-label="Selected actor details"
        >
          <button
            type="button"
            onClick={() => setSelectedActor(null)}
            className="absolute top-4 right-4 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close actor details"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <p className="pr-8 text-xs font-semibold tracking-[0.18em] text-sky-300 uppercase">
            {visibleSelectedActor.data.category}
          </p>
          <h2 className="mt-3 pr-8 text-xl font-bold text-white">
            {visibleSelectedActor.data.label}
          </h2>

          {visibleSelectedActor.data.description ? (
            <p className="mt-5 text-sm leading-6 text-slate-300">
              {visibleSelectedActor.data.description}
            </p>
          ) : (
            <p className="mt-5 text-sm italic text-slate-500">
              No description available yet.
            </p>
          )}
        </aside>
      ) : null}
    </div>
  );
}
