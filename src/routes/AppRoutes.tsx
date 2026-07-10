import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Jobs from "../pages/Jobs/Jobs";
import JobDetail from "../pages/Jobs/JobDetail";
import Companies from "../pages/Companies/Companies";
import CompanyDetail from "../pages/Companies/CompanyDetail";
import Applications from "../pages/Applications/Applications";
import SavedJobs from "../pages/SavedJobs/SavedJobs";
import NotFound from "../pages/NotFound/NotFound";
import About from "../pages/About/About";
import Pricing from "../pages/Pricing/Pricing";
import Profile from "../pages/Profile/Profile";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            
            <Route element={<ProtectedRoute />}>
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:slug" element={<CompanyDetail />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;