
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 rounded-md shadow-md"
    >
      Skip to content
    </a>
  );
}
