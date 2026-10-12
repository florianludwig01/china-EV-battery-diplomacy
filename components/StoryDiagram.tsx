import { edges, nodes, type ActorCategory } from "@/data/systemsMap";
import type { StoryStep } from "@/data/storySteps";

const positions: Record<string, { x: number; y: number }> = {
  australia: { x: 85, y: 105 },
  indonesia: { x: 85, y: 195 },
  dr_congo: { x: 85, y: 285 },
  chile: { x: 85, y: 375 },
  argentina: { x: 85, y: 465 },
  ganfeng: { x: 285, y: 145 },
  huayou: { x: 285, y: 275 },
  cmoc: { x: 285, y: 405 },
  "chinese-refining": { x: 485, y: 210 },
  "chinese-materials": { x: 660, y: 275 },
  china: { x: 660, y: 90 },
  catl: { x: 835, y: 200 },
  byd: { x: 835, y: 345 },
  hungary: { x: 1035, y: 105 },
  "european-automakers": { x: 1035, y: 235 },
  eu: { x: 1035, y: 330 },
  usa: { x: 1035, y: 420 },
  wto: { x: 1035, y: 510 },
  "global-battery-alliance": { x: 835, y: 485 },
};

const shortLabels: Record<string, string> = {
  dr_congo: "DR Congo",
  "chinese-refining": "Mineral refining",
  "chinese-materials": "Battery materials",
  ganfeng: "Ganfeng Lithium",
  huayou: "Huayou Cobalt",
  "european-automakers": "EU automakers",
  eu: "European Union",
  wto: "WTO",
  "global-battery-alliance": "Global Battery Alliance",
};

const categoryColors: Record<ActorCategory, string> = {
  state: "#60a5fa",
  company: "#4ade80",
  institution: "#c084fc",
  resource: "#fbbf24",
  industry: "#22d3ee",
};

type StoryDiagramProps = {
  step: StoryStep;
};

export default function StoryDiagram({ step }: StoryDiagramProps) {
  const activeNodes = new Set(step.activeNodeIds);
  const activeEdges = new Set(step.activeEdgeIds);

  return (
    <div className="story-visual">
      <div className="flex items-start justify-between gap-6 px-5 pt-5 sm:px-7 sm:pt-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            System view
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Chapter {step.number} · {step.eyebrow}
          </p>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400">
          Scroll to explore
        </span>
      </div>

      <svg
        viewBox="0 0 1130 590"
        className="mt-2 h-auto w-full"
        role="img"
        aria-label={`Highlighted system for ${step.title}`}
      >
        <defs>
          <marker
            id="story-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {[
          [85, "Origins"],
          [285, "Resource firms"],
          [485, "Refining"],
          [660, "Materials"],
          [835, "Cells & EVs"],
          [1035, "Markets"],
        ].map(([x, label]) => (
          <g key={label}>
            <line
              x1={Number(x)}
              y1="38"
              x2={Number(x)}
              y2="565"
              stroke="rgba(148,163,184,.12)"
              strokeDasharray="3 10"
            />
            <text
              x={Number(x)}
              y="24"
              textAnchor="middle"
              fill="#64748b"
              fontSize="12"
              letterSpacing="1.8"
            >
              {label.toString().toUpperCase()}
            </text>
          </g>
        ))}

        {edges.map((edge) => {
          const source = positions[edge.source];
          const target = positions[edge.target];

          if (!source || !target) return null;

          const active = activeEdges.has(edge.id);
          const middleX = (source.x + target.x) / 2;

          return (
            <path
              key={edge.id}
              d={`M ${source.x} ${source.y} C ${middleX} ${source.y}, ${middleX} ${target.y}, ${target.x} ${target.y}`}
              className={`story-edge ${active ? "is-active" : ""}`}
              markerEnd={active ? "url(#story-arrow)" : undefined}
            />
          );
        })}

        {nodes.map((node) => {
          const position = positions[node.id];
          if (!position) return null;

          const active = activeNodes.has(node.id);
          const label = shortLabels[node.id] ?? node.data.label;

          return (
            <g
              key={node.id}
              transform={`translate(${position.x} ${position.y})`}
              className={`story-node ${active ? "is-active" : ""}`}
            >
              <rect
                x="-76"
                y="-25"
                width="152"
                height="50"
                rx="13"
                fill="#0f172a"
                stroke={categoryColors[node.data.category]}
                strokeWidth={active ? 2.5 : 1}
              />
              <circle
                cx="-57"
                cy="0"
                r="5"
                fill={categoryColors[node.data.category]}
              />
              <text
                x="-45"
                y="4"
                fill="#f8fafc"
                fontSize="12"
                fontWeight="600"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="border-t border-white/10 px-5 py-4 sm:px-7">
        <p className="text-sm text-slate-300">
          <span className="mr-2 text-amber-300">Key point</span>
          {step.takeaway}
        </p>
      </div>
    </div>
  );
}
