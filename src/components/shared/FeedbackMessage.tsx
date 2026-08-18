import type{ ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

type FeedbackType = "error" | "warning" | "info" | "success";

interface FeedbackMessageProps {
  type: FeedbackType;
  title: string;
  message?: string;
  action?: ReactNode;
}

const typeStyles = {
  error: {
    text: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-500/10",
    icon: AlertCircle,
  },
  warning: {
    text: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-500/10",
    icon: AlertTriangle,
  },
  info: {
    text: "text-prime dark:text-prime-darkTheme",
    iconBg: "bg-prime/10",
    icon: Info,
  },
  success: {
    text: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    icon: CheckCircle2,
  },
};

export default function FeedbackMessage({
  type,
  title,
  message,
  action,
}: FeedbackMessageProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <div
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm"
    >
      <div className={`p-4 mb-6 rounded-full ${styles.text} ${styles.iconBg}`}>
        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-2 text-textMain-light dark:text-textMain-dark`}>
        {title}
      </h3>
      {message && (
        <p className="text-sm sm:text-base max-w-md mx-auto mb-6 text-textMain-light/60 dark:text-textMain-dark/60">
          {message}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
