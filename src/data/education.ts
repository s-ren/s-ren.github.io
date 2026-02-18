interface Education {
    title: string;
    startDate: string;
    endDate?: string;
    school: string;
    location: string;
    description: string;
    currentUni: boolean;
}

const  education: Education[] = [
    {
        title: "Ph.D. Candidate in Computer Science",
        startDate: "2020-02",
        endDate: "2026-09",
        school: "Cornell University",
        location: "Ithaca, NY, USA",
        description: "",
        currentUni: true,
    },
    {
        title: "Sc.B. in Computer Science & Mathematics",
        startDate: "2015-10",
        endDate: "2019-06",
        school: "Brown University",
        location: "Providence, RI, USA",
        description: "",
        currentUni: false,
    }
];

export default education;