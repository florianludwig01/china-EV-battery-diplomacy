import { ArrowUpRight, BookOpen, Network, Scale } from "lucide-react";

import Hero from "@/components/Hero";
import MapExplorer from "@/components/MapExplorer";
import Navigation from "@/components/Navigation";
import Scrollytelling from "@/components/Scrollytelling";
import { academicSources } from "@/data/sources";

export default function Home() {
  return (
    <main className="min-h-screen overflow-clip bg-slate-950 text-white">
      <Navigation />
      <Hero />
      <Scrollytelling />

      <section id="explorer" className="border-t border-white/10 bg-slate-900 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mb-12 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="section-kicker">Open exploration</p>
              <h2 className="section-title max-w-3xl">
                Compare structural and geographic representations of the system.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-400 lg:justify-self-end">
              The explorer separates network position from geographic location.
              Filters make it possible to isolate actor categories and relation
              types without changing the underlying dataset.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
            <MapExplorer />
          </div>
        </div>
      </section>

      <section id="methodology" className="border-t border-white/10 bg-slate-950 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:px-16">
          <div>
            <p className="section-kicker">Methodology</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Scope, categories and limitations of the model.
            </h2>
          </div>
          <div className="grid gap-8 text-base leading-7 text-slate-400 sm:grid-cols-2">
            <p>
              The visualization represents the sector as a directed,
              attributed network. Nodes distinguish states, institutions,
              firms, resources and aggregated industries; edges distinguish
              material, trade, capital, technology and policy relations.
            </p>
            <p>
              The model is selective rather than exhaustive. Aggregated
              industry nodes preserve legibility, while corporate and
              institutional nodes illustrate documented relationships. An edge
              indicates a relevant relation, not its quantitative magnitude.
            </p>
          </div>
        </div>
      </section>

      <section id="sources" className="border-t border-white/10 bg-slate-900 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <p className="section-kicker">References</p>
          <h2 className="section-title max-w-3xl">
            Sources used for the analytical framework.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400">
            The bibliography combines international energy-system analysis,
            binding European legislation and a sector-specific standards
            initiative. Entity-level relationships should be supplemented with
            company reports and project documents in a later research stage.
          </p>

          <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {academicSources.map((source) => (
              <li
                key={source.id}
                id={`source-${source.id}`}
                className="grid gap-4 py-7 sm:grid-cols-[48px_1fr_auto] sm:items-start"
              >
                <span className="font-semibold text-amber-300">[{source.id}]</span>
                <div>
                  <p className="max-w-4xl leading-7 text-slate-200">
                    {source.citation}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {source.note}
                  </p>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200"
                >
                  Open source <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p>China EV Battery Diplomacy · Interactive systems analysis · Florian Ludwig</p>
          <a href="#top" className="flex items-center gap-2 text-slate-300 hover:text-white">
            Back to top <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
