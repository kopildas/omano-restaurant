import React from "react";
import Sidebar from "../../components/admin_comp/Sidebar";

export default function Users() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="bg-gray-100 p-2">
          <p>Content goes here...</p>
        </div>
      </div>
    </div>
  );
}
