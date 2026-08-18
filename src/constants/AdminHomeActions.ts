import { FolderTree, Package, ShoppingBag, Ticket, Users } from "lucide-react";

export  const Actions = [
    {
      path: "products",
      icon: Package,
      title: "Products",
      desc: "Manage catalog & inventory",
    },
    {
      path: "categories",
      icon: FolderTree,
      title: "Categories",
      desc: "Organize store items",
    },
    {
      path: "orders",
      icon: ShoppingBag,
      title: "Orders",
      desc: "View & track shipping",
    },
    {
      path: "users",
      icon: Users,
      title: "Users",
      desc: "Accounts & permissions",
    },
    {
      path: "coupons",
      icon: Ticket,
      title: "Coupons",
      desc: "  Discounts & promotions",
    },
  ];