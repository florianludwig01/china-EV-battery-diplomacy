"use client";

import {
  Background,
  Controls,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { edges, nodes } from "@/data/systemsMap";

export default function SystemsMap() {
  return (
    <div className="h-[75vh] w-full">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}