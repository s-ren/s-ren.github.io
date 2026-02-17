interface Teaching {
    title: string;
    titleref: string;
    Date: string;
    position: string;
}

const  teachings: Teaching[] = [
    {
        title: "CS 4120/5120: Introduction to Compilers",
        titleref: "https://www.cs.cornell.edu/courses/cs4120/2026sp",
        Date: "2026 Spring",
        position: "Cornell University",
    },
    {
        title: "CS 6110: Advanced Programming Languages",
        titleref: "https://www.cs.cornell.edu/courses/cs6110/2025sp/",
        Date: "2025 Spring",
        position: "Cornell University",
    },
    {
        title: "CS 3110: Data Structures and Functional Programming",
        titleref: "https://www.cs.cornell.edu/courses/cs3110/2024sp/",
        Date: "2024 Spring",
        position: "Cornell University",
    },
    {
        title: "CS 6830: Cryptography",
        titleref: "",
        Date: "2021 Spring",
        position: "Cornell University",
    },
    {
        title: "CS 2800: Discrete Structures",
        titleref: "",
        Date: "2020 Spring",
        position: "Cornell University",
    },
    {
        title: "CSCI 1420: Machine Learning",
        titleref: "",
        Date: "2018 Fall",
        position: "Brown University",
    },
    {
        title: "CSCI 0330: Introduction to Computer Systems",
        titleref: "",
        Date: "2017 Fall",
        position: "Brown University",
    },
];

export default teachings;