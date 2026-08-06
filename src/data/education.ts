export interface Education {
    institution: string
    degree: string
    field: string
    gpa: string
    period: string
    graduated: string
    location: string
    honors: string[]
    coursework: string[]
}

export const education: Education[] = [
    {
        institution: 'Can Tho University',
        degree: 'Bachelor',
        field: 'Information Security',
        gpa: '3.85 / 4.00',
        period: '2022 – 2026',
        graduated: '2026',
        location: 'College of Information and Communication Technology, Can Tho, Vietnam',
        honors: ['Academic Encouragement Scholarship — 6 consecutive semesters'],
        coursework: [
            'Operating Systems',
            'Computer Networks',
            'Network Security',
            'Computer Forensics',
            'Cryptography',
        ],
    },
]
