import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
    ChevronLeft, 
    Heart, 
    MapPin, 
    DollarSign, 
    AlertCircle, 
    ExternalLink, 
    Mail, 
    Monitor, 
    Globe, 
    Users, 
    ChevronRight,
    Check,
    X,
    Briefcase,
    FileCheck,
    Clock
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { mockJobsData } from "../../data/jobsData";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/authApi";
import { toast } from "sonner";


const JobDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const job = useMemo(() => {
        const jobId = parseInt(id || "", 10);
        return mockJobsData.find(j => j.id === jobId);
    }, [id]);

    const [activeTab, setActiveTab] = useState<"Overview" | "About Company" | "Requirements" | "Benefits">("Overview");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        if (!job) return;
        
        if (user) {
            const checkBackendSaved = async () => {
                try {
                    const data = await authService.getSavedJobs();
                    const isJobSaved = data.some((item: any) => item.job_id === job.id);
                    setIsSaved(isJobSaved);
                } catch (err) {
                    console.error("Error checking saved state from backend:", err);
                }
            };
            checkBackendSaved();
        } else {
            const saved = localStorage.getItem("saved_jobs_list");
            if (saved) {
                try {
                    const list = JSON.parse(saved);
                    if (Array.isArray(list)) {
                        setIsSaved(list.some((j: any) => j.id === job.id));
                    }
                } catch (e) {
                    
                }
            }
        }
    }, [job, user]);

    
    const [isApplied, setIsApplied] = useState(false);
    useEffect(() => {
        if (!job) return;
        
        if (user) {
            const checkBackendApplied = async () => {
                try {
                    const data = await authService.getApplications();
                    const isJobApplied = data.some((item: any) => item.job_id === job.id);
                    setIsApplied(isJobApplied);
                } catch (err) {
                    console.error("Error checking applied state from backend:", err);
                }
            };
            checkBackendApplied();
        } else {
            const applied = localStorage.getItem("user_applications_list");
            if (applied) {
                try {
                    const list = JSON.parse(applied);
                    if (Array.isArray(list)) {
                        setIsApplied(list.some((a: any) => a.title === job.title && a.company === job.company));
                    }
                } catch (e) {
                    
                }
            }
        }
    }, [job, user]);

    if (!job) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100">
                <Navbar />
                <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
                    <AlertCircle className="mx-auto text-slate-350 dark:text-slate-650 mb-3" size={48} />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Not Found</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">The job position you are looking for does not exist or has expired.</p>
                    <Link to="/jobs" className="inline-flex items-center justify-center mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition no-underline">
                        Return to Jobs
                    </Link>
                </div>
            </div>
        );
    }

    
    const handleToggleSave = async () => {
        if (user) {
            try {
                const res = await authService.toggleSavedJob(job.id);
                setIsSaved(res.saved);
            } catch (err) {
                console.error("Error toggling save job on backend:", err);
            }
        } else {
            const saved = localStorage.getItem("saved_jobs_list");
            let list = [];
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        list = parsed;
                    }
                } catch (e) {
                    list = [];
                }
            }

            if (isSaved) {
                list = list.filter((j: any) => j.id !== job.id);
                setIsSaved(false);
            } else {
                const newSavedJob = {
                    id: job.id,
                    title: job.title,
                    company: job.company,
                    logo: job.logo,
                    location: job.location,
                    mode: job.mode,
                    salary: job.salary,
                    type: job.type,
                    savedTime: "Saved just now",
                    isApplied: isApplied,
                    recentlyAdded: true
                };
                list.push(newSavedJob);
                setIsSaved(true);
            }
            localStorage.setItem("saved_jobs_list", JSON.stringify(list));
        }
    };

    
    const handleApply = async () => {
        if (isApplied) return;

        if (user) {
            try {
                await authService.submitApplication(job.id);
                setIsApplied(true);
                setShowSuccessModal(true);
                toast.success(`Application submitted successfully!`);
            } catch (err: any) {
                console.error("Error applying to job on backend:", err);
                toast.error(err.response?.data?.error || "Error applying to job.");
            }
        } else {
            
            const applied = localStorage.getItem("user_applications_list");
            let list = [];
            if (applied) {
                try {
                    const parsed = JSON.parse(applied);
                    if (Array.isArray(parsed)) {
                        list = parsed;
                    }
                } catch (e) {
                    list = [];
                }
            }

            
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            const dateStr = new Date().toLocaleDateString('en-US', options);

            const newApplication = {
                id: list.length + 100, 
                title: job.title,
                company: job.company,
                logo: job.logo,
                location: job.location,
                appliedDate: dateStr,
                status: "Under Review"
            };

            list.push(newApplication);
            localStorage.setItem("user_applications_list", JSON.stringify(list));
            setIsApplied(true);

            
            const saved = localStorage.getItem("saved_jobs_list");
            if (saved) {
                try {
                    let savedList = JSON.parse(saved);
                    savedList = savedList.map((j: any) => {
                        if (j.id === job.id) {
                            return { ...j, isApplied: true };
                        }
                        return j;
                    });
                    localStorage.setItem("saved_jobs_list", JSON.stringify(savedList));
                } catch (e) {
                    
                }
            }

            setShowSuccessModal(true);
            toast.success(`Application submitted successfully!`);
        }
    };


    
    const similarJobs = mockJobsData.filter(j => j.id !== job.id).slice(0, 2);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            
            <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
                
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <Link to="/jobs" className="flex items-center gap-1.5 text-[14px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline">
                        <ChevronLeft size={16} /> Back to jobs
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        
                        <button 
                            onClick={handleToggleSave}
                            className={`flex items-center gap-2 px-5 py-2.5 border rounded-xl text-[14px] font-bold transition-all duration-200 cursor-pointer shadow-sm border-solid focus:outline-none ${
                                isSaved 
                                    ? "border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                                    : "border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                        >
                            <Heart size={16} className={isSaved ? "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" : ""} />
                            {isSaved ? "Saved" : "Save Job"}
                        </button>

                        
                        <button 
                            onClick={handleApply}
                            disabled={isApplied}
                            className={`px-6 py-2.5 font-bold text-[14px] rounded-xl shadow-md transition-all active:scale-[0.98] border-none ${
                                isApplied
                                    ? "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            }`}
                        >
                            {isApplied ? "Applied" : "Apply Now"}
                        </button>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 flex items-start gap-6 mb-8 transition-colors shadow-sm relative overflow-hidden">
                    
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                        <img src={job.logo} alt={job.company} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {job.title}
                        </h1>
                        <p className="text-[15px] text-slate-500 dark:text-slate-400 font-bold mt-1.5 flex items-center gap-1.5">
                            {job.company}
                            <svg className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                            </svg>
                        </p>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13.5px] text-slate-500 dark:text-slate-400 font-semibold">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={15} className="text-slate-400" />
                                {job.location}
                            </span>
                            <span className="text-slate-350 dark:text-slate-700">•</span>
                            <span className="flex items-center gap-1.5">
                                <Monitor size={15} className="text-slate-400" />
                                {job.mode}
                            </span>
                            <span className="text-slate-350 dark:text-slate-700">•</span>
                            <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                                <DollarSign size={15} className="text-slate-400" />
                                {job.salary}
                            </span>
                            <span className="text-slate-350 dark:text-slate-700">•</span>
                            <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] rounded font-bold text-slate-500 dark:text-slate-400">
                                {job.type}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[12px] text-slate-400 dark:text-slate-500 mt-5 font-medium">
                            <span>Posted {job.posted}</span>
                            <span>•</span>
                            <span>{job.applicants} applicants</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <div className="lg:col-span-8 space-y-6">
                        
                        
                        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px scrollbar-none">
                            {(["Overview", "About Company", "Requirements", "Benefits"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-5 py-3.5 text-[14.5px] font-semibold transition-colors duration-200 shrink-0 whitespace-nowrap cursor-pointer hover:text-slate-900 dark:hover:text-white bg-transparent border-none focus:outline-none
                                        ${activeTab === tab 
                                            ? "text-blue-600 dark:text-blue-400" 
                                            : "text-slate-500 dark:text-slate-400"
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        
                        <div key={activeTab} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-7 transition-colors shadow-sm animate-fade-in">
                            
                            {activeTab === "Overview" && (
                                <>
                                    
                                    <div className="space-y-3">
                                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">Job Description</h3>
                                        <p className="text-[14.5px] text-slate-600 dark:text-slate-450 leading-relaxed font-medium">
                                            {job.description}
                                        </p>
                                    </div>

                                    
                                    <div className="space-y-3">
                                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">Responsibilities</h3>
                                        <ul className="list-disc pl-5 space-y-2.5">
                                            {job.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="text-[14px] text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                                                    {resp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    
                                    <div className="space-y-3">
                                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">Requirements</h3>
                                        <ul className="list-disc pl-5 space-y-2.5">
                                            {job.requirements.map((req, idx) => (
                                                <li key={idx} className="text-[14px] text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    
                                    <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                        <h3 className="text-[15.5px] font-bold text-slate-900 dark:text-white">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill) => (
                                                <span 
                                                    key={skill}
                                                    className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg border border-slate-100 dark:border-slate-850"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === "About Company" && (
                                <div className="space-y-4">
                                    <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">About {job.company}</h3>
                                    <p className="text-[14.5px] text-slate-600 dark:text-slate-455 leading-relaxed font-medium">
                                        {job.companyDescription}
                                    </p>
                                    <p className="text-[14.5px] text-slate-600 dark:text-slate-455 leading-relaxed font-medium">
                                        As a premier employer, we are driven by technological innovation and supportive operational principles that nurture personal career tracks and community programs.
                                    </p>
                                </div>
                            )}

                            {activeTab === "Requirements" && (
                                <div className="space-y-4">
                                    <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">Position Requirements</h3>
                                    <ul className="list-disc pl-5 space-y-3">
                                        {job.requirements.map((req, idx) => (
                                            <li key={idx} className="text-[14.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === "Benefits" && (
                                <div className="space-y-4">
                                    <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">Compensation & Benefits</h3>
                                    <p className="text-[14.5px] text-slate-600 dark:text-slate-455 leading-relaxed font-medium mb-3">
                                        We provide competitive financial packages alongside comprehensive quality-of-life benefits:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-3">
                                        {job.benefits.map((benefit, idx) => (
                                            <li key={idx} className="text-[14.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>

                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[18px] font-bold text-slate-900 dark:text-white">Similar Jobs</h2>
                                <Link to="/jobs" className="text-[13px] font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 transition-colors no-underline">
                                    View all
                                </Link>
                            </div>

                            <div className="space-y-3.5">
                                {similarJobs.map((simJob) => (
                                    <Link
                                        key={simJob.id}
                                        to={`/jobs/${simJob.id}`}
                                        className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-4 flex items-center justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-200 group cursor-pointer no-underline"
                                    >
                                        <div className="flex items-center gap-4">
                                            
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                                                <img src={simJob.logo} alt={simJob.company} className="w-8 h-8 object-contain" />
                                            </div>
                                            <div>
                                                <h3 className="text-[15.5px] font-bold text-slate-900 dark:text-white group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                                    {simJob.title}
                                                </h3>
                                                <div className="flex items-center flex-wrap gap-x-2 mt-1 text-[12.5px] text-slate-500 dark:text-slate-400 font-semibold">
                                                    <span>{simJob.company}</span>
                                                    <span>•</span>
                                                    <span>{simJob.location}</span>
                                                    <span>•</span>
                                                    <span>{simJob.mode}</span>
                                                    <span>•</span>
                                                    <span className="text-slate-700 dark:text-slate-350">{simJob.salary}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                                            <ChevronRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    
                    <div className="lg:col-span-4 space-y-6">
                        
                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">Job Summary</h2>
                            
                            <div className="space-y-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                                <div className="space-y-0.5">
                                    <p className="text-[12px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Job Type</p>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{job.type}</p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[12px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Experience</p>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{job.experience}</p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[12px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Location</p>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{job.location} ({job.mode})</p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[12px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Salary</p>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{job.salary}</p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[12px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Posted</p>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{job.posted}</p>
                                </div>
                            </div>

                            <button className="flex items-center justify-center gap-2 w-full text-[13.5px] font-semibold text-slate-500 dark:text-slate-450 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-0 focus:outline-none">
                                <AlertCircle size={15} /> Report this job
                            </button>
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">About {job.company}</h2>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
                                    <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-[15.5px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        {job.company}
                                        <svg className="w-[14.5px] h-[14.5px] shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                            <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                            <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                                        </svg>
                                    </h3>
                                </div>
                            </div>

                            <p className="text-[13px] text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
                                {job.companyDescription}
                            </p>

                            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[13.5px] text-slate-600 dark:text-slate-400 font-semibold">
                                <div className="flex items-center gap-2.5">
                                    <MapPin size={16} className="text-slate-400 shrink-0" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Users size={16} className="text-slate-400 shrink-0" />
                                    <span>{job.employees}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Globe size={16} className="text-slate-400 shrink-0" />
                                    <a href={`https://${job.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        {job.website}
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">Share this job</h2>
                            <div className="flex items-center gap-2">
                                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer bg-white dark:bg-slate-900">
                                    <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer bg-white dark:bg-slate-900">
                                    <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-800 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer bg-white dark:bg-slate-900">
                                    <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all cursor-pointer bg-white dark:bg-slate-900">
                                    <Mail size={17} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    
                    <div 
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                        onClick={() => setShowSuccessModal(false)}
                    />
                    
                    
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 text-center">
                        <button 
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-655 dark:hover:text-slate-350 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-none bg-transparent animate-none"
                        >
                            <X size={18} />
                        </button>

                        <div className="w-16 h-16 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-green-50/50 dark:ring-green-950/10">
                            <FileCheck size={30} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Application Submitted!</h3>
                        <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-2">
                            Your application for <span className="font-semibold text-slate-700 dark:text-slate-300">{job.title}</span> at <span className="font-semibold text-slate-750 dark:text-slate-350">{job.company}</span> was delivered.
                        </p>

                        
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 text-left">
                            <h4 className="text-[12.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Application Progress</h4>
                            <div className="relative pl-3 space-y-6">
                                
                                <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-slate-200 dark:bg-slate-800" />

                                
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-green-500 border border-green-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200 leading-none">Application Submitted</h5>
                                        <p className="text-[12px] text-slate-450 dark:text-slate-500 mt-1.5">Delivered to company recruitment portal.</p>
                                    </div>
                                </div>

                                
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-green-500 border border-green-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200 leading-none">Resume Parsed & Screened</h5>
                                        <p className="text-[12px] text-slate-450 dark:text-slate-500 mt-1.5">AI verified qualifications matching job standards.</p>
                                    </div>
                                </div>

                                
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 border border-blue-500 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
                                        <Clock size={12} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-[14.5px] font-bold text-blue-600 dark:text-blue-400 leading-none">Under Review</h5>
                                        <p className="text-[12px] text-slate-500 dark:text-slate-455 mt-1.5">Hiring manager reviewing profile details.</p>
                                    </div>
                                </div>

                                
                                <div className="flex gap-4 items-start relative z-10 opacity-55">
                                    <div className="w-6 h-6 rounded-full bg-slate-250 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-550 dark:text-slate-400 shrink-0">
                                        <Briefcase size={12} />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-[14.5px] font-bold text-slate-750 dark:text-slate-400 leading-none">Interview Scheduled</h5>
                                        <p className="text-[12px] text-slate-400 dark:text-slate-550 mt-1.5">Direct scheduling invite sent to your inbox.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <Link 
                                to="/applications" 
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] rounded-xl transition shadow-md hover:shadow-lg no-underline cursor-pointer flex items-center justify-center"
                            >
                                View Applications
                            </Link>
                            <button 
                                onClick={() => setShowSuccessModal(false)}
                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-250 font-bold text-[14px] rounded-xl transition cursor-pointer border-none"
                            >
                                Keep Browsing
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetail;
