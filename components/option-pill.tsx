import classNames from "classnames";

interface OptionPillProps<T extends string> {
  label: string;
  value: T;
  isActive: boolean;
  onToggle: (value: T) => void;
}

export function OptionPill<T extends string>({ label, value, isActive, onToggle }: OptionPillProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onToggle(value)}
      className={classNames(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        isActive
          ? "border-transparent bg-accent text-white shadow-subtle"
          : "border-slate-300 bg-white text-slate-600 hover:border-accent hover:text-accent"
      )}
    >
      {label}
    </button>
  );
}
