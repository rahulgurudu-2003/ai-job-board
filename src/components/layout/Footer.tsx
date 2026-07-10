import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/80 transition-colors duration-200 mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
                    
                    
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                                <BriefcaseBusiness size={18} className="text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-[1.5rem] font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                                JobBoard
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed max-w-sm">
                            Connecting developers, designers, and scaling companies with high-quality opportunities. Build your career with verified, transparent postings.
                        </p>
                        
                        
                        <div className="flex items-center gap-3 pt-2">
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-blue-500 transition-all cursor-pointer"
                                aria-label="Twitter X"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                                aria-label="GitHub"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-blue-700 transition-all cursor-pointer"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    
                    <div>
                        <h4 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            For Candidates
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/jobs" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 font-medium transition-colors no-underline">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/companies" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline">
                                    Browse Companies
                                </Link>
                            </li>
                            <li>
                                <Link to="/saved-jobs" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline">
                                    Saved Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/applications" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline">
                                    My Applications
                                </Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h4 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            For Employers
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/pricing" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline">
                                    Pricing Plans
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline cursor-pointer">
                                    Post a Job
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline cursor-pointer">
                                    Talent Search
                                </a>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h4 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline cursor-pointer">
                                    Contact Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline cursor-pointer">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-455 font-medium transition-colors no-underline cursor-pointer">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-medium text-slate-450 dark:text-slate-500">
                    <p>© {currentYear} JobBoard Inc. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Designed with 💙 for modern tech hiring.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
