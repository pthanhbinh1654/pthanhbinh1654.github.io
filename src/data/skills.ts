export interface SkillGroup {
    category: string
    skills: { name: string; note?: string }[]
}

export const skillGroups: SkillGroup[] = [
    {
        category: 'Security Monitoring',
        skills: [
            { name: 'Windows Event Log', note: 'Security, System, PowerShell Operational' },
            { name: 'ELK Stack', note: 'Logstash, Elasticsearch, Kibana' },
            { name: 'Log Collection & Forwarding' },
            { name: 'Kibana Dashboard Design' },
        ],
    },
    {
        category: 'Cryptography & PKI',
        skills: [
            { name: 'X.509 Certificates' },
            { name: 'PKI Lifecycle Management', note: 'Request, issuance, renewal, revocation' },
            { name: 'Digital Signatures', note: 'PAdES / pyHanko' },
            { name: 'HashiCorp Vault', note: 'PKI engine + Transit engine' },
            { name: 'Argon2id KDF' },
            { name: 'AES-256-GCM' },
            { name: 'Post-Quantum Cryptography', note: 'Kyber1024, Dilithium3 (NIST PQC)' },
        ],
    },
    {
        category: 'Programming',
        skills: [
            { name: 'Python', note: 'FastAPI, Pydantic, SQLAlchemy, Jinja2' },
            { name: 'PowerShell', note: 'Automation, WinForms, Pester testing' },
            { name: 'TypeScript / JavaScript', note: 'React, Vite, Web Crypto API' },
            { name: 'SQL', note: 'PostgreSQL, MySQL' },
            { name: 'Bash' },
        ],
    },
    {
        category: 'Infrastructure & Tools',
        skills: [
            { name: 'Docker & Docker Compose' },
            { name: 'Linux (Ubuntu / systemd)' },
            { name: 'SSH / SFTP' },
            { name: 'Git' },
            { name: 'REST API development' },
            { name: 'dbt', note: 'dbt-postgres, dbt-mysql, custom macros' },
            { name: 'MinIO (S3-compatible storage)' },
            { name: 'immudb', note: 'Merkle-tree audit log' },
        ],
    },
    {
        category: 'Networking & Systems',
        skills: [
            { name: 'TCP/IP Fundamentals' },
            { name: 'Firewall & IDS/IPS Concepts' },
            { name: 'Windows Administration' },
            { name: 'WSL2' },
        ],
    },
]
