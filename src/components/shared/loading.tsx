
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bgMain-light dark:bg-bgMain-dark transition-colors">
      <div className="w-16 h-16 border-4 border-prime-light dark:border-surface-dark border-t-prime dark:border-t-prime-darkTheme rounded-full animate-spin" />
    </div>
  );
}