import {
  actorCategories,
  relationCategories,
  relationStyles,
  type ActorCategory,
  type RelationCategory,
} from "@/data/systemsMap";

const actorLabels: Record<ActorCategory, string> = {
  state: "States",
  company: "Companies",
  institution: "Institutions",
  resource: "Resources",
  industry: "Industries",
};

const relationLabels: Record<RelationCategory, string> = {
  material: "Material",
  trade: "Trade",
  capital: "Capital",
  technology: "Technology",
  policy: "Policy",
};

type MapFiltersProps = {
  visibleActors: ReadonlySet<ActorCategory>;
  visibleRelations: ReadonlySet<RelationCategory>;
  onToggleActor: (category: ActorCategory) => void;
  onToggleRelation: (category: RelationCategory) => void;
  onReset: () => void;
};

export default function MapFilters({
  visibleActors,
  visibleRelations,
  onToggleActor,
  onToggleRelation,
  onReset,
}: MapFiltersProps) {
  return (
    <div className="bg-slate-950/80 p-5">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Actors
          </legend>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {actorCategories.map((category) => {
              const active = visibleActors.has(category);

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleActor(category)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                    active
                      ? "border-sky-400 bg-sky-400/15 text-sky-200"
                      : "border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  {actorLabels[category]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Relations
          </legend>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {relationCategories.map((category) => {
              const active = visibleRelations.has(category);

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleRelation(category)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                    active
                      ? "border-slate-500 bg-slate-800 text-white"
                      : "border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: active
                        ? relationStyles[category].color
                        : "#475569",
                    }}
                  />
                  {relationLabels[category]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <section aria-labelledby="relation-legend-heading">
          <h2
            id="relation-legend-heading"
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            Legend
          </h2>
          <ul className="space-y-2 text-xs text-slate-300">
            {relationCategories.map((category) => (
              <li key={category} className="flex items-center gap-2">
                <span
                  className="h-0.5 w-7 rounded-full"
                  style={{ backgroundColor: relationStyles[category].color }}
                />
                {relationLabels[category]}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-medium text-slate-400 underline-offset-4 hover:text-white hover:underline"
      >
        Reset filters
      </button>
    </div>
  );
}
