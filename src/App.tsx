import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/Root";
import SecondLayout from "./components/SecoundLayout";
import ApplicantLayout from "./components/ApplicantLayout";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import UploadFarmerData from "./components/UploadBankData";
import DeletedDataDashboard from "./components/DeletedDataDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <></>,

    children: [
      // Public Route (Login)
      {
        path: "/",
        element: (
          <SecondLayout>
            <Login />
          </SecondLayout>
        ),
      },

      // Protected Dashboard
      {
        path: "/Dashboard",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <Dashboard />
            </ApplicantLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/uploadexcel-upload",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <UploadFarmerData />
            </ApplicantLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/deletedbankrecordlist-deletedbankrecordlist",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <DeletedDataDashboard />
            </ApplicantLayout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
