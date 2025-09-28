import React, { ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import DietChart from "./pages/DietChart";
import FoodDatabase from "./pages/FoodDatabase";
import Recipes from "./pages/Recipes";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import DoshaQuiz from "./pages/DoshaQuiz";
import KnowledgeBase from "./pages/KnowledgeBase";
import NotFound from "./pages/NotFound";

// ✅ Guarded route props
interface GuardedProps {
  children: ReactNode;
}

function Guarded({ children }: GuardedProps) {
  const { user } = useApp();
  const loc = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  return <>{children}</>;
}

// ✅ Shell layout
function Shell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main style={{ padding: "24px" }}>
        <Header />
        <div className="page">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Guarded>
                  <Dashboard />
                </Guarded>
              }
            />
            <Route
              path="/patients"
              element={
                <Guarded>
                  <Patients />
                </Guarded>
              }
            />
            <Route
              path="/patients/:id"
              element={
                <Guarded>
                  <PatientProfile />
                </Guarded>
              }
            />
            <Route
              path="/diet-chart"
              element={
                <Guarded>
                  <DietChart />
                </Guarded>
              }
            />
            <Route
              path="/food-db"
              element={
                <Guarded>
                  <FoodDatabase />
                </Guarded>
              }
            />
            <Route
              path="/recipes"
              element={
                <Guarded>
                  <Recipes />
                </Guarded>
              }
            />
            <Route
              path="/reports"
              element={
                <Guarded>
                  <Reports />
                </Guarded>
              }
            />
            <Route
              path="/appointments"
              element={
                <Guarded>
                  <Appointments />
                </Guarded>
              }
            />
            <Route
              path="/dosha-quiz"
              element={
                <Guarded>
                  <DoshaQuiz />
                </Guarded>
              }
            />
            <Route
              path="/knowledge"
              element={
                <Guarded>
                  <KnowledgeBase />
                </Guarded>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

// ✅ Main App
const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Shell />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
