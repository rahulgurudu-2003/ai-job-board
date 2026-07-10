import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="text-center max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-[28px] p-8 md:p-10 shadow-xl shadow-slate-100 dark:shadow-none transition-colors">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <HelpCircle size={32} className="text-blue-600 dark:text-blue-450 animate-pulse" />
                    </div>
                    <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-450 tracking-tight">404</h1>
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white mt-4">Page Not Found</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-[14px] leading-relaxed">
                        The page you are looking for doesn't exist or has been moved. Check the URL or return home.
                    </p>
                    <div className="mt-8 flex flex-col gap-3">
                        <Link 
                            to="/" 
                            className="flex items-center justify-center gap-2 w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] rounded-xl transition shadow-md no-underline cursor-pointer"
                        >
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                        <Link 
                            to="/jobs" 
                            className="flex items-center justify-center w-full h-11 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 font-semibold text-[14px] border border-slate-200 dark:border-slate-800 rounded-xl transition no-underline cursor-pointer"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
