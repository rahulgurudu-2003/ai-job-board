import { useState, useEffect } from "react";
import { BriefcaseBusiness, Moon, Sun, Heart, Menu, X, ChevronDown, User, Power } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAvatarUrl } from "../../utils/avatar";
import { toast } from "sonner";

const navItems = [
    { name: "Find Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "Applications", path: "/applications" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
];

const Navbar = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const avatarUrl = user ? getAvatarUrl(user.avatar) : null;
    const location = useLocation();
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        toast.success(`${nextTheme === "dark" ? "Dark" : "Light"} mode enabled`, {
            duration: 2000
        });
    };

    
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-[1200px] mx-auto h-20 md:h-24 flex items-center justify-between px-4 md:px-8">

                
                <Link to="/" className="flex items-center gap-2.5 md:gap-3 hover:opacity-90 transition-opacity">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                        <BriefcaseBusiness
                            size={16}
                            className="text-white"
                            strokeWidth={2.5}
                        />
                    </div>
                    <span className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                        JobBoard
                    </span>
                </Link>

                
                <nav className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== "/" && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative text-[15px] font-semibold transition-colors duration-200 pb-1
                                    ${isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400"
                                    }`}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                
                <div className="flex items-center gap-2.5 md:gap-4">
                    
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon size={19} strokeWidth={2} />
                        ) : (
                            <Sun size={19} strokeWidth={2} />
                        )}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2.5 md:gap-4">
                            
                            <Link
                                to="/saved-jobs"
                                className={`p-2 rounded-lg transition-all duration-200 relative
                                    ${location.pathname === "/saved-jobs"
                                        ? "text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                aria-label="Saved Jobs"
                            >
                                <Heart 
                                    size={19} 
                                    strokeWidth={2} 
                                    className={location.pathname === "/saved-jobs" ? "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" : ""}
                                />
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2.5 hover:opacity-95 transition-opacity focus:outline-none cursor-pointer text-left bg-transparent border-none py-1"
                                >
                                    <div className="w-11 h-11 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center font-bold text-base shadow-sm select-none overflow-hidden shrink-0">
                                        {avatarUrl ? (
                                            <img 
                                                src={avatarUrl} 
                                                alt={user.fullName} 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()
                                        )}
                                    </div>
                                    <div className="hidden md:flex flex-col min-w-0 pr-1 select-none">
                                        <span className="text-[13.5px] font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                                            {user.fullName}
                                        </span>
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate leading-none mt-0.5 font-semibold">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className="text-slate-450 dark:text-slate-500 shrink-0 hidden md:block" />
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setDropdownOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-slate-950/30 overflow-hidden z-20">
                                            <Link
                                                to="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer no-underline"
                                            >
                                                <User size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                                Profile
                                            </Link>
                                            <div className="border-t border-slate-100 dark:border-slate-800/80" />
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setDropdownOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-red-650 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/15 transition-colors cursor-pointer text-left border-none bg-transparent"
                                            >
                                                <Power size={16} className="text-red-600 dark:text-red-400 shrink-0" />
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-3">
                            <Link
                                to="/login"
                                className="inline-flex items-center h-9 px-3 text-[14px] font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center h-9 px-4.5 rounded-xl bg-blue-600 hover:bg-blue-700 !text-white text-[13.5px] font-semibold shadow-sm transition"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}

                    
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 lg:hidden cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>
            </div>

            
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shadow-lg px-5 py-6 space-y-5 animate-fade-in">
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== "/" && location.pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`text-[15px] font-semibold py-1.5 border-b border-slate-50 dark:border-slate-800/30 transition-colors
                                        ${isActive
                                            ? "text-blue-600 dark:text-blue-455"
                                            : "text-slate-655 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {!user && (
                        <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                            <Link
                                to="/login"
                                className="w-full h-11 flex items-center justify-center border border-slate-200 dark:border-slate-850 rounded-xl text-[14px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="w-full h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold shadow-sm transition"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;