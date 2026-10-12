"use client";

import { useState } from "react";
import { MapIcon, Network } from "lucide-react";

import MapFilters from "@/components/MapFilters";
import SystemsMap from "@/components/SystemsMap";
import WorldMap from "@/components/WorldMap";
import {
  actorCategories,
  feedbackLoops,
  relationCategories,
  type ActorCategory,
  type FeedbackLoopId,
  type RelationCategory,
} from "@/data/systemsMap";

type MapView = "systems" | "geographic";

const views: Array<{
  id: MapView;
  label: string;
  icon: typeof Network;
}> = [
  { id: "systems", label: "Systems view", icon: Network },
  { id: "geographic", label: "Geographic view", icon: MapIcon },
];

export default function MapExplorer() {
  const [view, setView] = useState<MapView>("systems");
  const [visibleActors, setVisibleActors] = useState<Set<ActorCategory>>(
    () => new Set(actorCategories),
  );
  const [visibleRelations, setVisibleRelations] = useState<
    Set<RelationCategory>
  >(() => new Set(relationCategories));
  const [activeFeedbackLoopId, setActiveFeedbackLoopId] =
    useState<FeedbackLoopId | null>(null);
  const activeFeedbackLoop =
    feedbackLoops.find((loop) => loop.id === activeFeedbackLoopId) ?? null;

  function toggleActor(category: ActorCategory) {
    setVisibleActors((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  }

  function toggleRelation(category: RelationCategory) {
    setVisibleRelations((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  }

  function resetFilters() {
    setVisibleActors(new Set(actorCategories));
    setVisibleRelations(new Set(relationCategories));
    setActiveFeedbackLoopId(null);
  }

  function selectFeedbackLoop(id: FeedbackLoopId) {
    setActiveFeedbackLoopId((current) => (current === id ? null : id));
  }

  return (
    <section aria-label="Map view">
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-800 bg-slate-900/70 px-6 py-3">
        <p className="text-sm text-slate-400">
          {view === "systems"
            ? "Explore actors, dependencies and value-chain relationships."
            : "Explore where actors and cross-border flows are located."}
        </p>

        <div
          className="inline-flex rounded-lg border border-slate-700 bg-slate-950 p-1"
          role="group"
          aria-label="Choose map view"
        >
          {views.map(({ id, label, icon: Icon }) => {
            const active = view === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-sky-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid border-b border-slate-800 bg-slate-950 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-slate-800 lg:h-[75vh] lg:min-h-[520px] lg:overflow-y-auto lg:border-r lg:border-b-0">
          <MapFilters
            visibleActors={visibleActors}
            visibleRelations={visibleRelations}
            onToggleActor={toggleActor}
            onToggleRelation={toggleRelation}
            activeFeedbackLoopId={activeFeedbackLoopId}
            onSelectFeedbackLoop={selectFeedbackLoop}
            onReset={resetFilters}
          />
        </aside>

        <div className="relative h-[75vh] min-h-[520px] min-w-0">
          <div
            className={`absolute inset-0 ${
              view === "systems"
                ? "visible z-10 opacity-100"
                : "invisible z-0 opacity-0"
            }`}
            aria-hidden={view !== "systems"}
            inert={view !== "systems"}
          >
            <SystemsMap
              visibleActors={visibleActors}
              visibleRelations={visibleRelations}
              activeFeedbackLoop={activeFeedbackLoop}
            />
          </div>

          <div
            className={`absolute inset-0 ${
              view === "geographic"
                ? "visible z-10 opacity-100"
                : "invisible z-0 opacity-0"
            }`}
            aria-hidden={view !== "geographic"}
            inert={view !== "geographic"}
          >
            <WorldMap
              visibleActors={visibleActors}
              visibleRelations={visibleRelations}
              activeFeedbackLoop={activeFeedbackLoop}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
