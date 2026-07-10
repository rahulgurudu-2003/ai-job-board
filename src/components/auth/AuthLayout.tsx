import React from "react";
import Navbar from "../layout/Navbar";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 flex flex-col justify-between">
            <Navbar />
            <div className="flex-1 flex items-start justify-center py-10 px-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[1.75rem] shadow-xl dark:shadow-slate-950/20 max-w-[580px] w-full p-6 md:p-8 transition-all duration-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
