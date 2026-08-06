export interface WritingItem {
    title: string
    description: string
    url: string
    type: 'readme' | 'runbook' | 'guide'
    project: string
}

export const writingItems: WritingItem[] = [
    {
        title: 'PKI Systems — Architecture & Security Design',
        description: 'Documents the full system architecture, security design principles, and API overview for the PKI platform. Covers the Vault Transit signing model, immudb audit guarantees, and MFA design.',
        url: 'https://github.com/pthanhbinh1654/pki_systems/blob/master/README.md',
        type: 'readme',
        project: 'pki-systems',
    },
    {
        title: 'WinLogCollector — ELK Setup & Configuration Guide',
        description: 'Step-by-step guide for deploying the ELK stack on WSL2 Docker, configuring Logstash pipelines, and operating the WinLogCollector agent. Includes configuration reference for all supported event channels.',
        url: 'https://github.com/pthanhbinh1654/winlogcollector/blob/main/docs/ELK_SETUP.md',
        type: 'guide',
        project: 'winlogcollector',
    },
    {
        title: 'Zero-Knowledge Encryption — Cryptographic Architecture',
        description: 'Explains the cryptographic design: Argon2id key derivation, AES-256-GCM encryption, Kyber1024 key encapsulation, and Dilithium3 signatures. Covers the hybrid classical + post-quantum scheme rationale.',
        url: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption/blob/main/README.md',
        type: 'readme',
        project: 'zeroknowledge-encryption',
    },
    {
        title: 'Kimball DimFact Builder — System Guide & API Contract',
        description: 'Runbook and API reference for the Dimfact pipeline. Covers dbt profile configuration, pipeline execution order, SCD Type 2 macro usage, and the web dashboard API contract.',
        url: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean/blob/main/docs/SYSTEM_GUIDE.md',
        type: 'runbook',
        project: 'kimball-dimfact',
    },
]
