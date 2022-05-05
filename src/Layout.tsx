import React from "react";
import Navbar from "src/components/Navbar";

interface LayoutProps {
  header?: boolean;
  component: React.FC;
}

const Layout: React.FC<LayoutProps> = ({ header, component, ...rest }) => {
  const Component: React.FC = component;
  return (
    <div className="main-container">
      {header && <Navbar />}
      <Component />
    </div>
  );
};

export default Layout;
