"use client";

import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodes = [
  {
    id: "china",
    position: { x: 300, y: 100 },
    data: { label: "China" },
  },
  {
    id: "australia",
    position: { x: 50, y: 250 },
    data: { label: "Australia" },
  },
  {
    id: "catl",
    position: { x: 300, y: 250 },
    data: { label: "CATL" },
  },
  {
    id: "eu",
    position: { x: 550, y: 250 },
    data: { label: "European Union" },
  },
];

const edges = [
  {
    id: "australia-china",
    source: "australia",
    target: "china",
    label: "Lithium",
    animated: true,
  },
  {
    id: "china-catl",
    source: "china",
    target: "catl",
    label: "Industrial policy",
  },
  {
    id: "catl-eu",
    source: "catl",
    target: "eu",
    label: "Batteries",
    animated: true,
  },
];

export default function Home() {
  return (
    <main className="h-screen bg-slate-950 text-white">
      <header className="p-6">
        <h1 className="text-3xl font-bold">
          China EV Battery Diplomacy
        </h1>
        <p className="text-slate-400">
          Interactive Systems Map
        </p>
      </header>

      <div className="h-[75vh] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </main>
  );
}