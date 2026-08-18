import Actions from "../shared/ActionsNav";
import Logo from "../shared/Logo";

export default function AdminNavbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Logo />
        <Actions />
      </div>
    </nav>
  );
}
