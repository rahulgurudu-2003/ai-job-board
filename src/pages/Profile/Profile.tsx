import { useState, useRef, useEffect } from "react";
import { 
    User, 
    Mail, 
    Upload, 
    Cpu, 
    Award, 
    AlertCircle, 
    Loader2, 
    Sparkles, 
    FileText, 
    Check, 
    Camera, 
    Eye,
    Layers,
    SquarePen,
    FileCheck,
    X
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import { getAvatarUrl } from "../../utils/avatar";
import { toast } from "sonner";

const getResumeUrl = (resumePath: string | null | undefined): string | null => {
    if (!resumePath || typeof resumePath !== "string") return null;
    if (resumePath.startsWith("http://") || resumePath.startsWith("https://")) {
        return resumePath;
    }
    const cleanPath = resumePath.startsWith("/") ? resumePath : `/${resumePath}`;
    return `https://ai-job-board-backend-zmpj.onrender.com${cleanPath}`;
};


const getResumeFileName = (resumePath: string | null | undefined): string => {
    if (!resumePath) return "";
    const parts = resumePath.split("/");
    const fullName = parts[parts.length - 1];
    return fullName.replace(/_[a-zA-Z0-9]{7}\./, ".");
};

interface ATSReport {
    score: number;
    matchRole: string;
    seniority: string;
    keywordsFound: string[];
    keywordsMissing: string[];
    suggestions: string[];
}

const mockATSReport: ATSReport = {
    score: 79,
    matchRole: "Full Stack Software Engineer",
    seniority: "Mid to Senior Level",
    keywordsFound: [
        "React", "TypeScript", "JavaScript", "Python", "Django", "REST APIs", 
        "Git", "SQL"
    ],
    keywordsMissing: [
        "Docker", "CI/CD", "AWS", "Unit Testing"
    ],
    suggestions: [
        "Use active verbs rather than passive descriptions (e.g. 'Refactored REST APIs' instead of 'Was responsible for').",
        "Integrate missing modern Cloud & DevOps keywords like Docker or AWS to pass automated filters.",
        "Ensure layout uses clean standard text sections instead of custom graphical widgets."
    ]
};

const Profile = () => {
    const { user, updateProfile, loading } = useAuth();
    
    
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [githubLink, setGithubLink] = useState(user?.githubLink || "");
    
    
    const [isEditing, setIsEditing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    
    const [atsReport, setAtsReport] = useState<ATSReport | null>(user?.resume ? mockATSReport : null);
    const [scanningState, setScanningState] = useState<"idle" | "parsing" | "analyzing" | "scoring" | "done">("idle");
    const [scanProgress, setScanProgress] = useState(0);
    const [scanMessage, setScanMessage] = useState("");

    
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const resumeInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
            setGithubLink(user.githubLink || "");
            if (user.resume && !atsReport) {
                setAtsReport(mockATSReport);
            }
        }
    }, [user]);

    
    const handleCancelEdit = () => {
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
            setGithubLink(user.githubLink || "");
        }
        setIsEditing(false);
        setErrorMsg("");
    };

    
    const handleSaveDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!fullName.trim()) {
            setErrorMsg("Full name is required.");
            toast.error("Full name is required.");
            return;
        }
        if (!email.trim()) {
            setErrorMsg("Email address is required.");
            toast.error("Email address is required.");
            return;
        }

        const hasChanged = 
            fullName.trim() !== (user?.fullName || "") ||
            email.trim() !== (user?.email || "") ||
            githubLink.trim() !== (user?.githubLink || "");

        if (!hasChanged) {
            toast.info("No changes detected.");
            setIsEditing(false);
            return;
        }

        const res = await updateProfile(fullName.trim(), email.trim(), undefined, undefined, githubLink.trim());
        if (res.success) {
            toast.success("Profile details updated successfully!");
            setIsEditing(false); 
        } else {
            const errMsg = res.message || "Failed to update profile.";
            setErrorMsg(errMsg);
            toast.error(errMsg);
        }
    };

    
    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setErrorMsg("");
            const res = await updateProfile(undefined, undefined, file, undefined);
            if (res.success) {
                toast.success("Profile photo updated successfully!");
            } else {
                const errMsg = res.message || "Failed to upload avatar image.";
                setErrorMsg(errMsg);
                toast.error(errMsg);
            }
        }
    };

    
    const handleResumeClick = () => {
        resumeInputRef.current?.click();
    };

    const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setErrorMsg("");
            const res = await updateProfile(undefined, undefined, undefined, file);
            if (res.success) {
                toast.success("Resume uploaded successfully! Initializing scanner...");
                runATSScanner();
            } else {
                const errMsg = res.message || "Failed to upload resume file.";
                setErrorMsg(errMsg);
                toast.error(errMsg);
            }
        }
    };

    
    const runATSScanner = () => {
        setScanningState("parsing");
        setScanProgress(15);
        setScanMessage("Extracting text and layout structure...");
        
        setTimeout(() => {
            setScanningState("analyzing");
            setScanProgress(45);
            setScanMessage("Scanning industry keywords and role patterns...");
            
            setTimeout(() => {
                setScanningState("scoring");
                setScanProgress(80);
                setScanMessage("Assessing readability and section formatting...");
                
                setTimeout(() => {
                    setScanningState("done");
                    setScanProgress(100);
                    setScanMessage("Dashboard built successfully!");
                    const finalScore = Math.floor(Math.random() * 10) + 75; 
                    setAtsReport({
                        ...mockATSReport,
                        score: finalScore
                    });
                    
                    toast.success(`ATS Scoring analysis completed! Current Score: ${finalScore}%`);
                    
                    setTimeout(() => {
                        setScanningState("idle");
                    }, 805);
                }, 1000);
            }, 1000);
        }, 1000);
    };

    const avatarUrl = user ? getAvatarUrl(user.avatar) : null;
    const resumeUrl = user ? getResumeUrl(user.resume) : null;
    const hasResume = !!user?.resume;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-955 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            <Navbar />

            
            <div className="h-44 md:h-52 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>

            <main className="max-w-[1200px] mx-auto px-4 md:px-8 -mt-20 pb-20 relative z-10">
                
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    
                    <div className="lg:col-span-4 flex flex-col items-center">
                        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
                            
                            
                            <div className="relative group cursor-pointer" onClick={handleAvatarClick} title="Change Profile Picture">
                                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-4xl shadow-md overflow-hidden relative select-none">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                                    ) : (
                                        fullName.split(" ").map((n) => n[0]).join("").toUpperCase()
                                    )}
                                    
                                    
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                
                                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-900 transition active:scale-95">
                                    <Camera size={14} />
                                </button>
                            </div>

                            <input 
                                type="file" 
                                ref={avatarInputRef} 
                                onChange={handleAvatarChange} 
                                accept="image/*" 
                                className="hidden" 
                            />

                            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight mt-5">
                                {fullName || "User Name"}
                            </h2>
                            <p className="text-[13px] text-slate-450 dark:text-slate-500 font-semibold mt-0.5 flex items-center gap-1.5 justify-center">
                                <Mail size={13} />
                                {email || "user@email.com"}
                            </p>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-8">
                        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight">
                                Profile Details
                            </h2>
                            <p className="text-[13px] text-slate-455 dark:text-slate-500 font-semibold mt-1">
                                Update your personal details and contact settings.
                            </p>

                            {errorMsg && (
                                <div className="mt-4 bg-red-50 dark:bg-red-950/15 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center gap-2.5 text-[13.5px] font-bold">
                                    <AlertCircle size={16} />
                                    {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleSaveDetails} className="mt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13.5px] font-bold text-slate-700 dark:text-slate-300">
                                            Full Name
                                        </label>
                                        <div className={`flex items-center px-4 py-2.5 border rounded-xl gap-2.5 transition ${isEditing ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500" : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-850 opacity-90"}`}>
                                            <User size={16} className="text-slate-400 dark:text-slate-550" />
                                            <input 
                                                type="text" 
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full bg-transparent border-none outline-none text-[14px] text-slate-800 dark:text-slate-100 font-semibold disabled:text-slate-450 dark:disabled:text-slate-500"
                                                placeholder="e.g. Rahul Kumar"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13.5px] font-bold text-slate-700 dark:text-slate-300">
                                            Email Address
                                        </label>
                                        <div className={`flex items-center px-4 py-2.5 border rounded-xl gap-2.5 transition ${isEditing ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500" : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-850 opacity-90"}`}>
                                            <Mail size={16} className="text-slate-400 dark:text-slate-555" />
                                            <input 
                                                type="email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full bg-transparent border-none outline-none text-[14px] text-slate-800 dark:text-slate-100 font-semibold disabled:text-slate-450 dark:disabled:text-slate-500"
                                                placeholder="e.g. rahul@example.com"
                                            />
                                        </div>
                                    </div>

                                    
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[13.5px] font-bold text-slate-700 dark:text-slate-300">
                                            GitHub Profile Link
                                        </label>
                                        <div className={`flex items-center px-4 py-2.5 border rounded-xl gap-2.5 transition ${isEditing ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500" : "bg-slate-50/50 dark:bg-slate-955/40 border-slate-200/60 dark:border-slate-850 opacity-90"}`}>
                                            <svg className="w-4 h-4 text-slate-400 dark:text-slate-550 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                            <input 
                                                type="url" 
                                                value={githubLink}
                                                onChange={(e) => setGithubLink(e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full bg-transparent border-none outline-none text-[14px] text-slate-800 dark:text-slate-100 font-semibold disabled:text-slate-450 dark:disabled:text-slate-500"
                                                placeholder="e.g. https://github.com/rahulgurudu"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 mt-6">
                                    {isEditing ? (
                                        <>
                                            <button 
                                                type="button" 
                                                onClick={handleCancelEdit}
                                                className="px-5 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 rounded-xl text-[13.5px] font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer select-none active:scale-97 border-none"
                                            >
                                                <X size={15} />
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={loading}
                                                className="px-5 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13.5px] font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed select-none active:scale-97"
                                            >
                                                {loading ? (
                                                    <Loader2 size={15} className="animate-spin" />
                                                ) : (
                                                    <Check size={15} />
                                                )}
                                                Save changes
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            type="button" 
                                            onClick={() => setIsEditing(true)}
                                            className="px-5 h-10 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 rounded-xl text-[13.5px] font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer select-none active:scale-97 border-none"
                                        >
                                            <SquarePen size={15} />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
                    
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-xl shrink-0">
                                <Upload size={18} />
                            </div>
                            <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
                                Upload Resume
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleResumeClick}
                                className="flex-1 flex items-center gap-2 px-3.5 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 text-[13px] font-bold rounded-xl transition hover:bg-slate-100/50 hover:border-slate-300 text-left overflow-hidden cursor-pointer"
                            >
                                <FileText size={15} className="shrink-0 text-slate-400" />
                                <span className="truncate">{hasResume ? getResumeFileName(user?.resume) : "Choose PDF"}</span>
                            </button>
                            <button 
                                onClick={handleResumeClick}
                                className="flex items-center gap-1.5 px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl transition cursor-pointer shrink-0"
                            >
                                <Upload size={14} />
                                Upload
                            </button>
                        </div>
                    </div>

                    
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-xl shrink-0">
                                <FileText size={18} />
                            </div>
                            <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
                                Your Resume
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            {hasResume ? (
                                <>
                                    <a 
                                        href={resumeUrl || "#"} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3.5 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-250 text-[13px] font-bold rounded-xl transition no-underline cursor-pointer border border-transparent"
                                    >
                                        <Eye size={14} className="text-slate-500" />
                                        View
                                    </a>
                                    <button 
                                        onClick={runATSScanner}
                                        className="flex-1 flex items-center justify-center gap-1.5 px-3.5 h-10 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl transition cursor-pointer"
                                    >
                                        <Cpu size={14} />
                                        ATS Score
                                    </button>
                                </>
                            ) : (
                                <p className="text-[12px] text-slate-400 dark:text-slate-500 font-semibold italic py-2">
                                    No resume uploaded yet.
                                </p>
                            )}
                        </div>
                    </div>

                    
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-blue-700 dark:to-indigo-900 text-white rounded-3xl p-5 md:p-6 shadow-md flex items-center gap-4 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                        <div className="w-12 h-12 bg-white/10 dark:bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center shrink-0">
                            <Layers size={22} className="text-white" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200/90 leading-tight">
                                Current Score
                            </span>
                            <span className="text-[26px] font-black tracking-tight leading-none mt-1">
                                {hasResume && atsReport ? `${atsReport.score}/100` : "0/100"}
                            </span>
                        </div>
                    </div>
                </div>

                
                <input 
                    type="file" 
                    ref={resumeInputRef} 
                    onChange={handleResumeChange} 
                    accept=".pdf,.doc,.docx" 
                    className="hidden" 
                />

                
                <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                    
                    
                    {scanningState !== "idle" && (
                        <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/98 z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm">
                                <Cpu size={32} className="animate-pulse" />
                            </div>
                            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white">
                                AI Resume Parser & Scorer
                            </h3>
                            <p className="text-[13px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                                {scanMessage}
                            </p>
                            
                            
                            <div className="w-64 max-w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
                                <div 
                                    className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-350" 
                                    style={{ width: `${scanProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                <Cpu size={20} className="text-blue-600" />
                                ATS Resume Optimizer
                            </h2>
                            <p className="text-[13px] text-slate-455 dark:text-slate-500 font-semibold mt-1">
                                Check how well your resume matches tech parser criteria and keyword requirements.
                            </p>
                        </div>
                    </div>

                    {atsReport ? (
                        <div className="mt-8 space-y-8">
                            
                            
                            <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-2xl p-5 flex flex-col justify-between">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                            Target Role Alignment
                                        </p>
                                        <p className="text-[15px] font-bold text-slate-900 dark:text-white mt-0.5">
                                            {atsReport.matchRole}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                            Estimated Seniority Level
                                        </p>
                                        <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                                            {atsReport.seniority}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[12px] font-medium text-slate-500 dark:text-slate-450 mt-4">
                                    <FileCheck size={14} className="text-blue-600" />
                                    Parsed from your latest resume document
                                </div>
                            </div>

                            
                            <div className="space-y-4">
                                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <Award size={16} className="text-blue-600" />
                                    Keyword Alignment Scan
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    
                                    <div className="bg-[#FAFDFB] dark:bg-green-955/5 border border-green-100/70 dark:border-green-900/10 rounded-2xl p-4">
                                        <p className="text-[11.5px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">
                                            Identified Keywords ({atsReport.keywordsFound.length})
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {atsReport.keywordsFound.map((kw) => (
                                                <span key={kw} className="px-2.5 py-1 bg-green-50 dark:bg-green-950/20 text-green-755 dark:text-green-400 border border-green-100/50 dark:border-green-900/10 text-[11.5px] font-bold rounded-lg flex items-center gap-1">
                                                    <Check size={10} className="shrink-0" />
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="bg-[#FFFDFB] dark:bg-amber-955/5 border border-amber-100/70 dark:border-amber-900/10 rounded-2xl p-4">
                                        <p className="text-[11.5px] font-bold text-amber-700 dark:text-amber-450 uppercase tracking-wider mb-3">
                                            Recommended Missing Keywords ({atsReport.keywordsMissing.length})
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {atsReport.keywordsMissing.map((kw) => (
                                                <span key={kw} className="px-2.5 py-1 bg-amber-50 dark:bg-amber-955/25 text-amber-800 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/10 text-[11.5px] font-bold rounded-lg">
                                                    + {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            
                            <div className="bg-blue-50/20 dark:bg-blue-955/5 border border-blue-100/60 dark:border-blue-900/20 rounded-2xl p-5 md:p-6">
                                <h3 className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mb-3">
                                    <Sparkles size={15} className="text-blue-600" />
                                    AI Optimizer Checklist
                                </h3>
                                <ul className="space-y-2.5 text-[13px] text-slate-650 dark:text-slate-350 leading-relaxed list-none pl-0">
                                    {atsReport.suggestions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    ) : (
                        <div className="mt-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center flex flex-col items-center justify-center">
                            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-550 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-750 dark:text-slate-255">
                                No Resume Found
                            </h3>
                            <p className="text-[12.5px] text-slate-400 dark:text-slate-500 mt-1 max-w-[280px] leading-relaxed">
                                Please upload your resume above to parse content, map keywords, and score it against industry standard parsers.
                            </p>
                            <button 
                                onClick={handleResumeClick}
                                className="mt-5 px-5 h-10 bg-blue-600 hover:bg-blue-700 text-white text-[12.5px] font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                            >
                                <Upload size={14} />
                                Upload Resume File
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
