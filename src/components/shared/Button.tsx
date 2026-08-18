export default function Button({
  word,
  loading,
  fn,
}: {
  word: string;
  loading?: boolean;
  fn?: () => void;
}) {
  return (
    <button
      onClick={fn}
      type="submit"
      className="w-full py-3 px-4 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2"
    >
      <span>{loading ? "loading..." : word}</span>
    </button>
  );
}
