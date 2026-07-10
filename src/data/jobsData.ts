import GoogleLogo from "../assets/logos/google.svg";
import MicrosoftLogo from "../assets/logos/microsoft.svg";
import SlackLogo from "../assets/logos/slack.svg";
import AmazonLogo from "../assets/logos/amazon.svg";
import NetflixLogo from "../assets/logos/netflix.svg";
import HubSpotLogo from "../assets/logos/hubspot.svg";
import SpotifyLogo from "../assets/logos/spotify.svg";
import AirbnbLogo from "../assets/logos/airbnb.svg";
import SalesforceLogo from "../assets/logos/salesforce.svg";

export interface Job {
    id: number;
    title: string;
    company: string;
    logo: string;
    category: "Development" | "Design" | "Marketing" | "Sales" | "Product" | "Finance";
    location: string;
    salary: string;
    type: string;
    mode: "Remote" | "Hybrid" | "On-site";
    posted: string;
    experience: string;
    applicants: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    skills: string[];
    companyDescription: string;
    employees: string;
    website: string;
}

export const mockJobsData: Job[] = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Google",
        logo: GoogleLogo,
        category: "Development",
        location: "Mountain View, CA",
        salary: "$120k - $160k",
        type: "Full-time",
        mode: "Remote",
        posted: "2 days ago",
        experience: "5+ years",
        applicants: "2,345",
        description: "We are looking for a Senior Frontend Developer to join our team and build beautiful, high-performance products used by millions of people worldwide.",
        responsibilities: [
            "Build responsive and scalable web applications",
            "Collaborate with product and design teams to iterate on visual elements",
            "Write clean, maintainable, and efficient frontend code",
            "Optimize applications for maximum speed, accessibility, and scalability",
            "Mentor junior and mid-level developers on web engineering standards"
        ],
        requirements: [
            "5+ years of experience in frontend software development",
            "Strong proficiency in React, TypeScript, and JavaScript",
            "Experience with modern CSS modules, Tailwind CSS, or Styled Components",
            "Excellent problem-solving skills and eye for detail",
            "Bachelor's degree in Computer Science or equivalent practical experience"
        ],
        benefits: [
            "Top-tier health, dental, and vision insurance options",
            "401(k) retirement plan with generous company matching",
            "Flexible work schedules and remote-first opportunities",
            "Generous paid time off, mental health days, and parental leave",
            "Annual learning and development stipend for courses and conferences"
        ],
        skills: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "HTML", "CSS", "Git"],
        companyDescription: "Google's mission is to organize the world's information and make it universally accessible and useful.",
        employees: "1000+ employees",
        website: "google.com"
    },
    {
        id: 2,
        title: "Product Manager",
        company: "Microsoft",
        logo: MicrosoftLogo,
        category: "Product",
        location: "Redmond, WA",
        salary: "$130k - $180k",
        type: "Part-time",
        mode: "Hybrid",
        posted: "3 days ago",
        experience: "4+ years",
        applicants: "1,120",
        description: "Microsoft is looking for an experienced Product Manager to drive features and lifecycle strategies for our cloud developer productivity tools.",
        responsibilities: [
            "Define product requirements and detail technical specification documents",
            "Partner with software engineering teams to deliver milestones on schedule",
            "Engage with global customers to compile feedback and research usage metrics",
            "Coordinate go-to-market strategies with product marketing and sales units",
            "Analyze market trends and competitor strategies to refine product positioning"
        ],
        requirements: [
            "4+ years of product management experience in software or cloud spaces",
            "Strong technical understanding of web services, APIs, and agile structures",
            "Proven track record of launching successful SaaS products or developer APIs",
            "Outstanding verbal, written, and stakeholder communication capabilities",
            "Bachelor's or Master's degree in Engineering, Business, or related fields"
        ],
        benefits: [
            "Comprehensive health, prescription drug, and dental benefits",
            "Generous employee stock purchase plan (ESPP)",
            "Hybrid workplace allowance and workstation stipends",
            "Paid parental leave and family care resources",
            "On-campus amenities including dining, recreation, and transport options"
        ],
        skills: ["Product Strategy", "Agile", "Scrum", "SQL", "SaaS", "Roadmapping", "UX Wireframing"],
        companyDescription: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.",
        employees: "10,000+ employees",
        website: "microsoft.com"
    },
    {
        id: 3,
        title: "UX/UI Designer",
        company: "Spotify",
        logo: SpotifyLogo,
        category: "Design",
        location: "New York, NY",
        salary: "$80k - $120k",
        type: "Contract",
        mode: "Remote",
        posted: "1 day ago",
        experience: "3+ years",
        applicants: "890",
        description: "Spotify is seeking a UX/UI Designer to join our global design organization. You will craft user journeys and interface systems that shape how millions of listeners discover and interact with audio content worldwide.",
        responsibilities: [
            "Deliver end-to-end design solutions from flow diagrams to high fidelity visual mocks",
            "Initiate and design product features centered on audio discovery and playlists",
            "Coordinate with engineering partners to maintain design parity across Android and Web",
            "Incorporate quantitative and qualitative data indicators into regular design iterations",
            "Actively participate in group reviews and contribute to the Spotify design system"
        ],
        requirements: [
            "3+ years of experience designing high-scale consumer applications",
            "Strong online portfolio demonstrating visual excellence, typography, and layout sense",
            "Advanced workspace experience using modern design software like Figma",
            "Strong team collaboration alignment and feedback receptiveness",
            "Experience with micro-interactions and motion animations is a plus"
        ],
        benefits: [
            "Flexible-first work options with shared regional workspaces",
            "Generous holiday allowance, global parent leave, and family support systems",
            "Subsidized gym memberships and overall fitness reimbursements",
            "Comprehensive pension, insurance, and medical schemes",
            "Complimentary Spotify Premium and partner brand discount benefits"
        ],
        skills: ["Figma", "UI Design", "Visual Arts", "Typography", "Prototyping", "Motion Graphics"],
        companyDescription: "Spotify is the world's most popular audio streaming subscription service with a community of more than 500 million users across 180+ markets.",
        employees: "5,000+ employees",
        website: "spotify.com"
    },
    {
        id: 4,
        title: "Backend Engineer",
        company: "Airbnb",
        logo: AirbnbLogo,
        category: "Development",
        location: "San Francisco, CA",
        salary: "$110k - $150k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "5 days ago",
        experience: "4+ years",
        applicants: "1,450",
        description: "Airbnb is looking for a Backend Engineer to build scalable microservices and transactional layers powering host and guest experiences.",
        responsibilities: [
            "Write high quality, testable code for backend API structures",
            "Design database schemas, index strategies, and caching solutions",
            "Architect transactional logic protecting data compliance and payments",
            "Scale services to handle seasonal travel demand traffic spikes",
            "Collaborate with infrastructure groups to assure low latency and uptime"
        ],
        requirements: [
            "4+ years of professional backend development experience in Java, Ruby, or Go",
            "Solid experience designing APIs and modeling complex business objects",
            "Knowledge of relational and non-relational database architectures",
            "Strong debugging, latency analysis, and architectural skills",
            "Bachelor's degree in Computer Science or similar engineering fields"
        ],
        benefits: [
            "Annual travel credits to stay at any Airbnb listing globally",
            "Complete medical, visual, dental, and life protection policies",
            "Flexible work schedules and paid holidays",
            "Dedicated community service and volunteering days",
            "Regular social events, hackathons, and lunch catering"
        ],
        skills: ["Java", "Ruby", "Go", "MySQL", "AWS", "Kafka", "Redis", "APIs"],
        companyDescription: "Airbnb operates a global marketplace where hosts offer unique stays and experiences, allowing guests to connect with local communities worldwide.",
        employees: "6,000+ employees",
        website: "airbnb.com"
    },
    {
        id: 5,
        title: "Growth Marketer",
        company: "Google",
        logo: GoogleLogo,
        category: "Marketing",
        location: "Remote",
        salary: "$90k - $120k",
        type: "Internship",
        mode: "Remote",
        posted: "1 day ago",
        experience: "3+ years",
        applicants: "650",
        description: "Google is seeking a Growth Marketer to drive demand-generation for Google Workspace tools.",
        responsibilities: [
            "Formulate and launch search and display network campaigns",
            "Design automated email workflows targeting user onboarding and renewals",
            "Analyze and optimize landing page funnel metrics and conversion rates",
            "Report acquisition metrics, CAC, and ROI performance to product marketing leads",
            "Collaborate with creative teams to test design concepts and copy variants"
        ],
        requirements: [
            "3+ years of growth marketing or digital advertising experience",
            "Demonstrated skill with Google Ads, Google Analytics, and SEO best practices",
            "Strong data-driven mindset with advanced spreadsheet skills",
            "Excellent copywriting skills tailored for professionals",
            "Degree in Marketing, Business, Analytics, or related fields"
        ],
        benefits: [
            "Exceptional healthcare plans and preventative wellness support",
            "401(k) retirement options with high company match rates",
            "Full home workstation stipend and remote utilities allowances",
            "Generous vacation time, mental health days, and parenting leaves",
            "Free access to online educational platforms and certification programs"
        ],
        skills: ["Google Ads", "Google Analytics", "SEO", "Email Marketing", "A/B Testing", "Copywriting"],
        companyDescription: "Google's mission is to organize the world's information and make it universally accessible and useful.",
        employees: "1,000+ employees",
        website: "google.com"
    },
    {
        id: 6,
        title: "Senior Product Designer",
        company: "Spotify",
        logo: SpotifyLogo,
        category: "Design",
        location: "New York, NY",
        salary: "$110k - $140k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "4 days ago",
        experience: "5+ years",
        applicants: "520",
        description: "Spotify is searching for a Senior Product Designer to drive design strategies for our podcast and audio publisher platform.",
        responsibilities: [
            "Define product interface concepts through sketches, wireframes, and prototypes",
            "Conduct usability testing sessions with podcasters and publisher partners",
            "Collaborate with product and engineering leads to set quarterly roadmaps",
            "Maintain design language consistency with the core design library",
            "Mentor and guide junior product designers in the group"
        ],
        requirements: [
            "5+ years of UX/UI or product design experience for B2B or SaaS systems",
            "Extensive portfolio showing design iterations, research, and high fidelity specs",
            "High proficiency in design tools including Figma and prototyping libraries",
            "Outstanding presentation, storytelling, and communication skills",
            "Experience designing audio or content creation tools is a plus"
        ],
        benefits: [
            "Flexible work models (work from home or office locations)",
            "Generous paid annual leave, public holidays, and family leaves",
            "Health, dental, vision insurance coverage for you and family",
            "Wellness benefits including mental health counseling sessions",
            "Complimentary premium subscription and technology vouchers"
        ],
        skills: ["Figma", "UX Design", "User Research", "Monetization Systems", "Prototyping", "B2B SaaS"],
        companyDescription: "Spotify is the world's most popular audio streaming subscription service with a community of more than 500 million users across 180+ markets.",
        employees: "5,000+ employees",
        website: "spotify.com"
    },
    {
        id: 7,
        title: "UX Designer",
        company: "Slack",
        logo: SlackLogo,
        category: "Design",
        location: "San Francisco, CA",
        salary: "$85k - $130k",
        type: "Part-time",
        mode: "Remote",
        posted: "5 days ago",
        experience: "3+ years",
        applicants: "980",
        description: "Slack is hiring a UX Designer to design intuitive, collaborative interfaces that help make people's working lives simpler, more pleasant, and more productive.",
        responsibilities: [
            "Create user flows, wireframes, prototypes, and high-fidelity mockups",
            "Conduct user research sessions and synthesize testing findings",
            "Collaborate with engineers and product managers to assure design parity",
            "Contribute to and maintain our shared Slack design system library",
            "Advocate for user-centric design paradigms across product groups"
        ],
        requirements: [
            "3+ years of experience as a UX/UI designer for web or desktop applications",
            "Strong portfolio demonstrating process, wireframes, and interactive flows",
            "Expertise in Figma, Sketch, Principle, or similar design assets",
            "Experience operating with cross-functional development cycles",
            "Understanding of HTML/CSS capabilities and accessibility standards"
        ],
        benefits: [
            "Full medical, dental, and vision coverage for you and dependents",
            "Wellness allowance for gym, yoga, and meditation subscriptions",
            "Flexible remote work guidelines and home office setups",
            "Generous equity plans and performance bonuses",
            "Volunteering time off and corporate charity matching"
        ],
        skills: ["Figma", "UI Design", "User Research", "Wireframing", "Prototyping", "Design Systems"],
        companyDescription: "Slack is the collaboration hub that brings the right people, information, and tools together to get work done.",
        employees: "2,000+ employees",
        website: "slack.com"
    },
    {
        id: 8,
        title: "Backend Engineer",
        company: "Amazon",
        logo: AmazonLogo,
        category: "Development",
        location: "Seattle, WA",
        salary: "$110k - $150k",
        type: "Full-time",
        mode: "On-site",
        posted: "1 week ago",
        experience: "4+ years",
        applicants: "3,145",
        description: "Amazon Web Services is seeking a Backend Engineer to build robust, distributed microservices powering next-generation serverless architectures.",
        responsibilities: [
            "Design and build highly available, scalable backend services",
            "Integrate storage engines, message queues, and caching technologies",
            "Optimize system performance and resolve complex latency bottlenecks",
            "Implement security compliance structures and database schemas",
            "Participate in code reviews and architectural planning sessions"
        ],
        requirements: [
            "4+ years of backend software development experience in Java, Go, or Python",
            "Solid experience with AWS technologies (DynamoDB, Lambda, RDS, S3)",
            "Strong grasp of data structures, algorithms, and system design models",
            "Experience building distributed architectures and handling concurrent requests",
            "Degree in Computer Science, Computer Engineering, or related fields"
        ],
        benefits: [
            "Competitive base salary and sign-on bonuses",
            "Restricted Stock Units (RSUs) vesting plans",
            "Relocation support packages for qualifying engineers",
            "Excellent healthcare plans and employee discount programs",
            "Continuing education and career development pathways"
        ],
        skills: ["Go", "Java", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL", "NoSQL", "Redis"],
        companyDescription: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
        employees: "50,000+ employees",
        website: "amazon.com"
    },
    {
        id: 9,
        title: "Data Analyst",
        company: "Netflix",
        logo: NetflixLogo,
        category: "Development",
        location: "Los Angeles, CA",
        salary: "$80k - $110k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "1 week ago",
        experience: "3+ years",
        applicants: "740",
        description: "Netflix is searching for a Data Analyst to join our content intelligence group. You will leverage data-driven workflows to analyze viewership trends, model content performance, and shape production strategies.",
        responsibilities: [
            "Create interactive dashboards and report tools utilizing Tableau and SQL",
            "Formulate statistical models to evaluate audience engagement trends",
            "Translate complex query results into actionable content recommendations",
            "Collaborate with database teams to optimize data warehouses and tables",
            "Present insights to creative executives and marketing leads"
        ],
        requirements: [
            "3+ years of experience in data analysis, business intelligence, or consulting",
            "High proficiency writing complex SQL queries and scripting in Python or R",
            "Experience building dashboards with Tableau, Looker, or PowerBI",
            "Strong understanding of statistical concepts and A/B testing methodologies",
            "Ability to explain technical metrics to non-technical business partners"
        ],
        benefits: [
            "Market-leading compensation with custom salary-equity ratios",
            "Flexible vacation policy with no strict limit on days off",
            "Comprehensive health care and wellness support",
            "Generous parental leaves and family planning support",
            "Free Netflix subscription and exclusive screening invitations"
        ],
        skills: ["SQL", "Python", "R", "Tableau", "Looker", "Data Modeling", "A/B Testing", "Excel"],
        companyDescription: "Netflix is one of the world's leading entertainment services.",
        employees: "5,000+ employees",
        website: "netflix.com"
    },
    {
        id: 10,
        title: "Marketing Manager",
        company: "HubSpot",
        logo: HubSpotLogo,
        category: "Marketing",
        location: "Cambridge, MA",
        salary: "$90k - $120k",
        type: "Contract",
        mode: "Remote",
        posted: "2 weeks ago",
        experience: "4+ years",
        applicants: "450",
        description: "HubSpot is seeking a Growth Marketing Manager to oversee lead-generation and conversion-optimization experiments.",
        responsibilities: [
            "Develop and launch digital marketing plans across SEO, email, and social networks",
            "Formulate copy and coordinate layout design for landing pages and newsletters",
            "Track campaign performance metrics, CPL, ROI, and customer journeys",
            "Collaborate with sales operations to streamline automated lead routing",
            "Run multivariate A/B testing on pricing models and email outreach"
        ],
        requirements: [
            "4+ years of inbound marketing, growth hacking, or digital media experience",
            "Expertise operating marketing automation systems (HubSpot, Marketo)",
            "Strong analytical abilities, with experience using Google Analytics and Excel",
            "Exceptional copywriter and content strategist for B2B audiences",
            "Familiarity with SEO keyword tools (SEMrush, Ahrefs, Moz)"
        ],
        benefits: [
            "Comprehensive medical, dental, and vision insurance options",
            "Four-week paid sabbatical after five years of employment",
            "Work from anywhere policy and setup stipends",
            "Uncapped commission plans for sales and growth positions",
            "Unlimited vacation days and mental health workshops"
        ],
        skills: ["Inbound Marketing", "SEO", "Google Analytics", "Email Marketing", "A/B Testing", "Copywriting"],
        companyDescription: "HubSpot is a leading customer relationship management (CRM) platform.",
        employees: "4,000+ employees",
        website: "hubspot.com"
    },
    {
        id: 11,
        title: "React Developer",
        company: "Slack",
        logo: SlackLogo,
        category: "Development",
        location: "San Francisco, CA",
        salary: "$90k - $130k",
        type: "Full-time",
        mode: "Remote",
        posted: "3 days ago",
        experience: "3+ years",
        applicants: "320",
        description: "Slack is hiring a React Developer to construct reactive, accessible features within our web and desktop communication applications.",
        responsibilities: [
            "Code modular web features using React, TypeScript, and modern state containers",
            "Coordinate with UI designers to implement fluid transitions and interactions",
            "Build accessible UI patterns compliant with WCAG accessibility guidelines",
            "Debug complex client state latency issues across browser configurations",
            "Contribute reusable UI modules to the slack-ui design system library"
        ],
        requirements: [
            "3+ years of professional React and TypeScript development experience",
            "Strong knowledge of state libraries, server synchronization, and React lifecycle",
            "High proficiency implementing custom styles with Tailwind CSS or CSS modules",
            "Familiarity with jest, testing-library, or browser automated testing",
            "Excellent communication alignment when cooperating with cross-functional groups"
        ],
        benefits: [
            "Full medical, dental, and optical plan packages",
            "Workplace setup allowances and phone bill compensation",
            "Regular team building meetings, hackweeks, and partner events",
            "Generous equity share plans and annual bonus indicators",
            "Learning resources allowance and professional coaching credits"
        ],
        skills: ["React", "TypeScript", "Redux", "Tailwind CSS", "Jest", "CSS Modules", "Webpack"],
        companyDescription: "Slack is the collaboration hub that brings the right people, information, and tools together to get work done.",
        employees: "2,000+ employees",
        website: "slack.com"
    },
    {
        id: 12,
        title: "Frontend Developer",
        company: "Microsoft",
        logo: MicrosoftLogo,
        category: "Development",
        location: "Redmond, WA",
        salary: "$110k - $140k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "4 days ago",
        experience: "3+ years",
        applicants: "440",
        description: "Microsoft is looking for a Frontend Developer to build clean, intuitive experiences on the web. You will play a key role in developing client-side layers using React to empower user workflows.",
        responsibilities: [
            "Build reusable React components and client utility libraries",
            "Implement high-fidelity visual layouts with focus on performance",
            "Optimize pages for load speed, search engine crawls, and screen readers",
            "Engage in pull request review cycles to sustain engineering standards",
            "Translate product guidelines into concrete technical designs"
        ],
        requirements: [
            "3+ years of front-end web engineering experience using HTML/CSS/JS",
            "Strong proficiency in React, TypeScript, and developer tooling integrations",
            "Solid familiarity with responsive layout grids and fluid styling",
            "Strong problem-solving capability and clear team interaction flow",
            "Bachelor's degree in Computer Science, Software Engineering, or equivalent"
        ],
        benefits: [
            "Top health care coverages and preventative care stipends",
            "401(k) matching alongside employee stock purchase plans",
            "Work-from-home flexibility and hardware configuration setups",
            "Generous vacation time, personal leaves, and holidays",
            "Direct options for technical learning credits and certification exams"
        ],
        skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Sass", "Responsive Design"],
        companyDescription: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
        employees: "10,000+ employees",
        website: "microsoft.com"
    },
    
    
    
    
    {
        id: 13,
        title: "Lead Brand Designer",
        company: "HubSpot",
        logo: HubSpotLogo,
        category: "Design",
        location: "Cambridge, MA",
        salary: "$100k - $140k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "3 days ago",
        experience: "5+ years",
        applicants: "310",
        description: "HubSpot is looking for a Lead Brand Designer to guide the visual design language of our marketing campaigns, web properties, and public brand assets.",
        responsibilities: [
            "Establish and maintain visual guidelines for regional and global campaigns",
            "Create high-impact assets for digital advertising, print, and major event keynotes",
            "Collaborate with UX/UI design teams to align user interfaces with brand styles",
            "Direct and mentor junior graphic designers, illustrators, and agency partners"
        ],
        requirements: [
            "5+ years of graphic design, brand strategy, or visual design experience",
            "A outstanding portfolio demonstrating a wide range of print, web, and layout designs",
            "High proficiency in Adobe Creative Cloud (Illustrator, Photoshop, InDesign) and Figma"
        ],
        benefits: [
            "Generous health plans and premium wellness stipends",
            "Four-week paid sabbatical after five years of service",
            "Home office setup budget and flexible work options"
        ],
        skills: ["Figma", "Brand Design", "Adobe Suite", "Typography", "Art Direction", "Graphic Design"],
        companyDescription: "HubSpot is a leading customer relationship management (CRM) platform.",
        employees: "4,000+ employees",
        website: "hubspot.com"
    },

    
    
    
    {
        id: 14,
        title: "SEO & Content Specialist",
        company: "Slack",
        logo: SlackLogo,
        category: "Marketing",
        location: "Remote",
        salary: "$70k - $95k",
        type: "Full-time",
        mode: "Remote",
        posted: "6 days ago",
        experience: "2+ years",
        applicants: "245",
        description: "Slack is hiring an SEO & Content Specialist to increase organic search performance and drive content strategy for our company blog.",
        responsibilities: [
            "Conduct keyword research to identify editorial and conversion opportunities",
            "Write and optimize blog articles, landing pages, and product pages for search",
            "Monitor search console metrics, index issues, and backlink portfolios"
        ],
        requirements: [
            "2+ years of SEO analysis or content writing experience in B2B SaaS spaces",
            "Demonstrated experience utilizing Moz, Ahrefs, SEMrush, and Google Search Console"
        ],
        benefits: [
            "Flexible remote-first workspace and home office setups",
            "Comprehensive health, dental, and vision insurance policies",
            "Generous corporate equity options and annual bonuses"
        ],
        skills: ["SEO", "Copywriting", "Ahrefs", "Google Analytics", "Content Strategy", "SEM"],
        companyDescription: "Slack is the collaboration hub that brings the right people, information, and tools together.",
        employees: "2,000+ employees",
        website: "slack.com"
    },
    {
        id: 15,
        title: "Social Media Manager",
        company: "Spotify",
        logo: SpotifyLogo,
        category: "Marketing",
        location: "Remote",
        salary: "$65k - $85k",
        type: "Part-time",
        mode: "Remote",
        posted: "1 week ago",
        experience: "3+ years",
        applicants: "580",
        description: "Spotify is seeking a Social Media Manager to cultivate engagement across our corporate social channels and artist-relation campaigns.",
        responsibilities: [
            "Create engaging content schedules for X/Twitter, Instagram, LinkedIn, and TikTok",
            "Collaborate with digital content designers to draft templates and video edits",
            "Engage with listeners and creators to grow online brand advocacy"
        ],
        requirements: [
            "3+ years managing high-engagement social media profiles for consumer brands",
            "Outstanding writing skills and mastery of photo/video editing apps"
        ],
        benefits: [
            "Flexible working hours with regional workspaces",
            "Comprehensive pension, insurance, and medical schemes",
            "Free Spotify Premium subscription"
        ],
        skills: ["Social Media", "Copywriting", "Branding", "Video Editing", "Content Creation", "Instagram"],
        companyDescription: "Spotify is the world's most popular audio streaming subscription service.",
        employees: "5,000+ employees",
        website: "spotify.com"
    },

    
    
    
    {
        id: 16,
        title: "Associate Product Manager",
        company: "Amazon",
        logo: AmazonLogo,
        category: "Product",
        location: "Seattle, WA",
        salary: "$95k - $125k",
        type: "Full-time",
        mode: "On-site",
        posted: "2 days ago",
        experience: "2+ years",
        applicants: "612",
        description: "Amazon is seeking an Associate Product Manager to own customer-journey optimizations for our device shipping experience.",
        responsibilities: [
            "Analyze customer checkout metrics to define improvement opportunities",
            "Draft requirements, user flows, and coordinate with engineering delivery teams"
        ],
        requirements: [
            "2+ years of software product management or data analytics experience",
            "Strong analytical abilities, with experience using SQL and Excel"
        ],
        benefits: [
            "Competitive salary package with sign-on bonuses",
            "Vesting stock options (RSUs) and complete medical policies",
            "Career mentorship programs and ongoing technical training"
        ],
        skills: ["Product Management", "SQL", "A/B Testing", "Agile", "User Experience", "Data Analytics"],
        companyDescription: "Amazon is guided by customer obsession and a passion for invention.",
        employees: "50,000+ employees",
        website: "amazon.com"
    },
    {
        id: 17,
        title: "Technical Product Manager",
        company: "Netflix",
        logo: NetflixLogo,
        category: "Product",
        location: "Los Angeles, CA",
        salary: "$140k - $190k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "4 days ago",
        experience: "6+ years",
        applicants: "410",
        description: "Netflix is searching for a Technical Product Manager to oversee internal developer tooling, encoding pipelines, and content CDN platforms.",
        responsibilities: [
            "Collaborate with core backend engineering to define platform API roadmaps",
            "Prioritize system architecture improvements to support global video distribution"
        ],
        requirements: [
            "6+ years as a product manager or software architect in cloud infrastructure",
            "Strong technical understanding of CDNs, microservices, and distributed media storage"
        ],
        benefits: [
            "Top-tier compensation with customizable salary-equity ratios",
            "Unlimited paid vacation and comprehensive medical policies",
            "Complimentary Netflix subscription and film previews"
        ],
        skills: ["Product Strategy", "CDNs", "APIs", "System Architecture", "Cloud Services", "Agile Roadmap"],
        companyDescription: "Netflix is one of the world's leading entertainment services.",
        employees: "5,000+ employees",
        website: "netflix.com"
    },
    {
        id: 18,
        title: "Product Owner",
        company: "Slack",
        logo: SlackLogo,
        category: "Product",
        location: "Remote",
        salary: "$110k - $150k",
        type: "Full-time",
        mode: "Remote",
        posted: "1 week ago",
        experience: "4+ years",
        applicants: "318",
        description: "Slack is hiring a Product Owner to guide development of user lifecycle integrations and enterprise-grade permission tools.",
        responsibilities: [
            "Own the backlog, draft user stories, and drive sprint planning cycles",
            "Align security compliance guidelines with customer lifecycle roadmaps"
        ],
        requirements: [
            "4+ years of product management, scrum master, or product owner experience",
            "Deep understanding of enterprise SaaS models, permissions, and SAML/SSO"
        ],
        benefits: [
            "Flexible remote work policies and workstation stipends",
            "Excellent equity options and annual performance bonuses",
            "Volunteering days and mental health days"
        ],
        skills: ["Agile", "Scrum", "Backlog Grooming", "SaaS", "Security SSO", "Product Management"],
        companyDescription: "Slack is the collaboration hub that brings the right people and tools together.",
        employees: "2,000+ employees",
        website: "slack.com"
    },

    
    
    
    {
        id: 19,
        title: "Enterprise Account Executive",
        company: "Salesforce",
        logo: SalesforceLogo,
        category: "Sales",
        location: "San Francisco, CA",
        salary: "$120k - $170k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "2 days ago",
        experience: "5+ years",
        applicants: "189",
        description: "Salesforce is seeking an Enterprise Account Executive to manage customer accounts and drive growth of our core platform in western regions.",
        responsibilities: [
            "Consult with enterprise CIOs to design tailored CRM architectures",
            "Navigate complex procurement paths to close six-figure software packages"
        ],
        requirements: [
            "5+ years of enterprise software sales (SaaS AE) experience",
            "Proven track record of quota attainment exceeding $1M annually"
        ],
        benefits: [
            "Uncapped commission structures with accelerators",
            "Top health care options, dental, and retirement matching",
            "Wellness program allowances and health club discounts"
        ],
        skills: ["Enterprise Sales", "CRM Software", "Negotiation", "B2B Sales", "Quota Attainment", "Salesforce"],
        companyDescription: "Salesforce is the global leader in customer relationship management (CRM) software.",
        employees: "10,000+ employees",
        website: "salesforce.com"
    },
    {
        id: 20,
        title: "Sales Development Representative",
        company: "HubSpot",
        logo: HubSpotLogo,
        category: "Sales",
        location: "Remote",
        salary: "$55k - $75k",
        type: "Full-time",
        mode: "Remote",
        posted: "4 days ago",
        experience: "1+ years",
        applicants: "480",
        description: "HubSpot is seeking a Sales Development Representative to identify growth opportunities and generate quality leads for our account executive team.",
        responsibilities: [
            "Conduct outbound calls, email campaigns, and social messages daily",
            "Qualify inbound marketing leads to verify business needs and budgets"
        ],
        requirements: [
            "1+ years of sales outreach, customer success, or lead generation experience",
            "Excellent oral, written, and active listening capabilities"
        ],
        benefits: [
            "Competitive salary with performance commission paths",
            "Flexible work location setup with computer equipment supplied",
            "Unlimited paid annual leaves and wellness support"
        ],
        skills: ["Cold Outbound", "Lead Qualification", "Email Writing", "CRM Tooling", "Active Listening"],
        companyDescription: "HubSpot is a leading customer relationship management (CRM) platform.",
        employees: "4,000+ employees",
        website: "hubspot.com"
    },
    {
        id: 21,
        title: "Customer Success Manager",
        company: "Google",
        logo: GoogleLogo,
        category: "Sales",
        location: "Mountain View, CA",
        salary: "$90k - $120k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "6 days ago",
        experience: "3+ years",
        applicants: "290",
        description: "Google Cloud is hiring a Customer Success Manager to support enterprise clients adopting and scaling cloud database solutions.",
        responsibilities: [
            "Partner with cloud architects to verify client migrations run smoothly",
            "Identify expansion and renewal opportunities within current accounts"
        ],
        requirements: [
            "3+ years of account management, customer success, or tech consulting",
            "Strong high-level familiarity with cloud database paradigms and SaaS setups"
        ],
        benefits: [
            "Top-tier medical, optical, dental, and life coverage packages",
            "Generous retirement contributions and ESPP matches",
            "Flexible hours and remote configuration support"
        ],
        skills: ["Customer Success", "Account Management", "Cloud migrations", "SaaS Upgrades", "Consultative Selling"],
        companyDescription: "Google's mission is to organize the world's information and make it universally accessible.",
        employees: "1,000+ employees",
        website: "google.com"
    },
    {
        id: 22,
        title: "Inside Sales Representative",
        company: "Microsoft",
        logo: MicrosoftLogo,
        category: "Sales",
        location: "Redmond, WA",
        salary: "$70k - $90k",
        type: "Full-time",
        mode: "On-site",
        posted: "1 week ago",
        experience: "2+ years",
        applicants: "185",
        description: "Microsoft is looking for an Inside Sales Representative to manage license agreements and upgrades for Office 365 services with mid-sized businesses.",
        responsibilities: [
            "Advise IT directors on licensing setups and subscription tier models",
            "Create quotes, resolve agreement questions, and close subscription orders"
        ],
        requirements: [
            "2+ years of inside software sales or corporate customer service",
            "Strong detail-orientation and familiarity with CRM logging workflows"
        ],
        benefits: [
            "Competitive salary with corporate bonuses and ESPP plans",
            "Top-tier health care coverage and gym center access",
            "On-campus recreational dining and travel allowances"
        ],
        skills: ["Inside Sales", "CRM Logging", "Licensing Models", "Quoting Systems", "Customer Service"],
        companyDescription: "Microsoft enables digital transformation for the era of an intelligent cloud.",
        employees: "10,000+ employees",
        website: "microsoft.com"
    },

    
    
    
    {
        id: 23,
        title: "Financial Analyst",
        company: "Airbnb",
        logo: AirbnbLogo,
        category: "Finance",
        location: "San Francisco, CA",
        salary: "$85k - $115k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "3 days ago",
        experience: "3+ years",
        applicants: "215",
        description: "Airbnb is looking for a Financial Analyst to join our team and oversee regional travel transaction forecasting.",
        responsibilities: [
            "Build cash flow forecast models and analyze cost performance metrics",
            "Coordinate with regional operations managers to prepare annual budgets"
        ],
        requirements: [
            "3+ years of corporate finance, investment banking, or accounting experience",
            "Expert skill modeling in Excel and writing database query scripts (SQL)"
        ],
        benefits: [
            "Airbnb travel credits issued annually for any listing global location",
            "Full medical, dental, and visual protection coverages",
            "Dedicated days off for local volunteering and community projects"
        ],
        skills: ["Excel Modeling", "SQL Queries", "Financial Analysis", "Forecasting", "Budget Planning"],
        companyDescription: "Airbnb operates a global marketplace where hosts offer unique stays.",
        employees: "6,000+ employees",
        website: "airbnb.com"
    },
    {
        id: 24,
        title: "Senior Accountant",
        company: "Amazon",
        logo: AmazonLogo,
        category: "Finance",
        location: "Seattle, WA",
        salary: "$95k - $130k",
        type: "Full-time",
        mode: "On-site",
        posted: "5 days ago",
        experience: "4+ years",
        applicants: "167",
        description: "Amazon is seeking a Senior Accountant to oversee inventory and fulfillment asset balances for our global shipping centers.",
        responsibilities: [
            "Manage ledger records, reconcile transaction statements, and audit balances",
            "Ensure regional tax filings and ledger reconciliations run on schedule"
        ],
        requirements: [
            "4+ years of accounting experience in retail, supply chain, or shipping firms",
            "CPA credentials and strong familiarity with US GAAP standards"
        ],
        benefits: [
            "Excellent base salary with sign-on options and RSUs",
            "Comprehensive health packages and discount codes for products",
            "Relocation support for qualifying candidates"
        ],
        skills: ["Ledger Accounting", "US GAAP", "CPA Credentials", "Tax Filing", "Audits", "Inventory Management"],
        companyDescription: "Amazon is guided by a focus on operational excellence and customer obsession.",
        employees: "50,000+ employees",
        website: "amazon.com"
    },
    {
        id: 25,
        title: "Finance Director",
        company: "Google",
        logo: GoogleLogo,
        category: "Finance",
        location: "Mountain View, CA",
        salary: "$160k - $220k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "1 week ago",
        experience: "8+ years",
        applicants: "89",
        description: "Google is looking for a Finance Director to supervise corporate finance compliance for search advertising assets.",
        responsibilities: [
            "Direct corporate finance strategy and audit reporting teams",
            "Provide strategic recommendations regarding business margins to executive leads"
        ],
        requirements: [
            "8+ years of corporate finance leadership experience in high scale firms",
            "MBA in Finance or CPA credentials with a strong background in tech industries"
        ],
        benefits: [
            "Market leading salary compensation, ESPP, and equity matching",
            "Exceptional healthcare plans and parent leave benefits",
            "Free access to wellness resources, gyms, and healthy dining options"
        ],
        skills: ["Finance Strategy", "MBA Credentials", "CPA", "Audit Reporting", "Business Margins", "Leadership"],
        companyDescription: "Google's mission is to organize the world's information.",
        employees: "1,000+ employees",
        website: "google.com"
    },
    {
        id: 26,
        title: "Investment Associate",
        company: "Microsoft",
        logo: MicrosoftLogo,
        category: "Finance",
        location: "Redmond, WA",
        salary: "$110k - $150k",
        type: "Full-time",
        mode: "Hybrid",
        posted: "2 weeks ago",
        experience: "3+ years",
        applicants: "140",
        description: "Microsoft's corporate development group is seeking an Investment Associate to support strategic tech merger and acquisition analyses.",
        responsibilities: [
            "Research tech startup valuations and construct discounted cash flow analyses",
            "Prepare deal reports and market reviews for the corporate investment board"
        ],
        requirements: [
            "3+ years of venture capital, investment banking, or corporate development",
            "Exceptional market modeling, research, and deal analysis capabilities"
        ],
        benefits: [
            "Highly competitive salary, corporate bonuses, and stock options",
            "Comprehensive health, prescription drug, and dental packages",
            "Hybrid workplace allowance and campus dining options"
        ],
        skills: ["Valuations", "Venture Capital", "Mergers & Acquisitions", "Market Modeling", "Cash Flow Analysis"],
        companyDescription: "Microsoft enables digital transformation for the era of an intelligent cloud.",
        employees: "10,000+ employees",
        website: "microsoft.com"
    }
];
