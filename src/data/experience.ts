export interface Experience {
    company: string
    role: string
    period: string
    location: string
    type: 'internship' | 'full-time' | 'part-time'
    responsibilities: string[]
    technologies: string[]
}

export const experiences: Experience[] = [
    {
        company: 'Mekosoft Software Solutions Co., Ltd.',
        role: 'Data Analyst Intern (Data Engineering Focus)',
        period: 'Jan 2026 – Apr 2026',
        location: 'Can Tho, Vietnam',
        type: 'internship',
        responsibilities: [
            'Monitored Airbyte ETL pipelines transferring data from MySQL to PostgreSQL in a Kubernetes environment',
            'Developed dbt staging models, SCD Type 2 dimension models, and fact models for approximately 3 million records across 11 source tables',
            'Validated ETL execution results and verified source-to-target data consistency',
            'Developed a Python/Jinja2 utility to automate dbt configuration generation, which became the foundation for the Kimball DimFact Builder project',
        ],
        technologies: ['dbt', 'PostgreSQL', 'MySQL', 'Python', 'Jinja2', 'Airbyte', 'Kubernetes'],
    },
]
