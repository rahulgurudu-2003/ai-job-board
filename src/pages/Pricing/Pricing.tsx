import { useState } from "react";
import { Check } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Pricing = () => {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

    const plans = [
        {
            name: "Starter",
            price: "$0",
            period: "",
            description: "Perfect for job seekers starting their career journey.",
            features: [
                "Apply to up to 10 jobs per month",
                "Basic profile visibility",
                "Email notifications for new matching jobs",
                "Community support access",
            ],
            buttonText: "Get Started",
            popular: false,
        },
        {
            name: "Professional",
            price: billingPeriod === "monthly" ? "$19" : "$15",
            period: "/ month",
            description: "Best for active job hunters who want to stand out.",
            features: [
                "Unlimited job applications",
                "Priority profile listing to recruiters",
                "Access to salary estimator tools",
                "Advanced application analytics & tracking",
                "1-on-1 resume review feedback (1/mo)",
            ],
            buttonText: "Upgrade to Professional",
            popular: true,
        },
        {
            name: "Recruiter Pro",
            price: billingPeriod === "monthly" ? "$99" : "$79",
            period: "/ month",
            description: "For small-to-medium teams looking to hire top talent.",
            features: [
                "Post up to 5 active job listings",
                "Search candidate database (up to 100/mo)",
                "Recruiter dashboard with analytics",
                "Direct messaging with applicants",
                "Standard company profile page",
            ],
            buttonText: "Start Hiring",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        Simple, Transparent <span className="text-blue-600 dark:text-blue-450">Pricing</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-[16px] font-medium leading-relaxed">
                        Whether you are looking to find your next dream role or search for qualified talent, we have the right plan for you.
                    </p>
                </div>

                
                <div className="flex items-center justify-center gap-4 mb-12 select-none">
                    <span className={`text-[14.5px] font-semibold transition-colors duration-200 ${billingPeriod === "monthly" ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>
                        Monthly Billing
                    </span>
                    <button
                        onClick={() => setBillingPeriod(prev => prev === "monthly" ? "annually" : "monthly")}
                        className="w-13 h-7 bg-blue-600 dark:bg-blue-500 rounded-full p-0.5 transition-all duration-300 focus:outline-none flex items-center cursor-pointer relative"
                        aria-label="Toggle billing cycle"
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${billingPeriod === "annually" ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                    <span className={`text-[14.5px] font-semibold transition-colors duration-200 flex items-center gap-1.5 ${billingPeriod === "annually" ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>
                        Annual Billing
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/45 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-200 dark:border-green-800">
                            Save 20%
                        </span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <div 
                            key={idx}
                            className={`flex flex-col justify-between bg-white dark:bg-slate-900 border rounded-[28px] p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative ${
                                plan.popular 
                                    ? "border-blue-600 dark:border-blue-500 scale-100 md:scale-[1.03] ring-4 ring-blue-50 dark:ring-blue-950/20" 
                                    : "border-slate-200/60 dark:border-slate-800/80"
                            }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-full shadow-md">
                                    Most Popular
                                </span>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                                <p className="text-[13px] text-slate-455 dark:text-slate-500 mt-2 font-medium leading-relaxed">
                                    {plan.description}
                                </p>
                                <div className="flex flex-col gap-0.5 mt-6 mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                                        {plan.period && <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{plan.period}</span>}
                                    </div>
                                    {billingPeriod === "annually" && plan.price !== "$0" && (
                                        <span className="text-[11px] text-green-600 dark:text-green-400 font-bold mt-1">
                                            Billed annually (Save 20%)
                                        </span>
                                    )}
                                </div>

                                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8">
                                    <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">What's Included</h4>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3 text-[13.5px] text-slate-650 dark:text-slate-350 font-medium leading-normal">
                                                <Check size={16} className="text-blue-600 dark:text-blue-450 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button className={`w-full h-12 font-bold text-[14px] rounded-xl transition cursor-pointer ${
                                plan.popular 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-[0.98]" 
                                    : "bg-slate-55 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-205"
                            }`}>
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
