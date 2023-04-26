// Outlet = component used to render the matched child routes for a given route path
// used as a placeholder in the parent route component where the child routes should be rendered. When the parent route is matched, the Outlet component will render the child routes that match the current URL
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return <Outlet />;
};

export default Layout;
