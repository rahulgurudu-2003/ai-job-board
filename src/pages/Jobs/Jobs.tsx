import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, MapPin, ChevronDown, SlidersHorizontal, X, Briefcase } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { mockJobsData } from "../../data/jobsData";
import type { Job } from "../../data/jobsData";

const getJobExperienceLevel = (title: string): string => {
    const lower = title.toLowerCase();
    if (lower.includes("senior") || lower.includes("lead") || lower.includes("principal") || lower.includes("sr.")) {
        return "senior";
    }
    if (lower.includes("junior") || lower.includes("entry") || lower.includes("associate") || lower.includes("intern") || lower.includes("jr.")) {
        return "entry";
    }
    return "mid";
};

const getJobMaxSalary = (salaryStr: string): number => {
    const clean = salaryStr.replace(/[^0-9-]/g, '');
    const parts = clean.split('-');
    const val = parts.length > 1 ? parseInt(parts[1], 10) : parseInt(parts[0], 10);
    return isNaN(val) ? 0 : val;
};

const getPostedDays = (posted: string): number => {
    const lower = posted.toLowerCase();
    if (lower.includes("day")) {
        const match = lower.match(/(\d+)\s+day/);
        return match ? parseInt(match[1], 10) : 1;
    }
    if (lower.includes("week")) {
        const match = lower.match(/(\d+)\s+week/);
        const weeks = match ? parseInt(match[1], 10) : 1;
        return weeks * 7;
    }
    return 30; 
};

const Jobs = () => {
    const [searchParams] = useSearchParams();
    const querySearch = searchParams.get("search") || "";
    const queryLocation = searchParams.get("location") || "";
    const queryCategory = searchParams.get("category") || "";

    
    const [searchVal, setSearchVal] = useState(querySearch);
    const [locationVal, setLocationVal] = useState(queryLocation);
    const [filterLocationText, setFilterLocationText] = useState(queryLocation);
    const [categoryVal, setCategoryVal] = useState(queryCategory);

    useEffect(() => {
        setSearchVal(querySearch);
    }, [querySearch]);

    useEffect(() => {
        setLocationVal(queryLocation);
        setFilterLocationText(queryLocation);
    }, [queryLocation]);

    useEffect(() => {
        setCategoryVal(queryCategory);
    }, [queryCategory]);

    const [salaryRange, setSalaryRange] = useState(40);

    
    const [jobTypes, setJobTypes] = useState({
        fullTime: false,
        partTime: false,
        contract: false,
        internship: false,
    });

    
    const [workModes, setWorkModes] = useState({
        remote: false,
        hybrid: false,
        onSite: false,
    });

    
    const [expLevels, setExpLevels] = useState({
        entry: false,
        mid: false,
        senior: false,
    });

    
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [randomJobs, setRandomJobs] = useState<Job[]>([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const jobsListRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchVal, locationVal, filterLocationText, salaryRange, jobTypes, workModes, expLevels, categoryVal]);

    
    useEffect(() => {
        const shuffled = [...mockJobsData].sort(() => 0.5 - Math.random());
        setRandomJobs(shuffled.slice(0, 3));
    }, []);

    const handleClearAll = () => {
        setSearchVal("");
        setLocationVal("");
        setFilterLocationText("");
        setCategoryVal("");
        setSalaryRange(40);
        setJobTypes({ fullTime: false, partTime: false, contract: false, internship: false });
        setWorkModes({ remote: false, hybrid: false, onSite: false });
        setExpLevels({ entry: false, mid: false, senior: false });
        setCurrentPage(1);
    };

    const handleScrollToJobs = () => {
        jobsListRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    
    const filteredJobs = mockJobsData.filter((job) => {
        
        const matchesCategory = !categoryVal || 
            (job.category && job.category.toLowerCase() === categoryVal.toLowerCase());

        
        const matchesSearch = !searchVal.trim() || 
            job.title.toLowerCase().includes(searchVal.toLowerCase()) || 
            job.company.toLowerCase().includes(searchVal.toLowerCase());

        
        const matchesLocationTop = !locationVal.trim() || 
            job.location.toLowerCase().includes(locationVal.toLowerCase());
        const matchesLocationSide = !filterLocationText.trim() || 
            job.location.toLowerCase().includes(filterLocationText.toLowerCase());

        
        const selectedTypes = Object.entries(jobTypes)
            .filter(([_, checked]) => checked)
            .map(([key]) => {
                if (key === "fullTime") return "full-time";
                if (key === "partTime") return "part-time";
                return key.toLowerCase();
            });
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type.toLowerCase());

        
        const selectedModes = Object.entries(workModes)
            .filter(([_, checked]) => checked)
            .map(([key]) => {
                if (key === "onSite") return "on-site";
                return key.toLowerCase();
            });
        const matchesMode = selectedModes.length === 0 || selectedModes.includes(job.mode.toLowerCase());

        
        const selectedExp = Object.entries(expLevels)
            .filter(([_, checked]) => checked)
            .map(([key]) => key);
        const jobExp = getJobExperienceLevel(job.title);
        const matchesExp = selectedExp.length === 0 || selectedExp.includes(jobExp);

        
        const matchesSalary = getJobMaxSalary(job.salary) >= salaryRange;

        return matchesCategory && matchesSearch && matchesLocationTop && matchesLocationSide && matchesType && matchesMode && matchesExp && matchesSalary;
    });

    
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        const daysA = getPostedDays(a.posted);
        const daysB = getPostedDays(b.posted);
        return sortBy === "newest" ? daysA - daysB : daysB - daysA;
    });

    
    const itemsPerPage = 4;
    const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
    const paginatedJobs = sortedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    
    const countByType = (type: string) => mockJobsData.filter(j => j.type.toLowerCase() === type.toLowerCase()).length;
    const countByMode = (mode: string) => mockJobsData.filter(j => j.mode.toLowerCase() === mode.toLowerCase()).length;
    const countByExp = (exp: string) => mockJobsData.filter(j => getJobExperienceLevel(j.title) === exp).length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">

            
            <Navbar />

            
            <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">

                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    
                    <div className="flex items-center gap-3">
                        <h1 className="text-[22px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                            All Jobs
                        </h1>
                        {categoryVal && (
                            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                                Category: {categoryVal}
                                <button 
                                    onClick={() => setCategoryVal("")}
                                    className="hover:text-blue-800 dark:hover:text-blue-200 cursor-pointer font-bold focus:outline-none ml-0.5 text-sm"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>

                    
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer text-[13px]"
                        >
                            <SlidersHorizontal size={14} className="text-slate-500 dark:text-slate-400" />
                            Filters
                        </button>

                        
                        <div className="relative flex items-center gap-2 text-[13px]">
                            <span className="text-slate-400 dark:text-slate-500 font-medium">Sort by:</span>
                            <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                            >
                                {sortBy === "newest" ? "Newest" : "Oldest"}
                                <ChevronDown size={13} className={`transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
                            </button>
                            
                            {isSortOpen && (
                                <>
                                    <div className="fixed inset-0 z-45" onClick={() => setIsSortOpen(false)}></div>
                                    <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                                        <button
                                            onClick={() => {
                                                setSortBy("newest");
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-[13px] font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${sortBy === "newest" ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"}`}
                                        >
                                            Newest
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSortBy("oldest");
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-[13px] font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${sortBy === "oldest" ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"}`}
                                        >
                                            Oldest
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-3 shadow-sm mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                    
                    <div className="flex items-center flex-1 px-4 py-3 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-xl gap-2.5">
                        <Search size={17} className="text-slate-400 dark:text-slate-500 shrink-0" />
                        <input
                            type="text"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Search jobs, keywords or companies"
                            className="w-full bg-transparent border-none outline-none text-[14px] text-slate-750 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                        />
                    </div>

                    
                    <div className="flex items-center md:w-[240px] px-4 py-3 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-xl gap-2.5">
                        <MapPin size={17} className="text-slate-400 dark:text-slate-500 shrink-0" />
                        <input
                            type="text"
                            value={locationVal}
                            onChange={(e) => setLocationVal(e.target.value)}
                            placeholder="Location"
                            className="w-full bg-transparent border-none outline-none text-[14px] text-slate-750 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                        />
                    </div>

                    
                    <button 
                        onClick={handleScrollToJobs}
                        className="h-[46px] px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] rounded-xl transition shadow-md hover:shadow-lg active:scale-[0.98] shrink-0 cursor-pointer"
                    >
                        Search
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" ref={jobsListRef}>
                    
                    <>
                        
                        {isMobileFilterOpen && (
                            <div 
                                className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
                                onClick={() => setIsMobileFilterOpen(false)}
                            />
                        )}

                        <div className={`
                            bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 transition-all duration-300 shadow-sm
                            fixed inset-y-0 left-0 z-50 w-[300px] max-w-[calc(100vw-3rem)] h-full overflow-y-auto rounded-r-2xl border-r shadow-2xl
                            lg:static lg:z-auto lg:w-auto lg:h-fit lg:overflow-y-visible lg:rounded-2xl lg:shadow-none lg:border lg:translate-x-0 lg:col-span-1
                            ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                        `}>
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                                <span className="text-[16px] font-bold text-slate-900 dark:text-white">Filters</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleClearAll}
                                        className="text-[13px] font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                                    >
                                        Clear all
                                    </button>
                                    
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="lg:hidden text-slate-400 hover:text-slate-650 dark:hover:text-slate-350 cursor-pointer p-1"
                                        aria-label="Close filters"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-3">Job Type</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={jobTypes.fullTime}
                                                onChange={(e) => setJobTypes({ ...jobTypes, fullTime: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Full-time <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByType("Full-time")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={jobTypes.partTime}
                                                onChange={(e) => setJobTypes({ ...jobTypes, partTime: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Part-time <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByType("Part-time")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={jobTypes.contract}
                                                onChange={(e) => setJobTypes({ ...jobTypes, contract: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Contract <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByType("Contract")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={jobTypes.internship}
                                                onChange={(e) => setJobTypes({ ...jobTypes, internship: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Internship <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByType("Internship")})</span>
                                        </label>
                                    </div>
                                </div>

                                
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-3">Location</h3>
                                    <div className="relative flex items-center mb-3">
                                        <span className="absolute left-3.5 text-slate-400">
                                            <Search size={15} />
                                        </span>
                                        <input
                                            type="text"
                                            value={filterLocationText}
                                            onChange={(e) => setFilterLocationText(e.target.value)}
                                            placeholder="Enter location"
                                            className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-[13px] text-slate-700 dark:text-slate-200 font-medium focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={workModes.remote}
                                                onChange={(e) => setWorkModes({ ...workModes, remote: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Remote <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByMode("Remote")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={workModes.hybrid}
                                                onChange={(e) => setWorkModes({ ...workModes, hybrid: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Hybrid <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByMode("Hybrid")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={workModes.onSite}
                                                onChange={(e) => setWorkModes({ ...workModes, onSite: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            On-site <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByMode("On-site")})</span>
                                        </label>
                                    </div>
                                </div>

                                
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-3">Experience Level</h3>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={expLevels.entry}
                                                onChange={(e) => setExpLevels({ ...expLevels, entry: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Entry Level <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByExp("entry")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={expLevels.mid}
                                                onChange={(e) => setExpLevels({ ...expLevels, mid: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Mid Level <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByExp("mid")})</span>
                                        </label>
                                        <label className="flex items-center text-[14px] text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={expLevels.senior}
                                                onChange={(e) => setExpLevels({ ...expLevels, senior: e.target.checked })}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 mr-3"
                                            />
                                            Senior Level <span className="text-slate-400 dark:text-slate-500 ml-1.5">({countByExp("senior")})</span>
                                        </label>
                                    </div>
                                </div>

                                
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-[14px] font-bold text-slate-900 dark:text-white">Salary Range</h3>
                                    </div>
                                    <div className="flex items-center justify-between text-[12px] font-bold text-slate-450 dark:text-slate-500 mb-1">
                                        <span>$40K</span>
                                        <span>$200K+</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="40"
                                        max="200"
                                        value={salaryRange}
                                        onChange={(e) => setSalaryRange(Number(e.target.value))}
                                        className="w-full accent-blue-600 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer mb-2"
                                    />
                                    <div className="text-[13px] font-bold text-blue-600 dark:text-blue-400 text-center">
                                        Selected Limit: ${salaryRange}k
                                    </div>
                                </div>

                                
                                <button 
                                    onClick={() => {
                                        handleScrollToJobs();
                                        setIsMobileFilterOpen(false);
                                    }}
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] rounded-xl transition shadow-md mt-4 active:scale-[0.98] cursor-pointer"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </>

                    
                    <div className="lg:col-span-3 space-y-6">
                        
                        <div className="space-y-4">
                            {paginatedJobs.length > 0 ? (
                                paginatedJobs.map((job) => {
                                    return (
                                        <Link
                                            key={job.id}
                                            to={`/jobs/${job.id}`}
                                            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 md:p-6 flex items-start justify-between hover:shadow-lg hover:border-slate-350 dark:hover:border-slate-700/85 hover:-translate-y-1 transition-all duration-300 group cursor-pointer no-underline block animate-fade-in"
                                        >
                                            <div className="flex items-start gap-4">
                                                
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                                                    <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                                                </div>

                                                
                                                <div>
                                                    <h2 className="text-[16px] md:text-[18px] font-bold text-slate-900 dark:text-white group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                                        {job.title}
                                                    </h2>
                                                    <p className="text-[14px] text-slate-500 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
                                                        {job.company}
                                                        <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                                            <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                                            <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                                                        </svg>
                                                    </p>

                                                    
                                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin size={15} className="text-slate-400" />
                                                            {job.location}
                                                        </span>
                                                        <span className="text-slate-400 dark:text-slate-500">•</span>
                                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                            {job.salary}
                                                        </span>
                                                        <span className="text-slate-400 dark:text-slate-500">•</span>

                                                        
                                                        <div className="flex items-center gap-2 pl-0 sm:pl-2">
                                                            <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold rounded-full text-slate-500 dark:text-slate-400">
                                                                {job.type}
                                                            </span>
                                                            <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold rounded-full text-slate-500 dark:text-slate-400">
                                                                {job.mode}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="text-[12px] font-bold text-slate-450 dark:text-slate-500 shrink-0 mt-1">
                                                {job.posted}
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[350px]">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600 rounded-full flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-850">
                                        <Briefcase size={28} className="stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-[18px] font-bold text-slate-900 dark:text-white">No jobs match your search</h3>
                                    <p className="text-[13.5px] text-slate-555 dark:text-slate-500 mt-2 max-w-sm mx-auto">
                                        We couldn't find any job openings matching your current combination of filters. Try clearing your filters or widening your criteria.
                                    </p>
                                    <button 
                                        onClick={handleClearAll}
                                        className="mt-6 px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13.5px] rounded-xl transition shadow-md active:scale-97 cursor-pointer border-none"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination Section */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-6">
                                <button 
                                    onClick={() => {
                                        setCurrentPage(prev => Math.max(prev - 1, 1));
                                        handleScrollToJobs();
                                    }}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-xl bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-[14px] flex items-center justify-center transition cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => {
                                            setCurrentPage(page);
                                            handleScrollToJobs();
                                        }}
                                        className={`w-10 h-10 rounded-xl font-bold text-[14px] flex items-center justify-center transition cursor-pointer ${
                                            currentPage === page
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-transparent text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => {
                                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                        handleScrollToJobs();
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 rounded-xl bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-[14px] flex items-center justify-center transition cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        )}

                        {/* Random/Recommended Jobs Section */}
                        {randomJobs.length > 0 && (
                            <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800/80">
                                <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-4">
                                    Recommended Jobs for You
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {randomJobs.map((job) => (
                                        <Link
                                            key={`rand-${job.id}`}
                                            to={`/jobs/${job.id}`}
                                            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200 group cursor-pointer no-underline block"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                                                    <img src={job.logo} alt={job.company} className="w-6 h-6 object-contain" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[14px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 leading-tight">
                                                        {job.title}
                                                    </h4>
                                                    <p className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold line-clamp-1">
                                                        {job.company}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-[12px] text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-50 dark:border-slate-800/40">
                                                <span>{job.location}</span>
                                                <span className="font-semibold text-blue-600 dark:text-blue-400">{job.salary}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Jobs;
