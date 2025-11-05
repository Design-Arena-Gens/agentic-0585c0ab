export function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-10 py-14 text-center text-slate-600">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accentMuted/60 text-accent">
        <span className="text-2xl">✨</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-900">Let&apos;s craft something</h3>
      <p className="mt-2 text-sm leading-6">
        Pick at least one focus or goal, or type a keyword. We&apos;ll surface concepts tuned to your vibe.
      </p>
    </div>
  );
}
