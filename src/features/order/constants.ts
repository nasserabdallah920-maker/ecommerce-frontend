export const orderStatus = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  },
  confirmed: {
    label: "Confirmed",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  },
  processing: {
    label: "Preparing...",
    className:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300",
  },
  shipped: {
    label: "Shipped",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
  },
  delivered: {
    label: "Delivered",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
  },
};

export const statusData = {
  pending: {
    label: "Unpaid",

    className:
      "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
  },
  paid: {
    label: "Paid",

    className:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
  },
  failed: {
    label: "Transaction failed",

    className:
      "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800",
  },
  refunded: {
    label: "Refunded",

    className:
      "text-slate-600 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800",
  },
};
