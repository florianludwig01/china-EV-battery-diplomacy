import {
  MarkerType,
  type Edge,
  type Node,
  type XYPosition,
} from "@xyflow/react";

export const actorCategories = [
  "state",
  "company",
  "institution",
  "resource",
  "industry",
] as const;

export type ActorCategory = (typeof actorCategories)[number];

export type GeographicPosition = {
  longitude: number;
  latitude: number;
};

export type ActorData = {
  label: string;
  category: ActorCategory;
  description?: string;
  geography?: GeographicPosition;
};

export type ActorNode = Node<ActorData, "default">;

const categoryClassNames: Record<ActorCategory, string> = {
  state: "node-state",
  company: "node-company",
  institution: "node-institution",
  resource: "node-resource",
  industry: "node-industry",
};

type CreateActorNodeOptions = {
  id: string;
  label: string;
  category: ActorCategory;
  position: XYPosition;
  description?: string;
  geography?: GeographicPosition;
};

function createActorNode({
  id,
  label,
  category,
  position,
  description,
  geography,
}: CreateActorNodeOptions): ActorNode {
  return {
    id,
    type: "default",
    position,
    data: { label, category, description, geography },
    className: categoryClassNames[category],
  };
}

export const nodes: ActorNode[] = [
  createActorNode({
    id: "china",
    label: "China",
    category: "state",
    position: { x: 300, y: 100 },
    geography: { longitude: 116.41, latitude: 39.9 },
    description: "National policy and diplomatic actor",
  }),
  createActorNode({
    id: "australia",
    label: "Australia",
    category: "state",
    position: { x: 50, y: 250 },
    geography: { longitude: 133.78, latitude: -25.27 },
  }),
  createActorNode({
    id: "indonesia",
    label: "Indonesia",
    category: "state",
    position: { x: 50, y: 300 },
    geography: { longitude: 113.92, latitude: -0.79 },
  }),
  createActorNode({
    id: "dr_congo",
    label: "DR Congo",
    category: "state",
    position: { x: 50, y: 350 },
    geography: { longitude: 21.76, latitude: -4.04 },
  }),
  createActorNode({
    id: "chile",
    label: "Chile",
    category: "state",
    position: { x: 50, y: 400 },
    geography: { longitude: -71.54, latitude: -35.68 },
  }),
  createActorNode({
    id: "catl",
    label: "CATL",
    category: "company",
    position: { x: 300, y: 250 },
    geography: { longitude: 119.55, latitude: 26.67 },
    description: "Battery cell manufacturer headquartered in Ningde",
  }),
  createActorNode({
    id: "chinese-refining",
    label: "Chinese Mineral Refining",
    category: "industry",
    position: { x: 300, y: 220 },
    geography: { longitude: 112, latitude: 31 },
    description: "Aggregated refining and processing sector",
  }),
  createActorNode({
    id: "chinese-materials",
    label: "Cathode & Anode Materials",
    category: "industry",
    position: { x: 500, y: 220 },
    geography: { longitude: 116, latitude: 32 },
    description: "Aggregated battery-materials manufacturing sector",
  }),
  createActorNode({
    id: "eu",
    label: "European Union",
    category: "institution",
    position: { x: 550, y: 250 },
    geography: { longitude: 4.35, latitude: 50.85 },
    description: "Supranational regulatory and trade-policy actor",
  }),
  createActorNode({
    id: "usa",
    label: "USA",
    category: "state",
    position: { x: 600, y: 600 },
    geography: { longitude: -98.58, latitude: 39.83 },
  }),
];

export const relationCategories = [
  "material",
  "trade",
  "capital",
  "technology",
  "policy",
] as const;

export type RelationCategory = (typeof relationCategories)[number];

export type RelationData = {
  category: RelationCategory;
  description?: string;
};

export type RelationEdge = Edge<RelationData>;

export const relationStyles: Record<
  RelationCategory,
  { className: string; color: string }
> = {
  material: { className: "edge-material", color: "#f59e0b" },
  trade: { className: "edge-trade", color: "#38bdf8" },
  capital: { className: "edge-capital", color: "#4ade80" },
  technology: { className: "edge-technology", color: "#c084fc" },
  policy: { className: "edge-policy", color: "#f87171" },
};

type CreateRelationEdgeOptions = {
  id: string;
  source: string;
  target: string;
  label: string;
  category: RelationCategory;
  description?: string;
  animated?: boolean;
  sourceHandle?: string | null;
  targetHandle?: string | null;
};

export function createRelationEdge({
  id,
  source,
  target,
  label,
  category,
  description,
  animated = false,
  sourceHandle,
  targetHandle,
}: CreateRelationEdgeOptions): RelationEdge {
  const presentation = relationStyles[category];

  return {
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
    label,
    animated,
    data: { category, description },
    className: presentation.className,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: presentation.color,
    },
  };
}

export const edges: RelationEdge[] = [
  createRelationEdge({
    id: "australia-chinese-refining",
    source: "australia",
    target: "chinese-refining",
    label: "Lithium",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "indonesia-chinese-refining",
    source: "indonesia",
    target: "chinese-refining",
    label: "Nickel",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "dr_congo-chinese-refining",
    source: "dr_congo",
    target: "chinese-refining",
    label: "Cobalt",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "chile-chinese-refining",
    source: "chile",
    target: "chinese-refining",
    label: "Lithium",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "chinese-refining-chinese-materials",
    source: "chinese-refining",
    target: "chinese-materials",
    label: "Anodes & Cathodes",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "china-catl",
    source: "china",
    target: "catl",
    label: "Industrial policy",
    category: "policy",
  }),
  createRelationEdge({
    id: "catl-eu",
    source: "catl",
    target: "eu",
    label: "Batteries",
    category: "trade",
    animated: true,
  }),
];
