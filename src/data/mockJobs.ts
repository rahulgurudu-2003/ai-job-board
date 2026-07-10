export interface Job {
    id: string;
    title: string;
    company: string;
    category: "Development" | "Design" | "Marketing" | "Sales" | "Product" | "Finance";
    location: string;
    tags: string[];
    posted: string;
    salary: string;
    featured: boolean;
}

export const mockJobs: Job[] = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Google",
        category: "Development",
        location: "Mountain View, CA",
        tags: ["Full-time", "Remote"],
        posted: "2 days ago",
        salary: "$120k - $160k",
        featured: true,
    },
    {
        id: "2",
        title: "Product Manager",
        company: "Microsoft",
        category: "Product",
        location: "Redmond, WA",
        tags: ["Full-time", "Hybrid"],
        posted: "3 days ago",
        salary: "$130k - $180k",
        featured: true,
    },
    {
        id: "3",
        title: "UX/UI Designer",
        company: "Spotify",
        category: "Design",
        location: "New York, NY",
        tags: ["Full-time", "Remote"],
        posted: "1 day ago",
        salary: "$80k - $120k",
        featured: true,
    },
    {
        id: "4",
        title: "Backend Engineer",
        company: "Airbnb",
        category: "Development",
        location: "San Francisco, CA",
        tags: ["Full-time", "Hybrid"],
        posted: "5 days ago",
        salary: "$110k - $150k",
        featured: true,
    },
    {
        id: "5",
        title: "Growth Marketer",
        company: "Google",
        category: "Marketing",
        location: "Remote",
        tags: ["Full-time", "Remote"],
        posted: "1 day ago",
        salary: "$90k - $120k",
        featured: true,
    },
    {
        id: "6",
        title: "Senior Product Designer",
        company: "Spotify",
        category: "Design",
        location: "New York, NY",
        tags: ["Full-time", "Hybrid"],
        posted: "4 days ago",
        salary: "$110k - $140k",
        featured: true,
    },
    {
        id: "7",
        title: "Sales Development Representative",
        company: "Microsoft",
        category: "Sales",
        location: "Chicago, IL",
        tags: ["Full-time", "On-site"],
        posted: "1 week ago",
        salary: "$60k - $80k",
        featured: false,
    },
    {
        id: "8",
        title: "Financial Analyst",
        company: "Airbnb",
        category: "Finance",
        location: "San Francisco, CA",
        tags: ["Full-time", "Hybrid"],
        posted: "3 days ago",
        salary: "$95k - $120k",
        featured: true,
    },
    {
        id: "9",
        title: "React Native Developer",
        company: "Spotify",
        category: "Development",
        location: "Remote",
        tags: ["Contract", "Remote"],
        posted: "2 days ago",
        salary: "$100k - $130k",
        featured: false,
    },
    {
        id: "10",
        title: "Content Marketing Manager",
        company: "Google",
        category: "Marketing",
        location: "Mountain View, CA",
        tags: ["Full-time", "Hybrid"],
        posted: "5 days ago",
        salary: "$85k - $110k",
        featured: false,
    }
];
