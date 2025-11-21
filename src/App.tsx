import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/Root';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
//import {AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';

// import Students from './components/Students';
// import Teachers from './components/Teachers';
// import Parents from './components/Parents';
// import Library from './components/Library';
// import Attendance from './components/Attendance';
// import Exam from './components/Exam';
// import Hostel from './components/Hostel';
// import Account from './components/Account';
// import Settings from './components/Settings';
import './App.css';
import SecondLayout from './components/SecoundLayout';
import ApplicantLayout from './components/ApplicantLayout';


// const App: React.FC = () => {
//   return (
//      <AuthProvider>
//       <Router>
//         <div className="app-container">
//           <Header/>
//           <main>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="*" element={<Navigate to="/login" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// };
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
         errorElement: <></>,
        children: [
            { path: '/', element: <SecondLayout><Login /></SecondLayout> },
             { path: '/Dashboard', element: <ApplicantLayout><Dashboard /></ApplicantLayout> },
             
        ]
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App;
