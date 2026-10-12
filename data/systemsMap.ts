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
    position: { x: 720, y: 20 },
    geography: { longitude: 116.41, latitude: 39.9 },
    description: "National policy and diplomatic actor",
  }),
  createActorNode({
    id: "australia",
    label: "Australia",
    category: "state",
    position: { x: 0, y: 80 },
    geography: { longitude: 133.78, latitude: -25.27 },
    description: "Major source of hard-rock lithium",
  }),
  createActorNode({
    id: "indonesia",
    label: "Indonesia",
    category: "state",
    position: { x: 0, y: 200 },
    geography: { longitude: 113.92, latitude: -0.79 },
    description: "Major nickel-producing and processing location",
  }),
  createActorNode({
    id: "dr_congo",
    label: "DR Congo",
    category: "state",
    position: { x: 0, y: 320 },
    geography: { longitude: 21.76, latitude: -4.04 },
    description: "Major cobalt-producing country",
  }),
  createActorNode({
    id: "chile",
    label: "Chile",
    category: "state",
    position: { x: 0, y: 440 },
    geography: { longitude: -71.54, latitude: -35.68 },
    description: "Lithium-producing country in the South American salt-lake region",
  }),
  createActorNode({
    id: "argentina",
    label: "Argentina",
    category: "state",
    position: { x: 0, y: 560 },
    geography: { longitude: -64.0, latitude: -34.6 },
    description: "Location of major Chinese-invested lithium projects",
  }),
  createActorNode({
    id: "ganfeng",
    label: "Ganfeng Lithium",
    category: "company",
    position: { x: 260, y: 100 },
    geography: { longitude: 114.92, latitude: 27.82 },
    description: "Vertically integrated lithium producer with overseas mining interests",
  }),
  createActorNode({
    id: "huayou",
    label: "Huayou Cobalt",
    category: "company",
    position: { x: 260, y: 240 },
    geography: { longitude: 120.57, latitude: 30.63 },
    description: "Chinese cobalt and battery-materials company with Indonesian projects",
  }),
  createActorNode({
    id: "cmoc",
    label: "CMOC",
    category: "company",
    position: { x: 260, y: 380 },
    geography: { longitude: 112.45, latitude: 34.62 },
    description: "Mining company operating major copper and cobalt assets in the DR Congo",
  }),
  createActorNode({
    id: "chinese-refining",
    label: "Chinese Mineral Refining",
    category: "industry",
    position: { x: 500, y: 210 },
    geography: { longitude: 112, latitude: 31 },
    description: "Aggregated refining and processing sector",
  }),
  createActorNode({
    id: "chinese-materials",
    label: "Cathode & Anode Materials",
    category: "industry",
    position: { x: 720, y: 210 },
    geography: { longitude: 116, latitude: 32 },
    description: "Aggregated battery-materials manufacturing sector",
  }),
  createActorNode({
    id: "catl",
    label: "CATL",
    category: "company",
    position: { x: 940, y: 130 },
    geography: { longitude: 119.55, latitude: 26.67 },
    description: "Battery cell manufacturer headquartered in Ningde",
  }),
  createActorNode({
    id: "byd",
    label: "BYD",
    category: "company",
    position: { x: 940, y: 300 },
    geography: { longitude: 114.06, latitude: 22.54 },
    description: "Integrated Chinese battery and electric-vehicle manufacturer",
  }),
  createActorNode({
    id: "hungary",
    label: "Hungary",
    category: "state",
    position: { x: 1170, y: 70 },
    geography: { longitude: 19.5, latitude: 47.16 },
    description: "European manufacturing location for Chinese battery and EV investment",
  }),
  createActorNode({
    id: "eu",
    label: "European Union",
    category: "institution",
    position: { x: 1400, y: 190 },
    geography: { longitude: 4.35, latitude: 50.85 },
    description: "Supranational regulatory and trade-policy actor",
  }),
  createActorNode({
    id: "usa",
    label: "USA",
    category: "state",
    position: { x: 1400, y: 390 },
    geography: { longitude: -98.58, latitude: 39.83 },
    description: "National industrial-policy and market-access actor",
  }),
  createActorNode({
    id: "european-automakers",
    label: "European Automakers",
    category: "industry",
    position: { x: 1170, y: 260 },
    geography: { longitude: 10.45, latitude: 50.5 },
    description: "Aggregated European vehicle manufacturers and battery customers",
  }),
  createActorNode({
    id: "battery-recycling",
    label: "Battery Recycling",
    category: "industry",
    position: { x: 720, y: 520 },
    geography: { longitude: 113.3, latitude: 28.2 },
    description: "Recovery of lithium, nickel and cobalt from end-of-life batteries",
  }),
  createActorNode({
    id: "wto",
    label: "World Trade Organization",
    category: "institution",
    position: { x: 1620, y: 280 },
    geography: { longitude: 6.14, latitude: 46.22 },
    description: "Multilateral framework for trade rules, negotiations and dispute settlement",
  }),
  createActorNode({
    id: "global-battery-alliance",
    label: "Global Battery Alliance",
    category: "institution",
    position: { x: 1170, y: 520 },
    geography: { longitude: 4.35, latitude: 50.85 },
    description: "Multi-stakeholder initiative developing sustainability benchmarks and the Battery Passport",
  }),
  createActorNode({
    id: "us-ev-industry",
    label: "US Automakers",
    category: "industry",
    position: { x: 1170, y: 390 },
    geography: { longitude: -83.05, latitude: 42.33 },
    description: "Aggregated US electric-vehicle, battery and component manufacturing sector",
  }),
  createActorNode({
    id: "japan",
    label: "Japan",
    category: "state",
    position: { x: 1400, y: 680 },
    geography: { longitude: 139.69, latitude: 35.68 },
    description: "National industrial-policy and technology actor",
  }),
  createActorNode({
    id: "japanese-ev-industry",
    label: "Japanese Automakers",
    category: "industry",
    position: { x: 1170, y: 680 },
    geography: { longitude: 136.91, latitude: 35.18 },
    description: "Aggregated Japanese automakers, battery producers and technology suppliers",
  }),
  createActorNode({
    id: "south-korea",
    label: "South Korea",
    category: "state",
    position: { x: 1170, y: 820 },
    geography: { longitude: 126.98, latitude: 37.57 },
    description: "National industrial-policy actor and major battery-production location",
  }),
  createActorNode({
    id: "south-korean-battery-industry",
    label: "South Korean Automakers",
    category: "industry",
    position: { x: 940, y: 680 },
    geography: { longitude: 127.49, latitude: 36.64 },
    description: "Aggregated Korean cell manufacturers and battery-material suppliers",
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
    id: "ganfeng-australia",
    source: "ganfeng",
    target: "australia",
    label: "Lithium projects",
    category: "capital",
  }),
  createRelationEdge({
    id: "australia-ganfeng",
    source: "australia",
    target: "ganfeng",
    label: "Lithium",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "ganfeng-argentina",
    source: "ganfeng",
    target: "argentina",
    label: "Lithium projects",
    category: "capital",
  }),
  createRelationEdge({
    id: "argentina-ganfeng",
    source: "argentina",
    target: "ganfenga",
    label: "Lithium",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "huayou-indonesia",
    source: "huayou",
    target: "indonesia",
    label: "Nickel projects",
    category: "capital",
  }),
  createRelationEdge({
    id: "indonesia-huayou",
    source: "indonesia",
    target: "huayou",
    label: "Nickel",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "cmoc-dr-congo",
    source: "cmoc",
    target: "dr_congo",
    label: "Mining operations",
    category: "capital",
  }),
  createRelationEdge({
    id: "dr-congo-cmoc",
    source: "dr_congo",
    target: "cmoc",
    label: "Cobalt & Copper",
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
    id: "ganfeng-chinese-refining",
    source: "ganfeng",
    target: "chinese-refining",
    label: "Lithium compounds",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "huayou-chinese-materials",
    source: "huayou",
    target: "chinese-materials",
    label: "Nickel & cobalt materials",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "cmoc-chinese-refining",
    source: "cmoc",
    target: "chinese-refining",
    label: "Cobalt & copper",
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
    id: "china-byd",
    source: "china",
    target: "byd",
    label: "Industrial policy",
    category: "policy",
  }),
  createRelationEdge({
    id: "chinese-materials-catl",
    source: "chinese-materials",
    target: "catl",
    label: "Battery materials",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "chinese-materials-byd",
    source: "chinese-materials",
    target: "byd",
    label: "Battery materials",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "catl-hungary",
    source: "catl",
    target: "hungary",
    label: "Battery plant",
    category: "capital",
  }),
  createRelationEdge({
    id: "catl-european-automakers",
    source: "catl",
    target: "european-automakers",
    label: "Battery cells",
    category: "trade",
    animated: true,
  }),
  createRelationEdge({
    id: "european-automakers-catl-demand",
    source: "european-automakers",
    target: "catl",
    label: "Demand & supply contracts",
    category: "trade",
    animated: true,
  }),
  createRelationEdge({
    id: "byd-hungary",
    source: "byd",
    target: "hungary",
    label: "EV manufacturing",
    category: "capital",
  }),
  createRelationEdge({
    id: "byd-eu",
    source: "byd",
    target: "eu",
    label: "Electric vehicles",
    category: "trade",
    animated: true,
  }),
  createRelationEdge({
    id: "hungary-eu",
    source: "hungary",
    target: "eu",
    label: "EU market access",
    category: "policy",
  }),
  createRelationEdge({
    id: "eu-european-automakers",
    source: "eu",
    target: "european-automakers",
    label: "Industrial regulation",
    category: "policy",
  }),
  createRelationEdge({
    id: "usa-european-automakers",
    source: "usa",
    target: "european-automakers",
    label: "Subsidy conditions",
    category: "policy",
  }),
  createRelationEdge({
    id: "european-automakers-recycling",
    source: "european-automakers",
    target: "battery-recycling",
    label: "End-of-life batteries",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "recycling-chinese-materials",
    source: "battery-recycling",
    target: "chinese-materials",
    label: "Recovered materials",
    category: "material",
    animated: true,
  }),
  createRelationEdge({
    id: "china-wto",
    source: "china",
    target: "wto",
    label: "Trade commitments",
    category: "policy",
  }),
  createRelationEdge({
    id: "eu-wto",
    source: "eu",
    target: "wto",
    label: "Trade rules & disputes",
    category: "policy",
  }),
  createRelationEdge({
    id: "usa-wto",
    source: "usa",
    target: "wto",
    label: "Trade rules & disputes",
    category: "policy",
  }),
  createRelationEdge({
    id: "gba-catl",
    source: "global-battery-alliance",
    target: "catl",
    label: "Battery Passport standards",
    category: "policy",
  }),
  createRelationEdge({
    id: "gba-byd",
    source: "global-battery-alliance",
    target: "byd",
    label: "Battery Passport standards",
    category: "policy",
  }),
  createRelationEdge({
    id: "gba-recycling",
    source: "global-battery-alliance",
    target: "battery-recycling",
    label: "Circularity benchmarks",
    category: "policy",
  }),
  createRelationEdge({
    id: "usa-us-ev-industry",
    source: "usa",
    target: "us-ev-industry",
    label: "Manufacturing incentives",
    category: "policy",
  }),
  createRelationEdge({
    id: "japan-japanese-ev-industry",
    source: "japan",
    target: "japanese-ev-industry",
    label: "Industrial policy",
    category: "policy",
  }),
  createRelationEdge({
    id: "south-korea-battery-industry",
    source: "south-korea",
    target: "south-korean-battery-industry",
    label: "Industrial policy",
    category: "policy",
  }),
  createRelationEdge({
    id: "catl-japanese-ev-industry",
    source: "catl",
    target: "japanese-ev-industry",
    label: "Battery supply & joint R&D",
    category: "technology",
  }),
  createRelationEdge({
    id: "korean-battery-us-ev",
    source: "south-korean-battery-industry",
    target: "us-ev-industry",
    label: "Battery plants & JVs",
    category: "capital",
  }),
  createRelationEdge({
    id: "korean-battery-european-automakers",
    source: "south-korean-battery-industry",
    target: "european-automakers",
    label: "Battery cells",
    category: "trade",
    animated: true,
  }),
  createRelationEdge({
    id: "gba-us-ev-industry",
    source: "global-battery-alliance",
    target: "us-ev-industry",
    label: "Battery Passport standards",
    category: "policy",
  }),
  createRelationEdge({
    id: "gba-japanese-ev-industry",
    source: "global-battery-alliance",
    target: "japanese-ev-industry",
    label: "Battery Passport standards",
    category: "policy",
  }),
];

export const feedbackLoops = [
  {
    id: "circularity",
    code: "R1",
    label: "Circular material recovery",
    kind: "Reinforcing",
    color: "#2dd4bf",
    description:
      "Battery deployment increases future recycling volumes. Recovered materials return to component production and can support additional cell manufacturing.",
    nodeIds: [
      "catl",
      "european-automakers",
      "battery-recycling",
      "chinese-materials",
    ],
    edgeIds: [
      "catl-european-automakers",
      "european-automakers-recycling",
      "recycling-chinese-materials",
      "chinese-materials-catl",
    ],
  },
  {
    id: "market-expansion",
    code: "R2",
    label: "European market expansion",
    kind: "Reinforcing",
    color: "#fb7185",
    description:
      "Battery investment strengthens access to the EU market. Regulated vehicle demand generates supply contracts that can encourage further capacity expansion.",
    nodeIds: ["catl", "hungary", "eu", "european-automakers"],
    edgeIds: [
      "catl-hungary",
      "hungary-eu",
      "eu-european-automakers",
      "european-automakers-catl-demand",
    ],
  },
] as const;

export type FeedbackLoop = (typeof feedbackLoops)[number];
export type FeedbackLoopId = FeedbackLoop["id"];
