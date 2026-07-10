import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    Code2,
    Palette,
    Megaphone,
    ShoppingCart,
    Box,
    TrendingUp,
    BriefcaseBusiness
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HomePageImg from "../../assets/HomePage.png";
import { mockJobs } from "../../data/mockJobs";


import GoogleLogo from "../../assets/logos/google.svg";
import MicrosoftLogo from "../../assets/logos/microsoft.svg";
import SpotifyLogo from "../../assets/logos/spotify.svg";
import AirbnbLogo from "../../assets/logos/airbnb.svg";

const popularSearches = [
    "React Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Analyst",
    "Marketing",
];

const getCategoryJobsCount = (categoryName: string) => {
    const baseCounts: Record<string, number> = {
        "Development": 12342,
        "Design": 4565,
        "Marketing": 3208,
        "Sales": 2986,
        "Product": 1875,
        "Finance": 2134,
    };
    const base = baseCounts[categoryName] || 0;
    const count = base + mockJobs.filter(job => job.category === categoryName).length;
    return `${count.toLocaleString()} Jobs`;
};

const categories = [
    {
        name: "Development",
        icon: Code2,
        bgClass: "bg-blue-50 dark:bg-blue-950/30",
        iconClass: "text-blue-600 dark:text-blue-400",
    },
    {
        name: "Design",
        icon: Palette,
        bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
        iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
        name: "Marketing",
        icon: Megaphone,
        bgClass: "bg-rose-50 dark:bg-rose-950/30",
        iconClass: "text-rose-600 dark:text-rose-400",
    },
    {
        name: "Sales",
        icon: ShoppingCart,
        bgClass: "bg-amber-50 dark:bg-amber-950/30",
        iconClass: "text-amber-600 dark:text-amber-400",
    },
    {
        name: "Product",
        icon: Box,
        bgClass: "bg-violet-50 dark:bg-violet-950/30",
        iconClass: "text-violet-600 dark:text-violet-400",
    },
    {
        name: "Finance",
        icon: TrendingUp,
        bgClass: "bg-indigo-50 dark:bg-indigo-950/30",
        iconClass: "text-indigo-600 dark:text-indigo-400",
    },
];

const getCompanyLogo = (company: string) => {
    switch (company.toLowerCase()) {
        case "google": return <img src={GoogleLogo} alt="Google" className="w-6 h-6 object-contain" />;
        case "microsoft": return <img src={MicrosoftLogo} alt="Microsoft" className="w-6 h-6 object-contain" />;
        case "spotify": return <img src={SpotifyLogo} alt="Spotify" className="w-6 h-6 object-contain" />;
        case "airbnb": return <img src={AirbnbLogo} alt="Airbnb" className="w-6 h-6 object-contain" />;
        default: return <BriefcaseBusiness size={20} className="text-slate-500" />;
    }
};

const Home = () => {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [locationKeyword, setLocationKeyword] = useState("");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchKeyword.trim()) {
            params.set("search", searchKeyword.trim());
        }
        if (locationKeyword.trim()) {
            params.set("location", locationKeyword.trim());
        }
        navigate(`/jobs?${params.toString()}`);
    };

    const handlePopularSearch = (term: string) => {
        const params = new URLSearchParams();
        params.set("search", term);
        navigate(`/jobs?${params.toString()}`);
    };

    const allFeatured = mockJobs.filter(job => job.featured);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (allFeatured.length <= 4) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allFeatured.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [allFeatured.length]);

    
    const featuredJobs = [];
    for (let i = 0; i < 4; i++) {
        featuredJobs.push(allFeatured[(currentIndex + i) % allFeatured.length]);
    }
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
            <Navbar />

            <main className="container py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    
                    <div className="lg:col-span-7 flex flex-col justify-center text-left">
                        <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                            Find Your <br className="hidden md:inline" />
                            <span className="text-blue-600">Dream Job</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-xl">
                            Discover thousands of job opportunities from top companies worldwide.
                        </p>

                        
                        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-2.5 shadow-sm focus-within:shadow-md focus-within:border-blue-400 dark:focus-within:border-blue-500 transition-all duration-200 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 max-w-3xl">

                            
                            <div className="flex items-center gap-3 flex-[1.4] px-4 md:px-5 py-3 md:py-0 rounded-xl bg-slate-50/60 md:bg-transparent dark:bg-slate-950/40 md:dark:bg-transparent border border-slate-100 md:border-none dark:border-slate-850">
                                <Search className="text-slate-400 dark:text-slate-500 shrink-0" size={19} />
                                <input
                                    type="text"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="Job title, keyword or company"
                                    className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-[14.5px] font-medium"
                                />
                            </div>

                            
                            <div className="hidden md:block h-8 border-r border-slate-200 dark:border-slate-800 mx-2 shrink-0"></div>

                            
                            <div className="flex items-center gap-3 flex-[0.8] px-4 md:px-4 py-3 md:py-0 rounded-xl bg-slate-50/60 md:bg-transparent dark:bg-slate-950/40 md:dark:bg-transparent border border-slate-100 md:border-none dark:border-slate-850">
                                <MapPin className="text-slate-400 dark:text-slate-500 shrink-0" size={19} />
                                <input
                                    type="text"
                                    value={locationKeyword}
                                    onChange={(e) => setLocationKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="Location"
                                    className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-[14.5px] font-medium"
                                />
                            </div>

                            
                            <button 
                                onClick={handleSearch}
                                className="w-full md:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-700 !text-white text-[14.5px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap active:scale-[0.98] cursor-pointer mt-1 md:mt-0 flex items-center justify-center"
                            >
                                Search Jobs
                            </button>

                        </div>

                        
                        <div className="flex flex-wrap items-center gap-2 mt-8 text-sm">
                            <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">
                                Popular searches:
                            </span>
                            {popularSearches.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handlePopularSearch(item)}
                                    className="text-xs font-semibold text-slate-600 dark:text-slate-350 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-full transition-colors duration-150 cursor-pointer"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-full">
                            <img
                                src={HomePageImg}
                                alt="Colleagues collaborating"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                </div>
            </main>

            
            <section className="container pb-24">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-2xl md:text-[1.75rem] font-bold text-slate-900 dark:text-white tracking-tight">
                            Popular Categories
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-[15px] font-medium">
                            Browse job opportunities by category
                        </p>
                    </div>
                    <Link
                        to="/jobs"
                        className="text-[15px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        View all
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                const params = new URLSearchParams();
                                params.set("category", cat.name);
                                navigate(`/jobs?${params.toString()}`);
                            }}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bgClass} transition-transform duration-300 group-hover:scale-110`}>
                                <cat.icon className={cat.iconClass} size={22} />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                    {cat.name}
                                </h3>
                                <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                                    {getCategoryJobsCount(cat.name)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            
            <section className="container pb-24">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-2xl md:text-[1.75rem] font-bold text-slate-900 dark:text-white tracking-tight">
                            Featured Jobs
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-[15px] font-medium">
                            Handpicked opportunities from top companies
                        </p>
                    </div>
                    <Link
                        to="/jobs"
                        className="text-[15px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        View all jobs
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredJobs.map((job, idx) => (
                        <Link
                            key={idx}
                            to={`/jobs/${job.id}`}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-slate-200 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group cursor-pointer no-underline text-inherit"
                        >
                            <div>
                                
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        {getCompanyLogo(job.company)}
                                    </div>
                                    {job.featured && (
                                        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-1 rounded-md">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                
                                <h3 className="text-[17px] font-bold text-slate-800 dark:text-slate-200 mt-5 group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                    {job.title}
                                </h3>

                                <p className="text-[14px] text-slate-500 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
                                     {job.company}
                                     <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                         <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                         <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                                     </svg>
                                 </p>

                                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[13px] font-medium mt-4">
                                    <MapPin size={16} />
                                    <span>{job.location}</span>
                                </div>

                                
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {job.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            
                            <div className="flex items-center gap-2 mt-8 text-[13px] font-semibold text-slate-400 dark:text-slate-500">
                                <span>{job.posted}</span>
                                <span>•</span>
                                <span className="text-slate-700 dark:text-slate-300 font-bold">
                                    {job.salary}
                                </span>
                            </div>

                        </Link>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;