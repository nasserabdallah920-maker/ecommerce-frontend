import CouponFormModal from "../features/admin/coupon/components/CouponFormModal";
import CouponsPage from "../features/admin/coupon/components/CouponManagement";
import CouponCreateFormView from "../features/admin/coupon/components/CouponForm";
import OrderForm from "../features/admin/orders/components/OrderForm";
import OrdersPage from "../features/admin/orders/components/OrdersPage";
import AddProductPage from "../features/admin/products/components/AddProduct";
import EditProductModal from "../features/admin/products/components/EditProduct";
import ProductsManagement from "../features/admin/products/components/ProductsManagement";
import UserDetailsContent from "../features/admin/users/components/UserDetailsModal";
import UsersPage from "../features/admin/users/components/UsersPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminHome from "../pages/Admin Home/AdminHome";
import CategoriesPage from "../features/admin/categories/components/CategoriesPage";
import CategoryFormPage from "../features/admin/categories/components/CategoryForm";

export const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminHome /> },
      { path: "products", element: <ProductsManagement /> },
      { path: "add-product", element: <AddProductPage /> },
      { path: "edit-product/:id", element: <EditProductModal /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/:id", element: <UserDetailsContent /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "coupons/create", element: <CouponCreateFormView /> },
      { path: "coupons/edit/:id", element: <CouponCreateFormView /> },
      { path: "coupons/:id", element: <CouponFormModal /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "orders/:id", element: <OrdersPage /> },
      { path: "order/:id", element: <OrderForm /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "categories/create", element: <CategoryFormPage /> },
      { path: "categories/edit/:id", element: <CategoryFormPage /> },
    ],
  },
];
