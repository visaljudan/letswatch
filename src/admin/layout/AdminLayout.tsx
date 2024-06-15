import { ReactNode } from "react";
import { Header } from "./Header";
import Silder from "./Silder";

interface AppLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Silder />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
