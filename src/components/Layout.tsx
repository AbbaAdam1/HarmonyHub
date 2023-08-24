import React from 'react';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="p-4">
        <main>{children}</main>
      </div>
      <Topbar/>
    </div>
  );
};

export default Layout;
