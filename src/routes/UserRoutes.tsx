import ChangePassword from "../features/auth/change-password/ChangePassword";
import CartView from "../features/cart/components/Cart";
import CategoryView from "../features/category/components/CategoryView";
import CheckoutComponent from "../features/checkout/components/Checkout";
import OrdersList from "../features/last-orders/components/Orders";
import OrderComponent from "../features/order/components/Order";
import ProductComponent from "../features/products/components/product/ProductComponent";
import ProductsPage from "../features/products/components/products/ProductsPage";
import UserProfile from "../features/profile/components/Profile";
import Wishlist from "../features/wishlist/components/Wishlist";
import UserLayout from "../layouts/UserLayout";
import CategoriesPage from "../pages/CategoriesPage";
import HomeRedirect from "../pages/HomeRedirect";


import NotFound from "../pages/NotFound";


export const UserRoutes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomeRedirect /> },
      {
        path: "product/:id",
        element: <ProductComponent />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "category/:id",
        element: <CategoryView />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "checkout",
        element: <CheckoutComponent />,
      },
      {
        path: "checkout/order/:id",
        element: <OrderComponent />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "orders",
        element: <OrdersList />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "password",
        element: <ChangePassword />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
