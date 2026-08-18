import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

export default function ValueFeatures() {
  const list = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free delivery on orders over $50",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "100% encrypted & safe checkout",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day money-back guarantee",
    },
  ];
  const features = list.map((item) => (
    <div className="flex items-center space-x-4 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800">
      <div className="p-3 rounded-xl bg-prime/10 text-prime dark:text-prime-darkTheme shrink-0">
        <item.icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-textMain-light dark:text-textMain-dark">
          {item.title}
        </h3>
        <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
          {item.description}
        </p>
      </div>
    </div>
  ));
  return (
    <section className="max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{features}</div>
    </section>
  );
}
