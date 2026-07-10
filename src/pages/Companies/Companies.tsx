import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ChevronRight } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import GoogleLogo from "../../assets/logos/google.svg";
import MicrosoftLogo from "../../assets/logos/microsoft.svg";
import SlackLogo from "../../assets/logos/slack.svg";
import AmazonLogo from "../../assets/logos/amazon.svg";
import NetflixLogo from "../../assets/logos/netflix.svg";
import HubSpotLogo from "../../assets/logos/hubspot.svg";
import SpotifyLogo from "../../assets/logos/spotify.svg";
import AirbnbLogo from "../../assets/logos/airbnb.svg";
import MetaLogo from "../../assets/logos/meta.svg";
import AppleLogo from "../../assets/logos/apple.svg";
import AdobeLogo from "../../assets/logos/adobe.svg";
import OracleLogo from "../../assets/logos/oracle.svg";
import SalesforceLogo from "../../assets/logos/salesforce.svg";

interface Company {
    id: number;
    name: string;
    logo: string;
    location: string;
    employees: string;
}

const mockCompanies: Company[] = [
    { id: 1, name: "Google", logo: GoogleLogo, location: "Mountain View, CA", employees: "1000+ employees" },
    { id: 2, name: "Microsoft", logo: MicrosoftLogo, location: "Redmond, WA", employees: "1000+ employees" },
    { id: 3, name: "Amazon", logo: AmazonLogo, location: "Seattle, WA", employees: "1000+ employees" },
    { id: 4, name: "Netflix", logo: NetflixLogo, location: "Los Angeles, CA", employees: "500+ employees" },
    { id: 5, name: "HubSpot", logo: HubSpotLogo, location: "Cambridge, MA", employees: "500+ employees" },
    { id: 6, name: "Slack", logo: SlackLogo, location: "San Francisco, CA", employees: "500+ employees" },
    { id: 7, name: "Spotify", logo: SpotifyLogo, location: "Stockholm, Sweden", employees: "500+ employees" },
    { id: 8, name: "Airbnb", logo: AirbnbLogo, location: "San Francisco, CA", employees: "500+ employees" },
    { id: 9, name: "Meta", logo: MetaLogo, location: "Menlo Park, CA", employees: "1000+ employees" },
    { id: 10, name: "Apple", logo: AppleLogo, location: "Cupertino, CA", employees: "1000+ employees" },
    { id: 11, name: "Adobe", logo: AdobeLogo, location: "San Jose, CA", employees: "500+ employees" },
    { id: 12, name: "Oracle", logo: OracleLogo, location: "Austin, TX", employees: "1000+ employees" },
    { id: 13, name: "Salesforce", logo: SalesforceLogo, location: "San Francisco, CA", employees: "1000+ employees" },
];

const ITEMS_PER_PAGE = 7;

const Companies = () => {
    const [searchVal, setSearchVal] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleResetSearch = () => {
        setSearchVal("");
        setLocationVal("");
        setCurrentPage(1);
    };

    const filteredCompanies = mockCompanies.filter((company) => {
        const matchesSearch = !searchVal.trim() ||
            company.name.toLowerCase().includes(searchVal.toLowerCase());
        const matchesLocation = !locationVal.trim() ||
            company.location.toLowerCase().includes(locationVal.toLowerCase());
        return matchesSearch && matchesLocation;
    });

    
    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">

            
            <Navbar />

            
            <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col items-center">

                
                <div className="w-full max-w-[800px] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-[28px] p-6 md:p-8 shadow-xl shadow-slate-100 dark:shadow-none transition-colors mx-4">

                    
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="flex items-center flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl gap-2.5">
                            <Search size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <input
                                type="text"
                                value={searchVal}
                                onChange={(e) => {
                                    setSearchVal(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search companies..."
                                className="w-full bg-transparent border-none outline-none text-[14px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-semibold"
                            />
                        </div>
                        <div className="flex items-center w-full sm:w-[190px] px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl gap-2.5">
                            <MapPin size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <input
                                type="text"
                                value={locationVal}
                                onChange={(e) => {
                                    setLocationVal(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Location..."
                                className="w-full bg-transparent border-none outline-none text-[14px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-semibold"
                            />
                        </div>
                    </div>

                    
                    <div className="mb-6">
                        <h2 className="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight">
                            All Companies
                        </h2>
                        <p className="text-[13px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                            {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'} found
                        </p>
                    </div>

                    
                    <div className="space-y-3.5">
                        {paginatedCompanies.length > 0 ? (
                            paginatedCompanies.map((company) => (
                                <Link
                                    key={company.id}
                                    to={`/companies/${company.name.toLowerCase()}`}
                                    className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-4 flex items-center justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-200 group cursor-pointer no-underline"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                                            <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                                                {company.name}
                                                <svg className="w-[14.5px] h-[14.5px] shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                                    <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                                    <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                                                </svg>
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1 text-[13px] text-slate-400 dark:text-slate-500 font-medium">
                                                <MapPin size={13} className="shrink-0" />
                                                <span>{company.location}</span>
                                                <span className="mx-1">•</span>
                                                <span>{company.employees}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-1 rounded-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                                        <ChevronRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-950/30 border border-slate-205 dark:border-slate-800/80 rounded-2xl flex flex-col items-center justify-center min-h-[250px]">
                                <div className="w-12 h-12 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-650 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 dark:border-slate-800">
                                    <Search size={20} className="stroke-[1.5]" />
                                </div>
                                <h3 className="text-[15.5px] font-bold text-slate-900 dark:text-white">No companies match your filters</h3>
                                <p className="text-[12.5px] text-slate-450 dark:text-slate-500 mt-1 max-w-xs mx-auto mb-5 leading-normal">
                                    We couldn't find any companies matching your search text or location criteria. Try typing something else.
                                </p>
                                <button 
                                    onClick={handleResetSearch}
                                    className="px-5 h-9 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12.5px] rounded-xl transition shadow-md active:scale-97 cursor-pointer border-none"
                                >
                                    Reset search
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-1.5 pt-8 mt-4 border-t border-slate-100 dark:border-slate-800/60 select-none">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-[13px] flex items-center justify-center transition cursor-pointer
                                    ${currentPage === 1 
                                        ? "opacity-40 cursor-not-allowed text-slate-350 dark:text-slate-600" 
                                        : "text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700"
                                    }`}
                            >
                                &lt;
                            </button>
                            
                            {pageNumbers.map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-xl font-bold text-[13px] flex items-center justify-center transition cursor-pointer shadow-sm
                                        ${currentPage === page
                                            ? "bg-blue-600 text-white border border-blue-600"
                                            : "bg-transparent text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-750"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-[13px] flex items-center justify-center transition cursor-pointer
                                    ${currentPage === totalPages 
                                        ? "opacity-40 cursor-not-allowed text-slate-350 dark:text-slate-600" 
                                        : "text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700"
                                    }`}
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Companies;
