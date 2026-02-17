interface Talk {
    title: string;
    titleref: string;
    Date: string;
    venue: string;
    venueref: string;
    location: string;
    locationref: string;
    description: string;
}

const  talks: Talk[] = [
    {
        title: "Type Confusion",
        titleref: "type-confusion.pdf",
        Date: "2025-08-28",
        venue: "Upstate PL Seminar",
        venueref: "https://www.cs.cornell.edu/upstate-pl/",
        location: "Ithaca, NY, USA",
        locationref: "https://pl.cs.cornell.edu/#about",
        description: "Original research presented at Upstate PL Seminar.",
    },
    {
        title: "Trust Delegation in Information Flow Control Systems",
        titleref: "https://dl.acm.org/doi/10.1007/978-3-032-07901-5_17",
        Date: "2023-10-14",
        venue: "UC Berkeley Programming Systems Seminar",
        venueref: "https://ps.berkeley.edu/",
        location: "Berkeley, CA, USA",
        locationref: "https://sky.cs.berkeley.edu/",
        description: "Original research presented at UC Berkeley Programming Systems Seminar.",
    },
    {
        title: "Algebraic Subtyping",
        titleref: "https://dl.acm.org/doi/10.1145/3093333.3009882",
        Date: "2025-03-12",
        venue: "Cornell PLDG Seminar",
        venueref: "https://pl.cs.cornell.edu/pldg/2025sp/",
        location: "Ithaca, NY, USA",
        locationref: "https://pl.cs.cornell.edu/#about",
        description: "Reading group presentation on the work of S. Dolan, et al.",
    },
    {
        title: "Universal Composability is Robust Compilation",
        titleref: "https://dl.acm.org/doi/full/10.1145/3698234",
        Date: "2024-03-06",
        venue: "Cornell PLDG Seminar",
        venueref: "https://pl.cs.cornell.edu/pldg/2024sp/",
        location: "Ithaca, NY, USA",
        locationref: "https://pl.cs.cornell.edu/#about",
        description: "Reading group presentation on the work of M. Patrignani, et al.",
    },
    {
        title: "A Quantale of Information",
        titleref: "https://staging.computer.org/csdl/proceedings-article/csf/2021/760700a358/1uvIdeq3OOk",
        Date: "2022-11-30",
        venue: "Cornell PLDG Seminar",
        venueref: "https://pl.cs.cornell.edu/pldg/2022fa/",
        location: "Ithaca, NY, USA",
        locationref: "https://pl.cs.cornell.edu/#about",
        description: "Reading group presentation on the work of S. Hunt, et al.",
    },
];

export default talks;