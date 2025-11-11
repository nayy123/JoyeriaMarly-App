import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminLayout() {
  return (
    <div>
          <Header />
      <div className="flex flex-1 overflow-hidden">
        <div>
          <AdminSidebar />
        </div>
        <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-gray-50">
          <main className="w-full px-10 py-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Outlet />
            </div>
          </main>
        </div>        
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;
