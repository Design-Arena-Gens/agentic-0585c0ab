"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { IdeaCard } from "@/components/idea-card";
import { OptionPill } from "@/components/option-pill";
import {
  allConstraints,
  allFocuses,
  allGoals,
  generateIdeas,
  type Goal,
  type IdeaBlueprint,
  type IdeaFilters,
  type ProjectConstraint,
  type TechnologyFocus
} from "@/lib/idea-engine";

const focusLabels: Record<TechnologyFocus, string> = {
  ai: "AI & Agents",
  saas: "SaaS",
  frontend: "Frontend",
  mobile: "Mobile",
  automation: "Automation",
  data: "Data",
  community: "Community",
  wellness: "Wellness",
  education: "Education",
  creator: "Creator Economy"
};

const goalLabels: Record<Goal, string> = {
  learn: "Skill Up",
  earn: "Monetize",
  launch: "Launch",
  portfolio: "Portfolio",
  experiment: "Experiment",
  "social-impact": "Impact"
};

const constraintLabels: Record<ProjectConstraint, string> = {
  "time-short": "Under 10 Hours",
  "time-weekend": "Weekend",
  "time-extended": "1+ Month",
  solo: "Solo Friendly",
  team: "Team",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
};

const inspirationCombos: { label: string; focuses: TechnologyFocus[]; goals: Goal[]; constraints: ProjectConstraint[] }[] = [
  { label: "AI Indie SaaS", focuses: ["ai", "saas"], goals: ["earn", "launch"], constraints: ["solo", "intermediate"] },
  { label: "Weekend Hack", focuses: ["frontend", "automation"], goals: ["experiment", "portfolio"], constraints: ["time-weekend"] },
  { label: "Community Impact", focuses: ["community", "data"], goals: ["social-impact", "launch"], constraints: ["team"] }
];

function SelectedIdeas({ ideas }: { ideas: IdeaBlueprint[] }) {
  if (!ideas.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [focuses, setFocuses] = useState<TechnologyFocus[]>(["frontend"]);
  const [goals, setGoals] = useState<Goal[]>(["learn"]);
  const [constraints, setConstraints] = useState<ProjectConstraint[]>(["time-weekend"]);
  const [search, setSearch] = useState("");

  const filters: IdeaFilters = useMemo(
    () => ({
      focuses,
      goals,
      constraints,
      search
    }),
    [focuses, goals, constraints, search]
  );

  const ideas = useMemo(() => generateIdeas(filters, 6), [filters]);

  const toggleValue = <T extends string>(value: T, list: T[], setter: (next: T[]) => void) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 pb-16 pt-20 sm:px-10">
      <div className="absolute inset-x-0 top-24 -z-10 blur-[140px]" aria-hidden>
        <div className="mx-auto h-64 w-10/12 bg-gradient-to-r from-indigo-200 via-violet-200 to-sky-200 opacity-60" />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-subtle">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              <span className="text-lg">👋</span> Idea Studio
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Figure out what to build next.
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              Mix your interests, constraints, and ambitions to surface battle-tested project concepts you can actually
              ship. Flip the toggles, explore curated combos, and walk away with a plan.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready for Vercel
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Launch-friendly templates
              </span>
            </div>
          </div>
          <div className="w-full max-w-sm shrink-0 rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-white p-6 shadow-lg">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quick start combos</h2>
            <div className="mt-4 space-y-3">
              {inspirationCombos.map((combo) => (
                <button
                  key={combo.label}
                  type="button"
                  onClick={() => {
                    setFocuses(combo.focuses);
                    setGoals(combo.goals);
                    setConstraints(combo.constraints);
                    setSearch("");
                  }}
                  className="w-full rounded-xl border border-transparent bg-white px-4 py-3 text-left text-sm shadow hover:border-indigo-200 hover:shadow-md"
                >
                  <span className="font-medium text-slate-900">{combo.label}</span>
                  <p className="mt-1 text-xs text-slate-500">
                    {combo.focuses.length} focuses • {combo.goals.length} goals • {combo.constraints.length} filters
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <header className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Tune your blueprint</h2>
          <p className="text-sm text-slate-600">
            Pick a few signals so the generator understands the kind of build that excites you right now.
          </p>
        </header>

        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Focus areas</h3>
              <button
                type="button"
                className="text-xs font-semibold text-accent hover:underline"
                onClick={() => setFocuses([])}
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allFocuses.map((focus) => (
                <OptionPill
                  key={focus}
                  label={focusLabels[focus]}
                  value={focus}
                  isActive={focuses.includes(focus)}
                  onToggle={(value) => toggleValue(value, focuses, setFocuses)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Goals</h3>
              <button type="button" className="text-xs font-semibold text-accent hover:underline" onClick={() => setGoals([])}>
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allGoals.map((goal) => (
                <OptionPill
                  key={goal}
                  label={goalLabels[goal]}
                  value={goal}
                  isActive={goals.includes(goal)}
                  onToggle={(value) => toggleValue(value, goals, setGoals)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Constraints</h3>
              <button
                type="button"
                className="text-xs font-semibold text-accent hover:underline"
                onClick={() => setConstraints([])}
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allConstraints.map((constraint) => (
                <OptionPill
                  key={constraint}
                  label={constraintLabels[constraint]}
                  value={constraint}
                  isActive={constraints.includes(constraint)}
                  onToggle={(value) => toggleValue(value, constraints, setConstraints)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wide text-slate-500" htmlFor="keywordSearch">
              Keyword search
            </label>
            <input
              id="keywordSearch"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try “education”, “automation”, “habit”, or anything else"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Ready-to-build concepts</h2>
          <p className="text-sm text-slate-600">
            These concepts balance feasibility and ambition, so you can progress from idea to launch without spinning
            wheels.
          </p>
        </header>
        <SelectedIdeas ideas={ideas} />
      </section>

      <section className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-100 p-10 text-slate-800 shadow-subtle">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Ship it on your terms.</h2>
            <p className="text-sm leading-6 text-slate-600">
              Save your favorite ideas, remix the stack, and deploy straight to Vercel in minutes. The studio keeps
              track of your filters so you can revisit whenever inspiration hits.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 shadow">Deploy-ready</span>
              <span className="rounded-full bg-white px-3 py-1 shadow">AI-first</span>
              <span className="rounded-full bg-white px-3 py-1 shadow">Community tested</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Next actions</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Pick a concept you vibe with</li>
              <li>Outline scope and design</li>
              <li>Clone a starter kit from the stack suggestions</li>
              <li>Deploy to Vercel when ready</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
