import { ArrowDown, Globe2 } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="hero-shell">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24">
        <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          <Globe2 size={17} aria-hidden="true" />
          An interactive systems analysis
        </div>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-400">
          by Florian Ludwig <span className="mx-2 text-slate-600">·</span>
          <time dateTime="2026-10-12">12 October 2026</time>
        </p>

        <h1 className="max-w-none text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">
          China&apos;s EV Battery Diplomacy
        </h1>

        <div className="mt-10 grid gap-8 border-t border-white/20 pt-7 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.4fr_1fr]">
          <p className="max-w-2xl text-xl leading-relaxed text-slate-200 sm:text-2xl">
            An analysis of material flows, industrial concentration and
            regulatory responses in the global electric-vehicle battery value
            chain.
          </p>
          <div className="flex items-end justify-between gap-6 md:justify-end">
            <p className="max-w-xs text-sm leading-6 text-slate-400">
              The model distinguishes state, institutional and corporate
              actors and represents their relations as a directed network.
            </p>
            <a
              href="#story"
              aria-label="Begin the story"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/30 text-white transition hover:border-amber-300 hover:bg-amber-300 hover:text-slate-950"
            >
              <ArrowDown size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
