import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    Search, 
    ChevronDown, 
    Trash2, 
    Bookmark, 
    ChevronLeft, 
    Bell, 
    Check, 
    Briefcase,
    MoreVertical,
    Grid,
    List
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/authApi";
import { mockJobsData } from "../../data/jobsData";
import { toast } from "sonner";



import GoogleLogo from "../../assets/logos/google.svg";
import MicrosoftLogo from "../../assets/logos/microsoft.svg";
import SpotifyLogo from "../../assets/logos/spotify.svg";
import AmazonLogo from "../../assets/logos/amazon.svg";
import NetflixLogo from "../../assets/logos/netflix.svg";
import HubSpotLogo from "../../assets/logos/hubspot.svg";
import AirbnbLogo from "../../assets/logos/airbnb.svg";
import SlackLogo from "../../assets/logos/slack.svg";

interface SavedJob {
    id: number;
    title: string;
    company: string;
    logo: string;
    location: string;
    mode: "Remote" | "Hybrid" | "On-site";
    salary: string;
    type: string;
    savedTime: string;
    isApplied: boolean;
    recentlyAdded: boolean;
}

const defaultSavedJobs: SavedJob[] = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Google",
        logo: GoogleLogo,
        location: "Mountain View, CA",
        mode: "Remote",
        salary: "$120k - $160k",
        type: "Full-time",
        savedTime: "Saved 2 days ago",
        isApplied: false,
        recentlyAdded: true
    },
    {
        id: 2,
        title: "Product Manager",
        company: "Microsoft",
        logo: MicrosoftLogo,
        location: "Redmond, WA",
        mode: "Hybrid",
        salary: "$130k - $180k",
        type: "Full-time",
        savedTime: "Saved 3 days ago",
        isApplied: false,
        recentlyAdded: true
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "Spotify",
        logo: SpotifyLogo,
        location: "New York, NY",
        mode: "Remote",
        salary: "$80k - $120k",
        type: "Full-time",
        savedTime: "Saved 5 days ago",
        isApplied: false,
        recentlyAdded: true
    },
    {
        id: 4,
        title: "Backend Engineer",
        company: "Amazon",
        logo: AmazonLogo,
        location: "Seattle, WA",
        mode: "On-site",
        salary: "$110k - $150k",
        type: "Full-time",
        savedTime: "Saved 1 week ago",
        isApplied: true,
        recentlyAdded: true
    },
    {
        id: 5,
        title: "Data Analyst",
        company: "Netflix",
        logo: NetflixLogo,
        location: "Los Angeles, CA",
        mode: "Hybrid",
        salary: "$80k - $110k",
        type: "Full-time",
        savedTime: "Saved 1 week ago",
        isApplied: false,
        recentlyAdded: false
    },
    {
        id: 6,
        title: "Marketing Manager",
        company: "HubSpot",
        logo: HubSpotLogo,
        location: "Cambridge, MA",
        mode: "Remote",
        salary: "$90k - $120k",
        type: "Full-time",
        savedTime: "Saved 2 weeks ago",
        isApplied: false,
        recentlyAdded: false
    },
    {
        id: 7,
        title: "Mobile Engineer",
        company: "Airbnb",
        logo: AirbnbLogo,
        location: "San Francisco, CA",
        mode: "Remote",
        salary: "$140k - $190k",
        type: "Full-time",
        savedTime: "Saved 2 weeks ago",
        isApplied: true,
        recentlyAdded: false
    },
    {
        id: 8,
        title: "DevOps Engineer",
        company: "Slack",
        logo: SlackLogo,
        location: "San Francisco, CA",
        mode: "Remote",
        salary: "$125k - $165k",
        type: "Full-time",
        savedTime: "Saved 3 weeks ago",
        isApplied: false,
        recentlyAdded: false
    }
];

const SavedJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<SavedJob[]>(() => {
        const saved = localStorage.getItem("saved_jobs_list");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                
            }
        }
        return defaultSavedJobs;
    });

    const [backendSavedIds, setBackendSavedIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedTab, setSelectedTab] = useState<string>("All Saved");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCompanyFilter, setSelectedCompanyFilter] = useState("All Jobs");
    const [sortBy, setSortBy] = useState("Most Recent");
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    
    
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [weeklyAlerts, setWeeklyAlerts] = useState(true);

    
    useEffect(() => {
        if (!user) return;
        
        const fetchBackendSavedJobs = async () => {
            setIsLoading(true);
            try {
                const data = await authService.getSavedJobs();
                const ids = data.map((item: any) => item.job_id);
                setBackendSavedIds(ids);
            } catch (err) {
                console.error("Error fetching saved jobs from backend:", err);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchBackendSavedJobs();
    }, [user]);

    
    useEffect(() => {
        if (!user) {
            localStorage.setItem("saved_jobs_list", JSON.stringify(jobs));
        }
    }, [jobs, user]);

    
    const appliedJobs = useMemo(() => {
        const stored = localStorage.getItem("user_applications_list");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                
            }
        }
        return [];
    }, []);

    
    const displayedJobs = useMemo(() => {
        if (user) {
            return mockJobsData
                .filter(job => backendSavedIds.includes(job.id))
                .map(job => {
                    const hasApplied = appliedJobs.some(
                        (app: any) => app.title === job.title && app.company === job.company
                    );
                    return {
                        id: job.id,
                        title: job.title,
                        company: job.company,
                        logo: job.logo,
                        location: job.location,
                        mode: job.mode,
                        salary: job.salary,
                        type: job.type,
                        savedTime: "Saved",
                        isApplied: hasApplied,
                        recentlyAdded: true
                    };
                });
        } else {
            return jobs.map(job => {
                const hasApplied = appliedJobs.some(
                    (app: any) => app.title === job.title && app.company === job.company
                );
                return {
                    ...job,
                    isApplied: hasApplied
                };
            });
        }
    }, [user, backendSavedIds, jobs, appliedJobs]);

    
    const uniqueCompanies = useMemo(() => {
        const companies = displayedJobs.map(j => j.company);
        return ["All Jobs", ...Array.from(new Set(companies))];
    }, [displayedJobs]);

    
    const counts = useMemo(() => {
        return {
            "All Saved": displayedJobs.length,
            "Recently Added": displayedJobs.filter(j => j.recentlyAdded).length,
            "Applied": displayedJobs.filter(j => j.isApplied).length,
            "Not Applied": displayedJobs.filter(j => !j.isApplied).length,
        };
    }, [displayedJobs]);

    
    const filteredJobs = useMemo(() => {
        return displayedJobs.filter(job => {
            
            if (selectedTab === "Recently Added" && !job.recentlyAdded) return false;
            if (selectedTab === "Applied" && !job.isApplied) return false;
            if (selectedTab === "Not Applied" && job.isApplied) return false;

            
            if (searchQuery.trim() !== "") {
                const query = searchQuery.toLowerCase();
                const matchesTitle = job.title.toLowerCase().includes(query);
                const matchesCompany = job.company.toLowerCase().includes(query);
                if (!matchesTitle && !matchesCompany) return false;
            }

            
            if (selectedCompanyFilter !== "All Jobs" && job.company !== selectedCompanyFilter) return false;

            return true;
        }).sort((a, b) => {
            if (sortBy === "Most Recent") {
                return a.id - b.id; 
            } else if (sortBy === "Oldest") {
                return b.id - a.id;
            }
            return 0;
        });
    }, [displayedJobs, selectedTab, searchQuery, selectedCompanyFilter, sortBy]);

    
    const handleToggleBookmark = async (id: number) => {
        if (user) {
            try {
                await authService.toggleSavedJob(id);
                setBackendSavedIds(prev => prev.filter(jobId => jobId !== id));
                toast.success("Job removed from saved list");
            } catch (err) {
                console.error("Error toggling saved job:", err);
                toast.error("Failed to remove job from saved list");
            }
        } else {
            setJobs(prev => prev.filter(job => job.id !== id));
            toast.success("Job removed from saved list");
        }
    };

    
    const handleClearAll = async () => {
        if (window.confirm("Are you sure you want to clear all saved jobs?")) {
            if (user) {
                try {
                    await Promise.all(backendSavedIds.map(id => authService.deleteSavedJob(id)));
                    setBackendSavedIds([]);
                    toast.success("All saved jobs cleared");
                } catch (err) {
                    console.error("Error clearing saved jobs:", err);
                    toast.error("Failed to clear saved jobs");
                }
            } else {
                setJobs([]);
                toast.success("All saved jobs cleared");
            }
        }
    };

    
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCompanyFilter("All Jobs");
        setSortBy("Most Recent");
    };


    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            
            <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
                
                <Link to="/" className="flex items-center gap-1.5 text-[14px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline mb-5 w-fit">
                    <ChevronLeft size={16} /> Back to home
                </Link>

                
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl md:text-[32px] font-bold text-slate-900 dark:text-white leading-tight">Saved Jobs</h1>
                        <p className="text-slate-550 dark:text-slate-400 text-[15px] mt-1.5">Jobs you've saved for later</p>
                    </div>
                    {jobs.length > 0 && (
                        <button 
                            onClick={handleClearAll}
                            className="flex items-center gap-2 px-4 py-2 border border-red-205 dark:border-red-900/30 bg-white dark:bg-slate-900 rounded-xl text-[14px] font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer shadow-sm border-solid"
                        >
                            <Trash2 size={15} /> Clear all saved
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Jobs List & Filters */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Tabs */}
                        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-none">
                            {([
                                { name: "All Saved", count: counts["All Saved"] },
                                { name: "Recently Added", count: counts["Recently Added"] },
                                { name: "Applied", count: counts["Applied"] },
                                { name: "Not Applied", count: counts["Not Applied"] }
                            ] as const).map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setSelectedTab(tab.name)}
                                    className={`relative px-4 py-3 text-[14px] font-medium transition-colors duration-200 shrink-0 whitespace-nowrap cursor-pointer hover:text-slate-900 dark:hover:text-white
                                        ${selectedTab === tab.name 
                                            ? "text-blue-600 dark:text-blue-400 font-semibold" 
                                            : "text-slate-500 dark:text-slate-400"
                                        }`}
                                >
                                    {tab.name} ({tab.count})
                                    {selectedTab === tab.name && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Search and Filters Bar */}
                        <div className="flex flex-col md:flex-row gap-3">
                            {/* Search box */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={17} />
                                <input
                                    type="text"
                                    placeholder="Search saved jobs"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-[14px] outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-550"
                                />
                            </div>

                            {/* Filters row */}
                            <div className="flex gap-3">
                                {/* Jobs Filter */}
                                <div className="relative inline-block text-left shrink-0">
                                    <select
                                        value={selectedCompanyFilter}
                                        onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-855 rounded-xl text-[14px] font-medium text-slate-650 dark:text-slate-350 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer pr-12"
                                    >
                                        <option value="All Jobs">All Jobs</option>
                                        {uniqueCompanies.filter(c => c !== "All Jobs").map(company => (
                                            <option key={company} value={company}>{company}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={14} />
                                </div>

                                {/* Sort Filter */}
                                <div className="relative inline-block text-left shrink-0">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-855 rounded-xl text-[14px] font-medium text-slate-650 dark:text-slate-350 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer pr-12"
                                    >
                                        <option value="Most Recent">Most Recent</option>
                                        <option value="Oldest">Oldest</option>
                                    </select>
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={14} />
                                </div>

                                {/* View Mode Toggles */}
                                <div className="flex items-center border border-slate-200 dark:border-slate-855 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm shrink-0">
                                    <button 
                                        onClick={() => setViewMode("list")}
                                        className={`p-2.5 cursor-pointer transition-colors ${viewMode === "list" ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                                    >
                                        <List size={16} />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2.5 border-l border-slate-200 dark:border-slate-855 cursor-pointer transition-colors ${viewMode === "grid" ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                                    >
                                        <Grid size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Saved Jobs listing */}
                        <div className={viewMode === "list" ? "space-y-3.5" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
                            {isLoading ? (
                                <div className="col-span-full py-16 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-[14px]">Loading saved jobs...</p>
                                </div>
                            ) : filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        onClick={() => navigate(`/jobs/${job.id}`)}
                                        className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200 group relative cursor-pointer"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Ribbon bookmark toggle */}
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleBookmark(job.id);
                                                }}
                                                className="text-blue-600 hover:text-slate-400 dark:text-blue-400 transition-colors p-0.5 cursor-pointer shrink-0 focus:outline-none bg-transparent border-none relative z-10"
                                                aria-label="Remove job bookmark"
                                            >
                                                <Bookmark size={20} fill="currentColor" />
                                            </button>

                                            {/* Company logo */}
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
                                                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                                            </div>

                                            {/* Job metadata details */}
                                            <div className="flex-1 min-w-0">
                                                <Link 
                                                    to={`/jobs/${job.id}`} 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[16px] md:text-[17px] font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug no-underline truncate block mb-1"
                                                >
                                                    {job.title}
                                                </Link>
                                                <div className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400 font-semibold mb-2">
                                                    <span>{job.company}</span>
                                                    <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                                        <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                                        <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                                                    </svg>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12.5px] text-slate-500 dark:text-slate-400 font-medium mb-3">
                                                    <span>{job.location}</span>
                                                    <span>•</span>
                                                    <span>{job.mode}</span>
                                                    <span>•</span>
                                                    <span className="text-slate-600 dark:text-slate-300 font-semibold">{job.salary}</span>
                                                </div>

                                                {/* Badges */}
                                                <div className="flex gap-2">
                                                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                        {job.type}
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                        {job.mode}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side Options & Saved text */}
                                        <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
                                            <span className="text-[12px] font-medium text-slate-400 dark:text-slate-555">
                                                {job.savedTime}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {job.isApplied && (
                                                    <span className="text-[11px] font-bold text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20 px-2 py-0.5 rounded">
                                                        Applied
                                                    </span>
                                                )}
                                                <button 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer p-1 rounded-lg focus:outline-none bg-transparent border-none relative z-10"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : displayedJobs.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl col-span-full shadow-sm flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-955/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-blue-50/50 dark:ring-blue-955/10">
                                        <Bookmark size={36} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No saved jobs yet</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-[14.5px] max-w-sm mx-auto mb-8 leading-relaxed">
                                        Bookmark jobs that catch your eye, and they will appear here. Build your list and apply when you are ready!
                                    </p>
                                    <Link to="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg no-underline text-[14.5px] cursor-pointer">
                                        Explore Jobs
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl col-span-full shadow-sm flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600 rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-850">
                                        <Search size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matching saved jobs</h3>
                                    <p className="text-slate-550 dark:text-slate-400 text-[14.5px] max-w-sm mx-auto mb-8 leading-relaxed">
                                        We couldn't find any saved jobs matching your search query or filters. Try clearing your search text.
                                    </p>
                                    <button 
                                        onClick={handleResetFilters}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg text-[14.5px] cursor-pointer border-none"
                                    >
                                        Reset Filters
                                    </button>
                                </div>  )}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-4 space-y-6">
                        
                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-3.5 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <h2 className="text-[15.5px] font-bold text-slate-900 dark:text-white">Job Alerts</h2>
                                    <p className="text-[12.5px] text-slate-500 dark:text-slate-450 mt-0.5 leading-snug">
                                        Get notified about new jobs that match your preferences.
                                    </p>
                                </div>
                            </div>

                            <p className="text-[13.5px] font-bold text-slate-800 dark:text-slate-200 mb-4 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                                Frontend Developer, Remote
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-[13.5px]">
                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Email notifications</span>
                                    <button 
                                        onClick={() => setEmailAlerts(!emailAlerts)}
                                        className={`w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 focus:outline-none border-none ${
                                            emailAlerts ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-800"
                                        }`}
                                    >
                                        <div 
                                            className={`bg-white w-4.5 h-4.5 rounded-full shadow transform transition-transform duration-200 ${
                                                emailAlerts ? "translate-x-4.5" : "translate-x-0"
                                            }`}
                                        />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center text-[13.5px]">
                                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Weekly digest</span>
                                    <button 
                                        onClick={() => setWeeklyAlerts(!weeklyAlerts)}
                                        className={`w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 focus:outline-none border-none ${
                                            weeklyAlerts ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-800"
                                        }`}
                                    >
                                        <div 
                                            className={`bg-white w-4.5 h-4.5 rounded-full shadow transform transition-transform duration-200 ${
                                                weeklyAlerts ? "translate-x-4.5" : "translate-x-0"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-2.5 border border-slate-200 dark:border-slate-855 text-slate-700 dark:text-slate-300 font-bold text-[13.5px] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer bg-white dark:bg-slate-900">
                                Manage Alerts
                            </button>
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">Improve Your Profile</h2>
                            <p className="text-[12.5px] text-slate-500 dark:text-slate-450 mt-1 leading-snug">
                                A complete profile increases your chances of getting hired.
                            </p>

                            <div className="mt-4 flex items-center justify-between text-[12px] font-bold text-slate-500 dark:text-slate-400">
                                <span>Complete your profile</span>
                                <span className="text-blue-600 dark:text-blue-400">80%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full w-[80%]" />
                            </div>

                            <div className="space-y-4 mt-6 mb-6">
                                <div className="flex items-center gap-3 text-[13.5px] text-slate-600 dark:text-slate-350">
                                    <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="font-medium">Upload your resume</span>
                                    <span className="ml-auto text-green-600 dark:text-green-400"><Check size={16} /></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13.5px] text-slate-650 dark:text-slate-350">
                                    <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="font-medium">Add skills</span>
                                    <span className="ml-auto text-green-600 dark:text-green-400"><Check size={16} /></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13.5px] text-slate-650 dark:text-slate-350">
                                    <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="font-medium">Add work experience</span>
                                    <span className="ml-auto text-green-600 dark:text-green-400"><Check size={16} /></span>
                                </div>
                                <div className="flex items-center gap-3 text-[13.5px] text-slate-650 dark:text-slate-350">
                                    <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0" />
                                    <span className="font-medium text-slate-400 dark:text-slate-500">Add education</span>
                                </div>
                            </div>

                            <Link to="/profile" className="block w-full no-underline">
                                <button className="w-full py-2.5 border border-slate-200 dark:border-slate-855 text-slate-700 dark:text-slate-300 font-bold text-[13.5px] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer bg-white dark:bg-slate-900">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>

                        
                        <div className="bg-[#F6F9FF] dark:bg-blue-950/15 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center shrink-0">
                                    <Briefcase size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[15px] font-bold text-blue-950 dark:text-blue-300">Want to stand out?</h3>
                                    <p className="text-[12.5px] text-slate-650 dark:text-slate-400 mt-1 leading-snug">
                                        Unlock premium features to get noticed by top companies.
                                    </p>
                                </div>
                            </div>
                            <Link 
                                to="/pricing"
                                className="flex items-center justify-between w-full mt-4 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13.5px] rounded-xl transition shadow-md no-underline"
                            >
                                <span>Go Premium</span>
                                <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default SavedJobs;
