# 🛍️ PrimeStore - Modern E-Commerce Frontend

PrimeStore is a full-featured, highly responsive, and modern e-commerce front-end web application built with **React**, **TypeScript**, and **Tailwind CSS**. It provides a seamless shopping experience for users and a comprehensive dashboard for administrators.

## ✨ Key Features

### 👤 For Users
- **Authentication:** Secure login, registration, and password management.
- **Product Catalog:** Browse products, filter by categories, and view detailed product pages with image galleries.
- **Shopping Cart & Checkout:** Intuitive cart management, promo code validation, and a streamlined checkout process.
- **Wishlist:** Save favorite products for later.
- **Order Tracking:** View order history, track order statuses, and review purchase details.
- **User Profile:** Manage personal information and security settings.
- **Dark/Light Mode:** Seamless theme switching for better user experience.

### 🛡️ For Administrators (Admin Dashboard)
- **Analytics & Statistics:** Overview of total revenue, orders, active users, and coupon usage.
- **Product Management:** Add, edit, and delete products, manage inventory and pricing.
- **Category Management:** Organize the store catalog with dynamic categories.
- **Order Management:** View recent orders, update order statuses, and track fulfillment.
- **User Management:** View all registered users, monitor active/banned statuses.
- **Coupon System:** Create and manage discount codes for promotional campaigns.

## 🚀 Technology Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd Front-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory (based on `.env.example`) and configure your backend API URL and other settings:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api
   VITE_SHIPPING_PRICE=50
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (Navbar, Sidebar, etc.)
├── features/     # Feature-based modules (auth, cart, products, admin, etc.)
├── hooks/        # Custom React hooks
├── layouts/      # Layout wrappers (UserLayout, AdminLayout)
├── pages/        # Main entry pages for routing
├── routes/       # Application routing configuration
├── Redux/        # Global state management setup
├── utils/        # Helper functions and utilities
└── lib/          # Third-party library configurations (Axios, etc.)
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

---
*Built with ❤️ for a modern e-commerce experience.*
