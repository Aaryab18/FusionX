import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Ideas from './pages/Ideas';
import Events from './pages/Events';
import Team from './pages/Team';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import AdminIdeas from './pages/admin/Ideas';
import AdminProjects from './pages/admin/Projects';
import AdminEvents from './pages/admin/Events';
import JoinRequests from './pages/admin/JoinRequests';
import ContactMessages from './pages/admin/ContactMessages';

function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route
          path="/"
          element={
            <WebsiteLayout>
              <Home />
            </WebsiteLayout>
          }
        />

        <Route path="/about" element={<WebsiteLayout><About /></WebsiteLayout>} />
        <Route path="/projects" element={<WebsiteLayout><Projects /></WebsiteLayout>} />
        <Route path="/ideas" element={<WebsiteLayout><Ideas /></WebsiteLayout>} />
        <Route path="/events" element={<WebsiteLayout><Events /></WebsiteLayout>} />
        <Route path="/team" element={<WebsiteLayout><Team /></WebsiteLayout>} />
        <Route path="/resources" element={<WebsiteLayout><Resources /></WebsiteLayout>} />
        <Route path="/contact" element={<WebsiteLayout><Contact /></WebsiteLayout>} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="ideas" element={<AdminIdeas />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="join" element={<JoinRequests />} />
          <Route path="contact" element={<ContactMessages />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}