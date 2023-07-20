import '../styles/globals.css';
import '../styles/index.css';
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const Layout: React.FC = ({ children }) => {
  return (
    <>
          {/* Apply the grid class here */}
          <div className="main-content">
            {/* Add a container for the main content */}
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <main>{children}</main>
            </div>
          </div>
    </>
    );
  };

export default Layout;