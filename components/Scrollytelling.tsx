"use client";

import { useEffect, useRef, useState } from "react";

import StoryDiagram from "@/components/StoryDiagram";
import { storySteps } from "@/data/storySteps";

export default function Scrollytelling() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeStepId, setActiveStepId] = useState(storySteps[0].id);
  const activeStep =
    storySteps.find((step) => step.id === activeStepId) ?? storySteps[0];

  useEffect(() => {
    const story = storyRef.current;

    if (!story) return;

    const elements = Array.from(
      story.querySelectorAll<HTMLElement>("[data-story-step]"),
    );
    let animationFrame: number | null = null;

    function updateActiveStep() {
      animationFrame = null;
      const focusLine = window.innerHeight * 0.45;
      let closestElement = elements[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const elementCenter = bounds.top + bounds.height / 2;
        const distance = Math.abs(elementCenter - focusLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      });

      if (closestElement) {
        setActiveStepId((current) =>
          current === closestElement.id ? current : closestElement.id,
        );
      }
    }

    function scheduleUpdate() {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveStep);
      }
    }

    updateActiveStep();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={storyRef}
      id="story"
      className="border-t border-white/10 bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="max-w-3xl">
          <p className="section-kicker">Follow the chain</p>
          <h2 className="section-title">
            The battery sector is a transnational system of production and regulation.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            The following four analytical layers distinguish extraction,
            processing, manufacturing and public policy. The visualization
            highlights how actors occupy different positions within the same
            directed network.
          </p>
        </div>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.5fr)]">
          <div>
            {storySteps.map((step) => {
              const active = step.id === activeStepId;

              return (
                <article
                  key={step.id}
                  id={step.id}
                  data-story-step
                  className={`story-step ${active ? "is-active" : ""}`}
                >
                  <p className="text-sm font-semibold text-amber-300">
                    {step.number}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {step.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-slate-400">
                    {step.text}
                  </p>
                  <p className="mt-5 text-xs font-medium tracking-wide text-slate-500">
                    Sources: {step.references.map((reference, index) => (
                      <span key={reference}>
                        {index > 0 ? ", " : ""}
                        <a
                          href={`#source-${reference}`}
                          className="text-amber-300 underline-offset-4 hover:underline"
                        >
                          [{reference}]
                        </a>
                      </span>
                    ))}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="top-24 hidden lg:sticky lg:block">
            <StoryDiagram step={activeStep} />
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <StoryDiagram step={activeStep} />
        </div>
      </div>
    </section>
  );
}
