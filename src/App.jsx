import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageAnnouncements from './pages/Admin/ManageAnnouncements';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/HeaderSection';
import HeroImageSection from './components/HeroImageSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function PublicHome() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950">
      <Header isVisible={isHeaderVisible} />
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <HeroImageSection />
      </div>
      <div className="h-screen" />
      <div className="relative z-10 bg-slate-950">
        <div className="container mx-auto px-6 max-w-7xl">
          <main>
            <AnnouncementsSection />
            <AboutSection />
            <EventsSection />
            <TeamSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="events" element={<ManageEvents />} />
          <Route path="announcements" element={<ManageAnnouncements />} />
          <Route index element={
            <div className="text-center text-slate-400 py-12">
              <p className="text-lg">Welcome to Admin Dashboard!</p>
              <p className="text-sm mt-2">Select an option above to get started</p>
            </div>
          } />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<PublicHome />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;