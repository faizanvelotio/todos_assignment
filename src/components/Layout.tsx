import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";
import Navbar from "src/components/Navbar";

interface LayoutProps extends RouteProps {
  header?: boolean;
  render: () => ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ header, render, ...routeProps }) => {
  return (
    <div className="main-container">
      {header && <Navbar />}
      <Route render={render} {...routeProps} />
    </div>
  );
};

export default Layout;
