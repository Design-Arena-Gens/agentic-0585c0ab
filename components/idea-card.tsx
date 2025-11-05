import type { IdeaBlueprint } from "@/lib/idea-engine";

const effortCopy: Record<IdeaBlueprint["effort"], string> = {
  quick: "Weekend Build",
  moderate: "2-4 Week Sprint",
  deep: "Venture-Scale"
};

const revenueCopy: Record<IdeaBlueprint["revenuePotential"], string> = {
  low: "Spark",
  medium: "Momentum",
  high: "Rocket"
};

export function IdeaCard({ idea }: { idea: IdeaBlueprint }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-accent via-indigo-500 to-sky-500" />
      <header className="pt-3 pb-4">
        <h3 className="text-xl font-semibold text-slate-900">{idea.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{idea.summary}</p>
      </header>
      <ul className="space-y-2 pb-5 text-sm text-slate-700">
        {idea.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium uppercase tracking-wide">
          {effortCopy[idea.effort]}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium uppercase tracking-wide">
          {revenueCopy[idea.revenuePotential]} Potential
        </span>
        {idea.stack.map((tech) => (
          <span key={tech} className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-600">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
