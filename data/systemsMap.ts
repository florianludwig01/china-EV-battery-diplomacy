import type { Edge, Node } from "@xyflow/react";

export const nodes: Node[] = [
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

export const edges: Edge[] = [
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