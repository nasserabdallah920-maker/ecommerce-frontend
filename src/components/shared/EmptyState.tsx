import type{ ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 text-center">
      <div className="p-4 mb-6 rounded-full bg-prime/10 text-prime dark:text-prime-darkTheme">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-textMain-light dark:text-textMain-dark mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm sm:text-base text-textMain-light/60 dark:text-textMain-dark/60 max-w-md mx-auto mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
