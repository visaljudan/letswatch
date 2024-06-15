import React, { ReactNode } from "react";
import { Header } from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
  page?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, page }) => {
  return (
    <div className="app-layout">
      <Header page={page} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
