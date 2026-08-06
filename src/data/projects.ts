export interface Project {
    slug: string
    title: string
    tagline: string
    period: string
    status: 'ready' | 'partial' | 'roadmap'
    tags: string[]
    overview: string
    problem: string
    architecture: string // mermaid diagram string
    techStack: { layer: string; tech: string; detail: string }[]
    contribution: string[]
    implementation: string[]
    security: string[]
    challenges: string[]
    lessonsLearned: string[]
    limitations: string[]
    futureWork: string[]
    github: string
    docs?: string
    demo?: string
}

export const projects: Project[] = [
    {
        slug: 'pki-systems',
        title: 'PKI & Digital Signature Platform',
        tagline: 'X.509 certificate lifecycle management with Vault-backed key storage',
        period: 'Sep 2025 – Dec 2025',
        status: 'ready',
        tags: ['Python', 'FastAPI', 'HashiCorp Vault', 'immudb', 'PostgreSQL', 'Docker'],
        overview:
            'A web platform that lets an organization issue, manage, and revoke X.509 digital certificates and lets users digitally sign PDF documents — all backed by HashiCorp Vault for key management and immudb for tamper-evident audit logging. Built as a graduation thesis at Can Tho University.',
        problem:
            'Manual certificate management across an organization is error-prone. Certificates expire silently, revocations are not propagated reliably, and there is no audit trail that proves who signed what document at what time. This system addresses those gaps for small-to-medium organizations.',
        architecture: `graph TD
    Browser["User / Browser"]
    subgraph Application["Application Layer"]
        FE["React 18 Frontend :5173"]
        BE["FastAPI Backend :8000"]
    end
    subgraph Storage["Data & Secret Layer"]
        PG[("PostgreSQL 15 :5432")]
        RD[("Redis 7 :6379")]
        MN["MinIO S3-compatible :9000"]
        VT["HashiCorp Vault 1.15 PKI + Secrets :8200"]
        IM["immudb 1.4.1 Immutable Audit Log :3322"]
    end
    subgraph Observability["Observability"]
        PR["Prometheus :9090"]
        GR["Grafana :3001"]
    end
    Browser -->|HTTPS / REST| FE
    FE -->|REST| BE
    BE --> PG
    BE --> RD
    BE --> MN
    BE --> VT
    BE --> IM
    BE -.->|metrics| PR
    PR --> GR`,
        techStack: [
            { layer: 'Frontend', tech: 'React 18 + TypeScript + Vite', detail: 'TailwindCSS, Zustand' },
            { layer: 'Backend', tech: 'Python 3.11 + FastAPI 0.109', detail: 'SQLAlchemy 2.0, Pydantic v2, Alembic' },
            { layer: 'PKI & Secrets', tech: 'HashiCorp Vault 1.15', detail: 'PKI engine + Transit engine' },
            { layer: 'Audit', tech: 'immudb 1.4.1', detail: 'Merkle-tree ledger, append-only' },
            { layer: 'Database', tech: 'PostgreSQL 15', detail: 'Certificate metadata, user accounts' },
            { layer: 'Cache', tech: 'Redis 7', detail: 'Session management, rate limiting' },
            { layer: 'Storage', tech: 'MinIO', detail: 'S3-compatible object storage for signed PDFs' },
            { layer: 'Auth', tech: 'JWT + WebAuthn/FIDO2', detail: 'python-jose 3.3, fido2 1.1.2' },
            { layer: 'PDF Signing', tech: 'pyHanko 0.21.0', detail: 'PAdES-compatible PDF signatures' },
            { layer: 'Monitoring', tech: 'Prometheus + Grafana', detail: 'Latency p50/p95/p99, error rate' },
            { layer: 'Infrastructure', tech: 'Docker Compose', detail: '7 services, single compose file' },
        ],
        contribution: [
            'Designed and implemented the full backend API surface (auth, certificates, documents, signatures, admin)',
            'Integrated HashiCorp Vault PKI engine for certificate issuance and Transit engine for signing — private keys never exported',
            'Integrated immudb for tamper-evident audit logging using a Merkle-tree ledger',
            'Implemented JWT + Email OTP and WebAuthn/FIDO2 multi-factor authentication',
            'Set up Prometheus metrics collection and Grafana dashboards',
            'Built the Docker Compose orchestration for all 7 services',
            'Wrote Alembic database migration scripts and initialization scripts for Vault, MinIO, and PostgreSQL',
        ],
        implementation: [
            'Certificate request flow: user submits CSR → admin approves → Vault PKI engine issues X.509 → certificate stored and notified via email',
            'Signing flow: user uploads PDF → backend sends document digest to Vault Transit → Vault returns signature → pyHanko embeds signature → audit record appended to immudb',
            'Verification flow: anyone uploads signed PDF → backend re-computes digest → cross-checks Vault + immudb audit record → returns verification result',
            'Rate limiting: Redis-backed per-IP limiter on all auth endpoints (login, register, OTP)',
            'All secrets injected via .env at runtime; .env is excluded from version control',
        ],
        security: [
            'Private key material never extracted from Vault — all crypto operations execute inside Vault PKI/Transit engines',
            'immudb uses Merkle-tree ledger — audit records cannot be deleted or altered without detection',
            'Multi-factor authentication: JWT (30-min expiry) + Email OTP or WebAuthn/FIDO2 hardware key',
            'SQLAlchemy ORM prevents SQL injection; Pydantic v2 validates all API inputs',
            'Redis-backed rate limiting prevents brute-force attacks on auth endpoints',
            'All secrets managed via environment variables; no secrets committed to version control',
        ],
        challenges: [
            'Vault PKI engine configuration required careful policy design to restrict which roles could issue certificates',
            'pyHanko integration with Vault Transit required implementing a custom signing adapter because pyHanko expects direct key access',
            'immudb client library for Python required understanding the Merkle-tree verification API to implement proof validation',
        ],
        lessonsLearned: [
            'HashiCorp Vault Transit engine provides a practical way to implement signing without ever exposing key material to application code',
            'Designing tamper-evident audit logs requires understanding the trust model — immudb proves records were not altered, not that the original record was correct',
            'Docker Compose for multi-service projects requires careful dependency ordering and health checks to avoid startup race conditions',
        ],
        limitations: [
            'Batch signing is partially implemented — single document signing is complete',
            'OCSP and CRL distribution points are not yet implemented (roadmap)',
            'Not tested in a Windows ActiveDirectory environment',
            'No Kubernetes deployment manifests (roadmap)',
        ],
        futureWork: [
            'Add OCSP responder and CRL distribution point for certificate status checking',
            'eIDAS / PAdES compliance validation',
            'Kubernetes production manifests with Helm charts',
            'Advanced multi-step certificate approval workflows',
        ],
        github: 'https://github.com/pthanhbinh1654/pki_systems',
    },
    {
        slug: 'winlogcollector',
        title: 'Windows Log Collector',
        tagline: 'PowerShell agent that forwards Windows Event Logs to an ELK stack via SFTP',
        period: 'Jan 2025 – Apr 2025',
        status: 'ready',
        tags: ['PowerShell', 'ELK Stack', 'WinForms', 'SFTP', 'Docker'],
        overview:
            'WinLogCollector runs on a Windows host, incrementally collects Security, System, Application, and PowerShell Operational events, compresses them to ZIP archives, and transfers them to an ELK pipeline via SFTP. A WinForms management console provides 6 tabs for configuration, queue monitoring, and preflight checks.',
        problem:
            'Windows records thousands of security events per day — logon events, service installs, PowerShell script execution — but reading them directly in Event Viewer is impractical for analysis. Forwarding them to a searchable, visual dashboard requires a reliable collection agent that handles network outages without losing events.',
        architecture: `flowchart TD
    subgraph Agent ["Windows Agent (Host OS)"]
        A["Windows Event Log (Security, System, PowerShell)"] -->|Incremental Query| B["LogCollector Engine (RecordID Checkpoint)"]
        B -->|Write JSONL & Compress| C["ZIP Archive"]
        C -->|SFTP Port 2222| D["OpenSSH SFTP Client"]
        C -.->|Upload Failure| Q["Local Queue & Retry (Exponential Backoff)"]
        Q -.->|Exceed 20 Attempts / 14 Days| X["Quarantine Folder"]
        Q -->|Retry Transfer| D
    end
    subgraph Server ["ELK Pipeline (WSL2 Docker)"]
        D -->|Transfer File| E["SFTP Container"]
        E -->|Shared Volume| F["Sidecar Extractor"]
        F -->|Auto Unzip JSONL| G["Logstash Pipeline"]
        G -->|Parse & Index| H["Elasticsearch"]
        H -->|Visualize| I["Kibana Dashboard"]
    end`,
        techStack: [
            { layer: 'Agent', tech: 'PowerShell 5.1+', detail: 'No external dependencies, ~50 KB footprint' },
            { layer: 'GUI', tech: 'WinForms (.NET)', detail: '6-tab management console' },
            { layer: 'Transfer', tech: 'OpenSSH SFTP', detail: 'SSH host key pinning enforced' },
            { layer: 'Archive', tech: 'ZIP (System.IO.Compression)', detail: 'JSONL logs compressed per cycle' },
            { layer: 'Log Indexing', tech: 'Elasticsearch', detail: 'winlogs-* index pattern' },
            { layer: 'Pipeline', tech: 'Logstash', detail: 'Parses JSONL from sidecar extractor' },
            { layer: 'Dashboard', tech: 'Kibana', detail: 'Centralized search and visualization' },
            { layer: 'Infrastructure', tech: 'Docker Compose', detail: 'SFTP + extractor sidecar + ELK' },
            { layer: 'Testing', tech: 'Pester', detail: '8 unit tests, 0 failures' },
        ],
        contribution: [
            'Implemented the incremental collection engine using RecordID checkpointing to prevent duplicate events',
            'Built the offline queue with exponential backoff (1→2→5→15→30→60 min) and automatic quarantine after 20 failures',
            'Implemented atomic file writes (.tmp → rename) to prevent partial archives from being transferred',
            'Integrated SSH host key pinning (StrictHostKeyChecking=yes) to prevent man-in-the-middle risks',
            'Built the 6-tab WinForms management console for configuration, queue monitoring, and preflight checking',
            'Wrote 8 Pester unit tests covering state management, admin privilege detection, channel validation, archive creation, sidecar extraction, and UTC backoff logic',
        ],
        implementation: [
            'Collection engine queries Windows Event Log via Get-WinEvent with RecordID filter for incremental collection',
            'Each collection cycle: query → serialize to JSONL → compress to ZIP → attempt SFTP upload → on failure: enqueue with metadata',
            'Queue manager reads queue state from disk, applies backoff schedule, and retries on next cycle',
            'ELK setup: one-click setup-elk.ps1 creates Docker Compose environment with SFTP container, sidecar extractor, Logstash, Elasticsearch, and Kibana',
            'Logstash pipeline parses JSONL events, enriches with host metadata, and indexes into winlogs-* pattern',
        ],
        security: [
            'SSH host key pinning: agent verifies SFTP server fingerprint before every transfer',
            'Single-instance mutex: prevents two agent copies running simultaneously and causing checkpoint corruption',
            'No credentials stored in plaintext: SSH key authentication only',
            'Quarantine: files that exceed 20 retry attempts or 14 days age are isolated, not silently dropped',
            'Atomic writes: .tmp staging ensures no partial archive is ever transferred',
        ],
        challenges: [
            'Implementing the exponential backoff queue in pure PowerShell without external libraries required managing state file serialization carefully',
            'Ensuring checkpoint recovery is correct across crash scenarios required testing with simulated failures',
            'WinForms threading model required careful use of Invoke() to update UI from background collection threads',
        ],
        lessonsLearned: [
            'Checkpoint-based incremental collection is straightforward to implement but requires careful handling of edge cases like Event Log wrapping on busy systems',
            'Exponential backoff with a hard retry limit and quarantine is a more reliable pattern than infinite retry for network-dependent operations',
            'Pester unit tests for PowerShell modules are valuable, but testing file I/O and network operations requires careful mocking',
        ],
        limitations: [
            'Agent runs on Windows only (PowerShell 5.1 requirement)',
            'ELK stack requires WSL2 with Docker; no native Windows server deployment guide yet',
            'No TLS encryption for the Logstash ingest pipeline (SFTP encrypts transfer; internal pipeline does not)',
            'Collection tested on idle desktop environment; high-volume production event rates not benchmarked',
        ],
        futureWork: [
            'Windows service wrapper for background operation without GUI',
            'TLS-encrypted Logstash pipeline',
            'Kibana dashboard templates for common security use cases (logon failures, privilege escalation)',
            'Cross-platform agent (Linux auditd log collection)',
        ],
        github: 'https://github.com/pthanhbinh1654/winlogcollector',
    },
    {
        slug: 'zeroknowledge-encryption',
        title: 'Zero-Knowledge File Encryption System',
        tagline: 'Browser-side AES-256-GCM + Kyber1024 file encryption — keys never leave the device',
        period: 'May 2025 – Aug 2025',
        status: 'ready',
        tags: ['TypeScript', 'React', 'FastAPI', 'Argon2id', 'Kyber1024', 'MongoDB', 'MinIO'],
        overview:
            'A web-based encrypted file storage system where all encryption and key derivation happen in the browser. The server stores only opaque ciphertext — it cannot decrypt files even if fully compromised. Key exchange uses a hybrid Kyber1024 + X25519 scheme, and signatures use Dilithium3 + Ed25519, both NIST Post-Quantum Cryptography standards.',
        problem:
            'Mainstream cloud storage encrypts files using provider-managed keys. A breach or legal subpoena exposes all stored files. Additionally, RSA/ECC key exchange algorithms are vulnerable to quantum computers via Shor\'s algorithm — a well-funded attacker can record ciphertext today and decrypt it later after acquiring sufficient quantum compute ("Harvest Now, Decrypt Later").',
        architecture: `graph TB
    subgraph Client["Browser (Secure Zone)"]
        PW[/"User Password"/] --> KDF["Argon2id KDF (WebAssembly)"]
        KDF --> KEK["Key Encrypting Key (KEK) — never leaves RAM"]
        FILE[/"Plaintext File"/] --> ENC["AES-256-GCM + Kyber1024 Key Encapsulation"]
        KEK --> ENC
        ENC --> SIG["Dilithium3 / Ed25519 Digital Signature"]
        SIG --> OUT["Ciphertext + Encrypted DEK + Signature + Salt/IV"]
    end
    subgraph Transport["HTTPS Transport"]
        OUT -->|"Encrypted payload only"| API
    end
    subgraph Server["Docker (Blind Storage)"]
        API["FastAPI Gateway (JWT + hCaptcha)"]
        API --> MINIO["MinIO S3 Ciphertext chunks"]
        API --> MONGO["MongoDB 6.0 Salt · IV · Encrypted DEK · Signature · Metadata"]
    end`,
        techStack: [
            { layer: 'Frontend', tech: 'React 18 + TypeScript + Vite', detail: 'Nginx static serve' },
            { layer: 'Cryptography (client)', tech: 'Web Crypto API', detail: 'AES-256-GCM, hardware-accelerated' },
            { layer: 'KDF', tech: 'argon2-browser (WASM)', detail: 'Argon2id password key derivation' },
            { layer: 'Post-Quantum KEM', tech: '@noble/post-quantum', detail: 'Kyber1024 (NIST PQC standard)' },
            { layer: 'PQ Signatures', tech: '@noble/post-quantum', detail: 'Dilithium3 (NIST PQC standard)' },
            { layer: 'Classical KEM', tech: 'libsodium-wrappers', detail: 'X25519 ECDH + ChaCha20-Poly1305' },
            { layer: 'Backend', tech: 'Python 3.11 + FastAPI', detail: 'JWT + hCaptcha, async I/O' },
            { layer: 'Object Storage', tech: 'MinIO', detail: 'S3-compatible, chunked ciphertext' },
            { layer: 'Database', tech: 'MongoDB 6.0', detail: 'Salt, IV, encrypted DEK, signature metadata' },
            { layer: 'Server Crypto', tech: 'liboqs-python 0.14.0', detail: 'Open Quantum Safe library' },
            { layer: 'Infrastructure', tech: 'Docker Compose', detail: '4 services (frontend, backend, MinIO, MongoDB)' },
        ],
        contribution: [
            'Designed the client-side cryptography architecture: Argon2id key derivation → AES-256-GCM encryption → Kyber1024 key encapsulation → Dilithium3 signature',
            'Implemented chunked encrypted upload to reduce browser memory usage for large files (files are encrypted and streamed in chunks)',
            'Integrated NIST PQC algorithms (Kyber1024, Dilithium3) via @noble/post-quantum alongside classical X25519 + Ed25519 as a hybrid scheme',
            'Built the FastAPI backend with JWT authentication, hCaptcha verification, and async MinIO/MongoDB integration',
            'Implemented 2FA with TOTP and email OTP via pyotp and aiosmtplib',
            'Wrote cryptographic unit tests (frontend) and API integration tests (backend)',
        ],
        implementation: [
            'Upload: user password → Argon2id(password, salt) → KEK → Kyber1024 key encapsulation → encrypt file with AES-256-GCM → sign ciphertext with Dilithium3 → upload to server',
            'Download: retrieve encrypted DEK + ciphertext → Argon2id re-derive KEK → decrypt DEK → decrypt file → verify signature before presenting to user',
            'Server stores: ciphertext blob, salt, IV, encrypted DEK, digital signature, file metadata — never the plaintext or decryption key',
            'Chunked streaming: large files encrypted in 1 MB chunks using Web Streams API to avoid loading entire file into memory',
        ],
        security: [
            'Zero knowledge: KEK derives from user password client-side; server cannot derive it without the password',
            'Post-quantum hybrid: Kyber1024 + X25519 for key exchange ensures security against both classical and quantum attackers',
            'Argon2id parameters tuned to resist GPU brute-force attacks on derived keys',
            'Signatures (Dilithium3 + Ed25519) verify file integrity on download — tampered ciphertext is detected before decryption',
            'hCaptcha on registration prevents automated account creation for resource abuse',
            '2FA (TOTP + email OTP) required for account access',
        ],
        challenges: [
            'Integrating WASM-based Argon2id into a React streaming pipeline required careful async coordination with Web Crypto API',
            'Kyber1024 key encapsulation produces a shared secret that must be combined with X25519 for the hybrid scheme — designing this composition correctly required careful reading of the NIST PQC specification',
            'Chunked encrypted upload preserving chunk order and integrity without a server knowing plaintext required a custom protocol for chunk auth tags',
        ],
        lessonsLearned: [
            'WebAssembly cryptographic libraries (argon2-browser, @noble/post-quantum) are production-usable but require understanding their async APIs and bundle size implications',
            'Hybrid classical + post-quantum cryptography is the recommended approach during the transition period because it maintains security against both current and future attackers',
            'Client-side-only encryption shifts trust guarantees — the server is genuinely blind, but the client (browser) becomes the security boundary',
        ],
        limitations: [
            'No offline mode — requires active server connection for upload/download coordination',
            'Key recovery is not implemented — losing the password permanently loses access to encrypted files',
            'Not audited by a third-party cryptographer',
            'Folder sharing with other users requires key exchange protocol (roadmap)',
        ],
        futureWork: [
            'Secure key recovery via social secret sharing (Shamir\'s Secret Sharing)',
            'Encrypted folder sharing between users via authenticated key exchange',
            'Mobile-responsive PWA with offline caching',
            'Third-party cryptographic audit',
        ],
        github: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption',
    },
    {
        slug: 'kimball-dimfact',
        title: 'Kimball DimFact Builder',
        tagline: 'Automated dbt model generator for dimensional data warehouses',
        period: 'Jan 2026 – Apr 2026',
        status: 'ready',
        tags: ['Python', 'dbt', 'Flask', 'React', 'PostgreSQL', 'MySQL', 'Jinja2'],
        overview:
            'Dimfact is an automated Kimball dimensional modeling engine that generates dbt SQL models (staging, dimension, fact) from raw CDC table schemas. A web dashboard UI lets users browse source tables, map keys and attributes, configure SCD Type 1/2 tracking, and generate models with one click. Developed during an internship at Mekosoft Software Solutions.',
        problem:
            'Building a Kimball-style data warehouse requires writing repetitive boilerplate SQL for staging views, SCD Type 2 dimension tables (with valid_from/valid_to/is_current), and fact tables with foreign key lookups. Manual SQL writing for 3 million records across 11 source tables is error-prone and time-consuming.',
        architecture: `flowchart TD
    A["Raw CDC Tables (Airbyte / Fivetran / DBMS)"] -->|Schema Introspection| B["Dimfact Generator Engine (Web UI / dwgen)"]
    B -->|Generates Models| C["dbt Models (staging, dimensions, facts)"]
    subgraph Pipeline ["Execution Pipeline"]
        D["Staging Stage stg_*.sql"] -->|staging_schema| E["Dimension Stage dim_*.sql / SCD2"]
        E -->|dim_schema| F["Fact Stage fact_*.sql"]
        F -->|fact_schema| G["Optional Cleanup --cleanup base tables"]
    end
    C --> D
    E -.->|insert_unknown_member| F
    F -.->|fact_reprocess_queue| E`,
        techStack: [
            { layer: 'Generator', tech: 'Python 3.11 + Jinja2', detail: 'dwgen CLI and service engine' },
            { layer: 'Web Backend', tech: 'Flask', detail: 'REST API for web dashboard' },
            { layer: 'Web Frontend', tech: 'React + Vite', detail: 'Visual DW builder UI' },
            { layer: 'dbt', tech: 'dbt-postgres / dbt-mysql', detail: 'SQL model execution and testing' },
            { layer: 'Warehouses', tech: 'PostgreSQL, MySQL', detail: 'Target data warehouses' },
            { layer: 'CDC Source', tech: 'PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery', detail: 'Schema metadata connectors' },
            { layer: 'Deployment', tech: 'Linux systemd', detail: 'Background service via package_deploy.sh' },
        ],
        contribution: [
            'Developed the Jinja2-based code generator (dwgen) for staging, dimension (SCD1/SCD2), and fact models',
            'Implemented introspection of source table schemas across PostgreSQL, MySQL, SQL Server, Snowflake, and BigQuery',
            'Built the sequential pipeline orchestrator managing staging → dimension → fact execution order with process locking',
            'Developed and validated dbt models for approximately 3 million records across 11 source tables from MySQL CDC',
            'Built the Flask REST API backend for the web dashboard',
            'Validated ETL execution results by cross-checking source-to-target data consistency',
        ],
        implementation: [
            'Schema introspection: connect to source DBMS, read information_schema, extract column types, infer PKs and FKs',
            'Model generation: Jinja2 templates render staging SQL (raw → cleaned), dimension SQL (SCD1 merge or SCD2 with history), fact SQL (FK lookups to dimension surrogate keys)',
            'Pipeline orchestrator: shell script with file lock (/tmp/pipeline.lock) ensures only one pipeline runs at a time, manages execution order, logs each stage',
            'Custom dbt macros: safe_surrogate_key (deterministic hash across DBs), insert_unknown_member (prevents orphan facts), full_refresh_scd2_guard (protects SCD2 history on full refresh)',
        ],
        security: [
            'Database credentials stored in .env or profiles.yml — excluded from version control',
            'No credentials committed to the repository; db_config.example.yml is the only committed template',
            'Web dashboard runs locally (localhost) by design — not exposed to the internet without additional authentication layer',
        ],
        challenges: [
            'Ensuring SCD Type 2 history is preserved correctly during full-refresh dbt runs required a custom guard macro',
            'Late-arriving dimension records that reference a fact already loaded required the fact_reprocess_queue macro to backfill surrogate keys',
            'Source table schemas across different DBMS have inconsistent column type naming — required normalization logic in the introspection layer',
        ],
        lessonsLearned: [
            'Kimball dimensional modeling patterns (SCD1, SCD2, surrogate keys, unknown members) are well-established but require careful implementation to handle edge cases at scale',
            'dbt macros provide a powerful way to abstract repetitive SQL patterns, but they require thorough testing because bugs affect every model that uses them',
            'Code generation is effective for repetitive patterns but requires clear separation between generated code and hand-crafted customizations',
        ],
        limitations: [
            'Targets PostgreSQL and MySQL only for execution; other warehouses require additional dbt adapters',
            'Web dashboard UI designed for local use; no authentication layer built into the web server',
            'Not benchmarked above 3 million records per table',
        ],
        futureWork: [
            'dbt Cloud integration for hosted execution',
            'Snowflake and BigQuery dbt adapters',
            'Web dashboard authentication layer',
            'Automated data quality test generation alongside model generation',
        ],
        github: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean',
    },
]
