export interface Certification {
    name: string
    issuer: string
    year?: string
    url?: string
}

export const certifications: Certification[] = [
    {
        name: 'Introduction to Cybersecurity',
        issuer: 'Cisco Networking Academy',
    },
    {
        name: 'Cybersecurity Essentials',
        issuer: 'Cisco Networking Academy',
    },
    {
        name: 'Network Addressing and Basic Troubleshooting',
        issuer: 'Cisco Networking Academy',
    },
]
