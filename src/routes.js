import Category from "views/Category";
import Customer from "views/Customer";
import Dashboard from "views/Dashboard.js";
import Order from "views/Order";
import Product from "views/Product";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product",
    icon: "nc-icon nc-diamond",
    component: Product,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-bookmark-2",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/customer",
    name: "Customer",
    icon: "nc-icon nc-bell-55",
    component: Customer,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: "nc-icon nc-single-02",
    component: Order,
    layout: "/admin",
  }
];
export default routes;
