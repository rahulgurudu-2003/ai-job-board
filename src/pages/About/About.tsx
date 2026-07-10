import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Award, ShieldCheck, Zap, Users } from "lucide-react";

const stats = [
    { label: "Active Job Seekers", value: "2M+" },
    { label: "Jobs Posted Daily", value: "15,000+" },
    { label: "Verified Employers", value: "85,000+" },
    { label: "Successful Hires", value: "650,000+" },
];

const values = [
    {
        icon: Zap,
        title: "Speed & Efficiency",
        description: "We optimize candidate-to-employer matching to fill roles faster and reduce the friction of recruitment.",
        color: "text-blue-600 dark:text-blue-450",
        bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
        icon: ShieldCheck,
        title: "Trust & Transparency",
        description: "We verify every single employer profile and offer transparent salary reporting to foster a trusted environment.",
        color: "text-emerald-600 dark:text-emerald-450",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
        icon: Award,
        title: "Quality First",
        description: "We focus on putting high-quality talent in front of high-value opportunities to generate long-term career fits.",
        color: "text-purple-600 dark:text-purple-450",
        bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Our features are designed to serve and build relationships between developers, designers, and scaling companies.",
        color: "text-amber-600 dark:text-amber-450",
        bg: "bg-amber-50 dark:bg-amber-950/30",
    },
];

const About = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
                
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        Connecting Talent with <span className="text-blue-600 dark:text-blue-450">Opportunity</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-[16px] font-medium leading-relaxed">
                        JobBoard is a modern, developer-centric platform designed to simplify the job hunting and hiring process. We bridge the gap between talented tech specialists and top-tier global companies.
                    </p>
                </div>

                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
                    {stats.map((s, idx) => (
                        <div 
                            key={idx}
                            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-[22px] p-6 text-center shadow-sm"
                        >
                            <p className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-450 tracking-tight">{s.value}</p>
                            <p className="text-[12px] md:text-[13px] font-bold text-slate-450 dark:text-slate-550 mt-1 uppercase tracking-wider">{s.label}</p>
                        </div>
                    ))}
                </div>

                
                <div className="mb-20">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Core Values</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-[14px] leading-relaxed">
                            These fundamental principles guide how we build our products and support our community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {values.map((val, idx) => (
                            <div 
                                key={idx}
                                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-[24px] p-6 flex gap-4 shadow-sm"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${val.bg}`}>
                                    <val.icon className={val.color} size={22} />
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">{val.title}</h3>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                                        {val.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="bg-blue-600 dark:bg-blue-900/40 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-lg shadow-blue-100 dark:shadow-none max-w-4xl mx-auto">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 dark:bg-blue-800/20 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Our Mission</h2>
                        <p className="mt-4 text-base md:text-lg text-blue-100 font-medium leading-relaxed">
                            "To empower tech professionals by providing them with the clearest path to their career growth, while giving companies the most efficient tools to identify and hire excellent teams."
                        </p>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default About;
