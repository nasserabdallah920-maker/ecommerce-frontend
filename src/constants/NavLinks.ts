import {
  ClipboardList,
  Clock,
  Heart,
  Home,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavbarItem {
  label: string;
  href: string;
}
export interface SidebarItem {
  label: string;
  path:string;
  icon:LucideIcon
}

export const NavbarItems: NavbarItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about-us" },
];
export const SidebarItems :SidebarItem[]= [
  { label: "Home", path: "/", icon: Home },
  { label: "Cart", path: "/cart", icon: ShoppingBag },
  { label: "Wishlist", path: "/wishlist", icon: Heart },
  { label: "Orders", path: "/orders", icon: Clock },
];

export const adminSidebarItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ClipboardList },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Categories", path: "/admin/categories", icon: Tag },
  { label: "Coupons", path: "/admin/coupons", icon: Ticket },
];
