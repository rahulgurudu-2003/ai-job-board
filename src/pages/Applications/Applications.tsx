import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    Search, 
    ChevronDown, 
    ChevronRight, 
    ChevronLeft, 
    FileText, 
    Bell, 
    User, 
    Briefcase
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/authApi";
import { mockJobsData } from "../../data/jobsData";


import GoogleLogo from "../../assets/logos/google.svg";
import MicrosoftLogo from "../../assets/logos/microsoft.svg";
import SlackLogo from "../../assets/logos/slack.svg";
import AmazonLogo from "../../assets/logos/amazon.svg";
import NetflixLogo from "../../assets/logos/netflix.svg";
import SpotifyLogo from "../../assets/logos/spotify.svg";
import AirbnbLogo from "../../assets/logos/airbnb.svg";
import HubSpotLogo from "../../assets/logos/hubspot.svg";
import MetaLogo from "../../assets/logos/meta.svg";
import AppleLogo from "../../assets/logos/apple.svg";

interface Application {
    id: number;
    title: string;
    company: string;
    logo: string;
    location: string;
    appliedDate: string;
    status: "Under Review" | "Interview" | "Offered" | "Rejected";
}

const mockApplications: Application[] = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Google",
        logo: GoogleLogo,
        location: "Mountain View, CA",
        appliedDate: "May 20, 2024",
        status: "Under Review"
    },
    {
        id: 2,
        title: "Product Manager",
        company: "Microsoft",
        logo: MicrosoftLogo,
        location: "Redmond, WA",
        appliedDate: "May 18, 2024",
        status: "Interview"
    },
    {
        id: 3,
        title: "UX Designer",
        company: "Slack",
        logo: SlackLogo,
        location: "San Francisco, CA",
        appliedDate: "May 15, 2024",
        status: "Interview"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "Spotify",
        logo: SpotifyLogo,
        location: "New York, NY",
        appliedDate: "May 15, 2024",
        status: "Interview"
    },
    {
        id: 5,
        title: "Backend Engineer",
        company: "Amazon",
        logo: AmazonLogo,
        location: "Seattle, WA",
        appliedDate: "May 10, 2024",
        status: "Offered"
    },
    {
        id: 6,
        title: "Data Analyst",
        company: "Netflix",
        logo: NetflixLogo,
        location: "Los Angeles, CA",
        appliedDate: "May 8, 2024",
        status: "Rejected"
    },
    {
        id: 7,
        title: "DevOps Engineer",
        company: "HubSpot",
        logo: HubSpotLogo,
        location: "Boston, MA",
        appliedDate: "May 5, 2024",
        status: "Rejected"
    },
    {
        id: 8,
        title: "Mobile Engineer",
        company: "Airbnb",
        logo: AirbnbLogo,
        location: "San Francisco, CA",
        appliedDate: "May 3, 2024",
        status: "Under Review"
    },
    {
        id: 9,
        title: "Security Analyst",
        company: "Meta",
        logo: MetaLogo,
        location: "Menlo Park, CA",
        appliedDate: "May 1, 2024",
        status: "Rejected"
    },
    {
        id: 10,
        title: "Quality Assurance",
        company: "Apple",
        logo: AppleLogo,
        location: "Cupertino, CA",
        appliedDate: "Apr 28, 2024",
        status: "Rejected"
    }
];

const Applications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        if (user) {
            const fetchApplications = async () => {
                try {
                    const data = await authService.getApplications();
                    const mapped = data.map((app: any) => {
                        const jobDetail = mockJobsData.find(j => j.id === app.job_id);
                        if (jobDetail) {
                            return {
                                id: app.id,
                                title: jobDetail.title,
                                company: jobDetail.company,
                                logo: jobDetail.logo,
                                location: jobDetail.location,
                                appliedDate: new Date(app.applied_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                status: app.status
                            };
                        }
                        return null;
                    }).filter(Boolean);
                    setApplications(mapped);
                } catch (err) {
                    console.error("Error fetching applications from backend:", err);
                }
            };
            fetchApplications();
        } else {
            const stored = localStorage.getItem("user_applications_list");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setApplications(parsed);
                        return;
                    }
                } catch (e) {
                    
                }
            }
            localStorage.setItem("user_applications_list", JSON.stringify(mockApplications));
            setApplications(mockApplications);
        }
    }, [user]);

    const [selectedTab, setSelectedTab] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCompanyFilter, setSelectedCompanyFilter] = useState("All Jobs");
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("All Status");
    const [sortBy, setSortBy] = useState("Latest Applied");

    
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCompanyFilter("All Jobs");
        setSelectedStatusFilter("All Status");
        setSortBy("Latest Applied");
    };

    
    const counts = useMemo(() => {
        return {
            All: applications.length,
            "Under Review": applications.filter(a => a.status === "Under Review").length,
            "Interview": applications.filter(a => a.status === "Interview").length,
            "Offered": applications.filter(a => a.status === "Offered").length,
            "Rejected": applications.filter(a => a.status === "Rejected").length,
        };
    }, [applications]);

    
    const uniqueCompanies = useMemo(() => {
        const companies = applications.map(a => a.company);
        return ["All Jobs", ...Array.from(new Set(companies))];
    }, [applications]);

    
    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            
            if (selectedTab !== "All" && app.status !== selectedTab) {
                return false;
            }
            
            if (searchQuery.trim() !== "") {
                const query = searchQuery.toLowerCase();
                const matchesTitle = app.title.toLowerCase().includes(query);
                const matchesCompany = app.company.toLowerCase().includes(query);
                if (!matchesTitle && !matchesCompany) return false;
            }
            
            if (selectedCompanyFilter !== "All Jobs" && app.company !== selectedCompanyFilter) {
                return false;
            }
            
            if (selectedStatusFilter !== "All Status" && app.status !== selectedStatusFilter) {
                return false;
            }
            return true;
        }).sort((a, b) => {
            if (sortBy === "Latest Applied") {
                return b.id - a.id;
            } else if (sortBy === "Oldest Applied") {
                return a.id - b.id;
            }
            return 0;
        });
    }, [applications, selectedTab, searchQuery, selectedCompanyFilter, selectedStatusFilter, sortBy]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Under Review":
                return "bg-blue-50/80 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/20";
            case "Interview":
                return "bg-purple-50/80 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border border-purple-100/40 dark:border-purple-900/20";
            case "Offered":
                return "bg-green-50/80 text-green-600 dark:bg-green-950/20 dark:text-green-400 border border-green-100/40 dark:border-green-900/20";
            case "Rejected":
                return "bg-red-50/80 text-red-600 dark:bg-red-950/20 dark:text-red-400 border border-red-100/40 dark:border-red-900/20";
            default:
                return "bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400";
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            
            <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
                
                <Link to="/" className="flex items-center gap-1.5 text-[14px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline mb-5 w-fit">
                    <ChevronLeft size={16} /> Back to home
                </Link>

                
                <div className="mb-8">
                    <h1 className="text-3xl md:text-[32px] font-bold text-slate-900 dark:text-white leading-tight">My Applications</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-[15px] mt-1.5">Track and manage your job applications</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    
                    <div className="lg:col-span-8 space-y-6">
                        
                        
                        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-none">
                            {(["All", "Under Review", "Interview", "Offered", "Rejected"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={`relative px-4 py-3 text-[14px] font-medium transition-colors duration-200 shrink-0 whitespace-nowrap cursor-pointer hover:text-slate-900 dark:hover:text-white
                                        ${selectedTab === tab 
                                            ? "text-blue-600 dark:text-blue-400 font-semibold" 
                                            : "text-slate-500 dark:text-slate-400"
                                        }`}
                                >
                                    {tab} ({counts[tab]})
                                    {selectedTab === tab && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        
                        <div className="flex flex-col md:flex-row gap-3">
                            
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={17} />
                                <input
                                    type="text"
                                    placeholder="Search applications"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-[14px] outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-550"
                                />
                            </div>

                            
                            <div className="flex flex-wrap md:flex-nowrap gap-3">
                                
                                <div className="relative inline-block text-left shrink-0">
                                    <select
                                        value={selectedCompanyFilter}
                                        onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-[14px] font-medium text-slate-650 dark:text-slate-350 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer pr-12"
                                    >
                                        <option value="All Jobs">All Jobs</option>
                                        {uniqueCompanies.filter(c => c !== "All Jobs").map(company => (
                                            <option key={company} value={company}>{company}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={14} />
                                </div>

                                
                                <div className="relative inline-block text-left shrink-0">
                                    <select
                                        value={selectedStatusFilter}
                                        onChange={(e) => setSelectedStatusFilter(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-[14px] font-medium text-slate-650 dark:text-slate-350 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer pr-12"
                                    >
                                        <option value="All Status">All Status</option>
                                        <option value="Under Review">Under Review</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offered">Offered</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={14} />
                                </div>

                                
                                <div className="relative inline-block text-left shrink-0">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-[14px] font-medium text-slate-650 dark:text-slate-350 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer pr-12"
                                    >
                                        <option value="Latest Applied">Latest Applied</option>
                                        <option value="Oldest Applied">Oldest Applied</option>
                                    </select>
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={14} />
                                </div>
                            </div>
                        </div>

                        
                        <div className="space-y-3.5">
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 md:p-6 flex items-center justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
                                                <img src={app.logo} alt={app.company} className="w-8 h-8 object-contain" />
                                            </div>

                                            
                                            <div>
                                                <h3 className="text-[16px] md:text-[17px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                                    {app.title}
                                                </h3>
                                                <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                                                    <span>{app.company}</span>
                                                    <span className="text-slate-300 dark:text-slate-700">•</span>
                                                    <span>{app.location}</span>
                                                </div>
                                                <p className="text-[12px] text-slate-400 dark:text-slate-550 mt-2 font-medium">
                                                    Applied on {app.appliedDate}
                                                </p>
                                            </div>
                                        </div>

                                        
                                        <div className="flex items-center gap-4 shrink-0">
                                            <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${getStatusStyle(app.status)}`}>
                                                {app.status}
                                            </span>
                                            <ChevronRight size={18} className="text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </div>
                                ))
                            ) : applications.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-955/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-blue-50/50 dark:ring-blue-955/10">
                                        <Briefcase size={36} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No applications yet</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-[14.5px] max-w-sm mx-auto mb-8 leading-relaxed">
                                        You haven't submitted any job applications yet. Find your dream job and start applying today!
                                    </p>
                                    <Link to="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg no-underline text-[14.5px] cursor-pointer">
                                        Explore Jobs
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600 rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-850">
                                        <Search size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matching applications</h3>
                                    <p className="text-slate-550 dark:text-slate-400 text-[14.5px] max-w-sm mx-auto mb-8 leading-relaxed">
                                        We couldn't find any applications matching your search terms or filters. Try resetting your search text.
                                    </p>
                                    <button 
                                        onClick={handleResetFilters}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg text-[14.5px] cursor-pointer border-none"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-4 space-y-6">
                        
                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white mb-4">Application Summary</h2>
                            <div className="space-y-3.5">
                                <div 
                                    onClick={() => setSelectedTab("All")}
                                    className="flex justify-between items-center text-[14px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors"
                                >
                                    <span className="text-slate-550 dark:text-slate-400 font-medium">Total Applications</span>
                                    <span className="font-bold text-blue-650 dark:text-blue-400">{counts.All}</span>
                                </div>
                                <div 
                                    onClick={() => setSelectedTab("Under Review")}
                                    className="flex justify-between items-center text-[14px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors"
                                >
                                    <span className="text-slate-550 dark:text-slate-400 font-medium">Under Review</span>
                                    <span className="font-bold text-blue-500 dark:text-blue-400">{counts["Under Review"]}</span>
                                </div>
                                <div 
                                    onClick={() => setSelectedTab("Interview")}
                                    className="flex justify-between items-center text-[14px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors"
                                >
                                    <span className="text-slate-550 dark:text-slate-400 font-medium">Interview</span>
                                    <span className="font-bold text-purple-650 dark:text-purple-400">{counts.Interview}</span>
                                </div>
                                <div 
                                    onClick={() => setSelectedTab("Offered")}
                                    className="flex justify-between items-center text-[14px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors"
                                >
                                    <span className="text-slate-550 dark:text-slate-400 font-medium">Offered</span>
                                    <span className="font-bold text-green-650 dark:text-green-400">{counts.Offered}</span>
                                </div>
                                <div 
                                    onClick={() => setSelectedTab("Rejected")}
                                    className="flex justify-between items-center text-[14px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 p-1.5 rounded-lg transition-colors"
                                >
                                    <span className="text-slate-550 dark:text-slate-400 font-medium">Rejected</span>
                                    <span className="font-bold text-red-500 dark:text-red-400">{counts.Rejected}</span>
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white mb-5">Improve Your Chances</h2>
                            <div className="space-y-5">
                                
                                
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <User size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[14px] font-bold text-slate-850 dark:text-slate-200">Complete Your Profile</h4>
                                        <p className="text-[12.5px] text-slate-500 dark:text-slate-450 mt-1 leading-snug">
                                            A complete profile increases your chances of getting noticed by recruiters.
                                        </p>
                                        <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                            <span>80% Complete</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                            <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full w-[80%]" />
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[14px] font-bold text-slate-850 dark:text-slate-200">Upload Your Resume</h4>
                                        <p className="text-[12.5px] text-slate-500 dark:text-slate-450 mt-1 leading-snug">
                                            Make sure your resume is up to date and optimized for ATS.
                                        </p>
                                        <Link to="/profile" className="inline-block text-[13px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2 hover:underline no-underline">
                                            Upload Resume
                                        </Link>
                                    </div>
                                </div>

                                
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                                        <Bell size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[14px] font-bold text-slate-850 dark:text-slate-200">Set Job Alerts</h4>
                                        <p className="text-[12.5px] text-slate-500 dark:text-slate-450 mt-1 leading-snug">
                                            Get notified about new opportunities that match your skills.
                                        </p>
                                        <button className="text-[13px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2 hover:underline cursor-pointer bg-transparent border-none p-0">
                                            Create Alert
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                        <div className="bg-[#EBF3FF] dark:bg-blue-950/15 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
                            <h3 className="text-[16px] font-bold text-blue-900 dark:text-blue-300">Need Help?</h3>
                            <p className="text-[13px] text-slate-650 dark:text-slate-400 mt-2 leading-relaxed">
                                Visit our resources page for tips on resume building, interview preparation and more.
                            </p>
                            <Link 
                                to="/jobs"
                                className="inline-flex items-center justify-center w-full mt-4 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] rounded-xl transition shadow-sm no-underline"
                            >
                                Visit Resources
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Applications;
