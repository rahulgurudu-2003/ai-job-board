import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Users, Globe, ChevronLeft, Star, Briefcase } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

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


import GoogleHQ from "../../assets/companies/google_hq.png";
import MicrosoftHQ from "../../assets/companies/microsoft_hq.png";
import GenericHQ from "../../assets/companies/generic_hq.png";

const companiesData: Record<string, {
    name: string; logo: string; coverImage?: string; industry: string; location: string;
    employees: string; website: string; founded: string; openJobs: number;
    about: string; rating: number; reviews: string;
    benefits: { icon: string; label: string }[];
    skills: string[];
    highlights: { industry: string; size: string; hq: string; founded: string; website: string };
}> = {
    google: {
        name: "Google", logo: GoogleLogo, coverImage: GoogleHQ, industry: "Technology, Information and Internet",
        location: "Mountain View, CA", employees: "10001+", website: "google.com",
        founded: "1998", openJobs: 234, rating: 4.5, reviews: "1.2k",
        about: "Google was founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University. Today, Google is one of the world's most valuable companies and a leader in technology, search, and innovation.\n\nFrom Search and YouTube to Android and Google Cloud, we build products that help billions of people learn, play, and work.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🏠", label: "Remote Work" }, { icon: "💰", label: "401(k) Plan" },
            { icon: "🌴", label: "Paid Time Off" }, { icon: "👶", label: "Parental Leave" },
            { icon: "📚", label: "Learning & Development" }, { icon: "🧘", label: "Wellness Programs" },
        ],
        skills: ["Go", "Python", "Java", "C++", "Kubernetes", "TensorFlow", "SQL", "JavaScript", "Machine Learning"],
        highlights: { industry: "Technology, Information and Internet", size: "10001+ employees", hq: "Mountain View, CA", founded: "1998", website: "google.com" },
    },
    microsoft: {
        name: "Microsoft", logo: MicrosoftLogo, coverImage: MicrosoftHQ, industry: "Software & Cloud Computing",
        location: "Redmond, WA", employees: "10001+", website: "microsoft.com",
        founded: "1975", openJobs: 312, rating: 4.4, reviews: "2.1k",
        about: "Microsoft Corporation is an American multinational technology company producing computer software, consumer electronics, personal computers, and related services.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🏠", label: "Remote Work" }, { icon: "💰", label: "401(k) Plan" },
            { icon: "🌴", label: "Paid Time Off" }, { icon: "📚", label: "Learning & Development" },
        ],
        skills: ["C#", ".NET", "Azure", "TypeScript", "Python", "SQL", "React"],
        highlights: { industry: "Software & Cloud Computing", size: "10001+ employees", hq: "Redmond, WA", founded: "1975", website: "microsoft.com" },
    },
    amazon: {
        name: "Amazon", logo: AmazonLogo, industry: "E-Commerce & Cloud",
        location: "Seattle, WA", employees: "10001+", website: "amazon.com",
        founded: "1994", openJobs: 412, rating: 4.0, reviews: "3.4k",
        about: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "💰", label: "401(k) Plan" },
            { icon: "🌴", label: "Paid Time Off" }, { icon: "📚", label: "Learning & Development" },
        ],
        skills: ["AWS", "Python", "Java", "Scala", "SQL", "Machine Learning", "React"],
        highlights: { industry: "E-Commerce & Cloud", size: "10001+ employees", hq: "Seattle, WA", founded: "1994", website: "amazon.com" },
    },
    netflix: {
        name: "Netflix", logo: NetflixLogo, industry: "Entertainment & Streaming",
        location: "Los Angeles, CA", employees: "5001-10000", website: "netflix.com",
        founded: "1997", openJobs: 98, rating: 4.2, reviews: "890",
        about: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "🌴", label: "Unlimited PTO" },
            { icon: "🏠", label: "Remote Work" }, { icon: "📚", label: "Learning & Development" },
        ],
        skills: ["Python", "Java", "React", "AWS", "Kafka", "Cassandra", "SQL"],
        highlights: { industry: "Entertainment & Streaming", size: "5001-10000 employees", hq: "Los Angeles, CA", founded: "1997", website: "netflix.com" },
    },
    hubspot: {
        name: "HubSpot", logo: HubSpotLogo, industry: "CRM & Marketing Software",
        location: "Cambridge, MA", employees: "1001-5000", website: "hubspot.com",
        founded: "2006", openJobs: 67, rating: 4.6, reviews: "540",
        about: "HubSpot is a leading CRM platform that provides software and support to help businesses grow better.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🏠", label: "Remote Work" }, { icon: "🌴", label: "Paid Time Off" },
        ],
        skills: ["JavaScript", "React", "Python", "Ruby", "SQL", "HubSpot CRM"],
        highlights: { industry: "CRM & Marketing Software", size: "1001-5000 employees", hq: "Cambridge, MA", founded: "2006", website: "hubspot.com" },
    },
    slack: {
        name: "Slack", logo: SlackLogo, industry: "Business Messaging & Collaboration",
        location: "San Francisco, CA", employees: "1001-5000", website: "slack.com",
        founded: "2013", openJobs: 45, rating: 4.3, reviews: "390",
        about: "Slack is a messaging program designed specifically for the workplace. With Slack, teams can communicate more effectively and collaborate on projects.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🏠", label: "Remote Work" }, { icon: "💰", label: "Equity" },
        ],
        skills: ["Go", "JavaScript", "React", "TypeScript", "Kubernetes", "AWS"],
        highlights: { industry: "Business Messaging", size: "1001-5000 employees", hq: "San Francisco, CA", founded: "2013", website: "slack.com" },
    },
    spotify: {
        name: "Spotify", logo: SpotifyLogo, industry: "Music & Audio Streaming",
        location: "Stockholm, Sweden", employees: "5001-10000", website: "spotify.com",
        founded: "2006", openJobs: 120, rating: 4.4, reviews: "720",
        about: "Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🌴", label: "Paid Time Off" }, { icon: "📚", label: "Learning Budget" },
        ],
        skills: ["Python", "Scala", "Java", "Kubernetes", "Kafka", "React", "Machine Learning"],
        highlights: { industry: "Music & Audio Streaming", size: "5001-10000 employees", hq: "Stockholm, Sweden", founded: "2006", website: "spotify.com" },
    },
    airbnb: {
        name: "Airbnb", logo: AirbnbLogo, industry: "Travel & Hospitality",
        location: "San Francisco, CA", employees: "1001-5000", website: "airbnb.com",
        founded: "2008", openJobs: 55, rating: 4.1, reviews: "440",
        about: "Airbnb is an online marketplace that connects people who want to rent out their homes with people looking for accommodations in that locale.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "✈️", label: "Travel Credits" },
            { icon: "🏠", label: "Remote Work" }, { icon: "🌴", label: "Paid Time Off" },
        ],
        skills: ["Ruby", "JavaScript", "React", "Python", "Java", "MySQL", "AWS"],
        highlights: { industry: "Travel & Hospitality", size: "1001-5000 employees", hq: "San Francisco, CA", founded: "2008", website: "airbnb.com" },
    },
    meta: {
        name: "Meta", logo: MetaLogo, industry: "Social Media & Technology",
        location: "Menlo Park, CA", employees: "10001+", website: "meta.com",
        founded: "2004", openJobs: 289, rating: 4.1, reviews: "2.8k",
        about: "Meta builds technologies that help people connect, find communities, and grow businesses. Our platforms include Facebook, Instagram, WhatsApp, and more.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "🏠", label: "Remote Work" },
            { icon: "💰", label: "401(k) Plan" }, { icon: "📚", label: "Learning & Development" },
        ],
        skills: ["C++", "Python", "React", "PHP", "Hack", "PyTorch", "Machine Learning"],
        highlights: { industry: "Social Media & Technology", size: "10001+ employees", hq: "Menlo Park, CA", founded: "2004", website: "meta.com" },
    },
    apple: {
        name: "Apple", logo: AppleLogo, industry: "Consumer Electronics & Software",
        location: "Cupertino, CA", employees: "10001+", website: "apple.com",
        founded: "1976", openJobs: 376, rating: 4.3, reviews: "3.2k",
        about: "Apple is known for revolutionizing personal technology with the Mac, iPod, iPhone, and iPad. We design hardware, software, and services that deliver the best user experience.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "💰", label: "401(k) Plan" },
            { icon: "🌴", label: "Paid Time Off" }, { icon: "🎓", label: "Tuition Assistance" },
        ],
        skills: ["Swift", "Objective-C", "C++", "Python", "Machine Learning", "CoreML", "Metal"],
        highlights: { industry: "Consumer Electronics & Software", size: "10001+ employees", hq: "Cupertino, CA", founded: "1976", website: "apple.com" },
    },
    adobe: {
        name: "Adobe", logo: AdobeLogo, industry: "Creative & Document Software",
        location: "San Jose, CA", employees: "5001-10000", website: "adobe.com",
        founded: "1982", openJobs: 143, rating: 4.4, reviews: "980",
        about: "Adobe is a global leader in digital media and digital marketing solutions. Our creative, marketing and document solutions empower everyone — from emerging artists to global brands.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🏠", label: "Remote Work" }, { icon: "📚", label: "Learning & Development" },
        ],
        skills: ["JavaScript", "React", "Python", "Java", "C++", "Machine Learning", "Adobe APIs"],
        highlights: { industry: "Creative & Document Software", size: "5001-10000 employees", hq: "San Jose, CA", founded: "1982", website: "adobe.com" },
    },
    oracle: {
        name: "Oracle", logo: OracleLogo, industry: "Enterprise Software & Cloud",
        location: "Austin, TX", employees: "10001+", website: "oracle.com",
        founded: "1977", openJobs: 210, rating: 3.9, reviews: "2.4k",
        about: "Oracle offers a comprehensive and fully integrated stack of cloud applications and platform services. We help organizations move to the cloud and unlock new business value.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "💰", label: "401(k) Plan" },
            { icon: "🌴", label: "Paid Time Off" }, { icon: "📚", label: "Certifications" },
        ],
        skills: ["Java", "SQL", "PL/SQL", "Oracle Cloud", "Python", "C++", "Kubernetes"],
        highlights: { industry: "Enterprise Software & Cloud", size: "10001+ employees", hq: "Austin, TX", founded: "1977", website: "oracle.com" },
    },
    salesforce: {
        name: "Salesforce", logo: SalesforceLogo, industry: "CRM & Cloud Software",
        location: "San Francisco, CA", employees: "10001+", website: "salesforce.com",
        founded: "1999", openJobs: 178, rating: 4.3, reviews: "1.6k",
        about: "Salesforce is the global leader in Customer Relationship Management (CRM), bringing companies closer to their customers in the digital age.",
        benefits: [
            { icon: "🏥", label: "Health Insurance" }, { icon: "⏰", label: "Flexible Hours" },
            { icon: "🏠", label: "Remote Work" }, { icon: "🌱", label: "Volunteer Time Off" },
        ],
        skills: ["Apex", "JavaScript", "React", "Python", "Salesforce CRM", "SQL", "LWC"],
        highlights: { industry: "CRM & Cloud Software", size: "10001+ employees", hq: "San Francisco, CA", founded: "1999", website: "salesforce.com" },
    },
};

const TABS = ["Overview", "Jobs", "About", "Benefits", "Reviews", "Photos", "Insights"];

const CompanyDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [activeTab, setActiveTab] = useState("Overview");
    const company = companiesData[slug?.toLowerCase() ?? ""];

    if (!company) {
        return (
            <div className="min-h-screen bg-[#F8FAFC]">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <p className="text-2xl font-bold text-slate-700">Company not found</p>
                    <Link to="/companies" className="text-blue-600 hover:underline font-medium">← Back to Companies</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            <Navbar />

            <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">

                
                <div className="flex items-center justify-between mb-5">
                    <Link to="/companies" className="flex items-center gap-1.5 text-[14px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline">
                        <ChevronLeft size={16} /> Back to companies
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link 
                            to={`/jobs?search=${encodeURIComponent(company.name)}`}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] rounded-xl transition shadow-md no-underline"
                        >
                            <Briefcase size={15} /> View Jobs ({company.openJobs})
                        </Link>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 mb-4 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
                                    <img src={company.logo} alt={company.name} className="w-10 h-10 object-contain" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-[26px] font-bold text-slate-900 dark:text-white">{company.name}</h1>
                                        <svg className="w-[18px] h-[18px] inline-block shrink-0" viewBox="0 0 24 24" fill="none" aria-label="Verified Company">
                                            <path d="M22.25 12c0-1.43-.88-2.67-2.15-3.21.15-.43.25-.9.25-1.39 0-2.1-1.7-3.8-3.81-3.8-.49 0-.96.1-1.38.28C14.54 2.68 13.37 2 12 2s-2.54.68-3.16 1.88c-.42-.18-.89-.28-1.38-.28C5.35 3.6 3.65 5.3 3.65 7.4c0 .49.1.96.25 1.39C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.15 3.21-.15.43-.25.9-.25 1.39 0 2.1 1.7 3.8 3.81 3.8.49 0 .96-.1 1.38-.28.62 1.2 1.79 1.88 3.16 1.88s2.54-.68 3.16-1.88c.42.18.89.28 1.38.28 2.11 0 3.81-1.7 3.81-3.8 0-.49-.1-.96-.25-1.39 1.27-.54 2.15-1.78 2.15-3.21z" fill="#1D9BF0" />
                                            <path d="M9.0001 16.2L5.5001 12.7L6.9101 11.29L9.0001 13.38L17.0901 5.29L18.5001 6.7L9.0001 16.2Z" fill="white" />
                                        </svg>
                                    </div>
                                    <p className="text-[14px] text-slate-500 dark:text-slate-400">{company.industry}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-[13px] text-slate-500 dark:text-slate-400 mb-4">
                                <span className="flex items-center gap-1.5"><MapPin size={14} />{company.location}</span>
                                <span className="flex items-center gap-1.5"><Users size={14} />{company.employees} employees</span>
                                <span className="flex items-center gap-1.5"><Globe size={14} />{company.website}</span>
                            </div>
                            <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {company.about.split("\n")[0]}
                            </p>
                        </div>
                        
                        <div className="md:w-[340px] h-[160px] rounded-xl overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-800/80">
                            <img 
                                src={company.coverImage || GenericHQ} 
                                alt={`${company.name} HQ`} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    </div>

                    
                    <div className="flex gap-6 mt-5 border-t border-slate-100 dark:border-slate-800 pt-4 overflow-x-auto">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[14px] font-medium pb-1 whitespace-nowrap transition-colors relative ${
                                    activeTab === tab
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                }`}
                            >
                                {tab === "Jobs" ? `Jobs (${company.openJobs})` : tab === "Reviews" ? `Reviews (${company.reviews})` : tab}
                                {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />}
                            </button>
                        ))}
                    </div>
                </div>

                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    
                    <div className="lg:col-span-2 space-y-5">
                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[17px] font-bold text-slate-900 dark:text-white mb-3">About {company.name}</h2>
                            <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{company.about}</p>
                        </div>

                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { icon: <Briefcase size={20} className="text-blue-600" />, value: company.openJobs, label: "Open Jobs" },
                                { icon: <Users size={20} className="text-green-500" />, value: company.employees + "+", label: "Employees" },
                                { icon: <span className="text-purple-500 font-bold text-lg">📅</span>, value: company.founded, label: "Founded" },
                                { icon: <MapPin size={20} className="text-orange-400" />, value: company.location, label: "Headquarters" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm text-center">
                                    <div className="flex justify-center mb-2">{s.icon}</div>
                                    <p className="text-[16px] font-bold text-slate-900 dark:text-white">{s.value}</p>
                                    <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[17px] font-bold text-slate-900 dark:text-white mb-4">Company Benefits</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                {company.benefits.map((b, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                                        <span className="text-2xl">{b.icon}</span>
                                        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    
                    <div className="space-y-5">
                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-4">Company Highlights</h3>
                            <div className="space-y-3 text-[13px]">
                                {[
                                    { label: "Industry", value: company.highlights.industry },
                                    { label: "Company Size", value: company.highlights.size },
                                    { label: "Headquarters", value: company.highlights.hq },
                                    { label: "Founded", value: company.highlights.founded },
                                    { label: "Website", value: company.highlights.website },
                                ].map((r) => (
                                    <div key={r.label} className="flex gap-3">
                                        <span className="text-slate-400 dark:text-slate-500 font-medium w-[110px] shrink-0">{r.label}</span>
                                        <span className="text-slate-700 dark:text-slate-200 font-medium">{r.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">Company Culture</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[22px] font-bold text-slate-900 dark:text-white">{company.rating}</span>
                                <div className="flex">
                                    {[1,2,3,4,5].map((s) => (
                                        <Star key={s} size={14} className={s <= Math.round(company.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                                    ))}
                                </div>
                                <span className="text-[12px] text-slate-400 dark:text-slate-500">({company.reviews} reviews)</span>
                            </div>
                            {[
                                { label: "Work-life balance", val: 4.4 },
                                { label: "Compensation & benefits", val: 4.3 },
                                { label: "Career growth", val: 4.5 },
                                { label: "Management", val: 4.4 },
                                { label: "Job security", val: 4.5 },
                            ].map((r) => (
                                <div key={r.label} className="flex items-center justify-between text-[12px] mb-2">
                                    <span className="text-slate-500 dark:text-slate-400">{r.label}</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-200">{r.val}</span>
                                </div>
                            ))}
                        </div>

                        
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-3">Top Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {company.skills.map((s) => (
                                    <span key={s} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-[12px] font-medium">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyDetail;
