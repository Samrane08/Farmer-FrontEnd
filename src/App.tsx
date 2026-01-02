import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/Root";
import SecondLayout from "./components/SecoundLayout";
import ApplicantLayout from "./components/ApplicantLayout";

import Dashboard from "./components/Dashboard";

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DeletedDataDashboard from "./components/DeletedDataDashboard";
import DeleteUploadedBankData from "./components/DeleteUploadBankData";
import FormerUploadedBankData from "./components/FormerUploadedBank";
import UploadLoanAccountDetails from "./components/UploadLoanAccountDetails";
import DownloadAllActiveData from "./components/DownloadAllActiveData";
import Landing from "./pages/LandingPage";
import LoginWaiver from "./components/Login-Waiver";
import LoginIncentive from "./components/Login-Incentive";
import DownloadNonDemographicData from "./components/DownloadNonDemographicData";

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
            <Landing />
          </SecondLayout>
        ),
      },
      {
        path: "/waiver-login",
        element: (
          <SecondLayout>
            <LoginWaiver />
          </SecondLayout>
        ),
      },
      {
        path: "/incentive-login",
        element: (
          <SecondLayout>
            <LoginIncentive />
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
              <UploadLoanAccountDetails />
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
      {
        path: "/filesummary-filesummary",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <FormerUploadedBankData />
            </ApplicantLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/deleteuploadedbankrecord-deleteuploadedbankrecord",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <DeleteUploadedBankData />
            </ApplicantLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/filesummarydownloadlist-filesummarydownloadlist",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <DownloadAllActiveData />
            </ApplicantLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/report-amount",
        element: (
          <ProtectedRoute>
            <ApplicantLayout>
              <DownloadNonDemographicData />
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
