import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="shrink-0 flex items-center">
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="w-10 h-10 rounded-xl bg-prime dark:bg-prime-darkTheme flex items-center justify-center text-surface-light dark:text-bgMain-dark font-bold text-xl shadow-md transition-transform duration-200 group-hover:scale-105">
          P
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-textMain-light dark:text-textMain-dark">
          Prime
          <span className="text-prime dark:text-prime-darkTheme">Store</span>
        </span>
      </Link>
    </div>
  );
}
