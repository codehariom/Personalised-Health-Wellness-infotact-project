import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Home from './pages/Home.jsx';
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import MealPlans from "./pages/MealPlans";
import MealPlanDetail from "./pages/MealPlanDetail";
import Welcome from './pages/Welcome.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProfileForm from './components/profile/ProfileForm.jsx';
import DataInput from './pages/DataInput.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import Premium from "./pages/Premium.jsx";
import Community from './pages/Community.jsx';
import Gamification from './pages/Gamification.jsx';
import NotificationSettings from './pages/NotificationSettings.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Workouts */}
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/:id" element={<WorkoutDetail />} />

        {/* Meal Plans */}
        <Route path="/meal-plans" element={<MealPlans />} />
        <Route path="/meal-plans/:id" element={<MealPlanDetail />} />
          <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
          <Route path="/data-input" element={<ProtectedRoute><DataInput /></ProtectedRoute>} />
           <Route path="/premium" element={<Premium />} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/gamification" element={<ProtectedRoute><Gamification /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}
