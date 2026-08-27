import type { Locale } from '@/i18n/translations'

export interface Project {
  slug: string
  title: string
  tagline: string
  period: string
  category: string
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

const projectsEn: Project[] = [
  {
    slug: 'kimball-dimfact',
    title: 'Kimball DimFact Builder',
    tagline: 'Automated dbt model generator for dimensional data warehouses from CDC source schemas',
    period: 'Jan 2026 – Apr 2026',
    category: 'Post-Internship Tool',
    status: 'ready',
    tags: ['Python', 'dbt', 'Flask', 'React', 'PostgreSQL', 'MySQL', 'Jinja2'],
    overview:
      'A lightweight automation tool built from practical needs during a data engineering internship at Mekosoft Software Solutions. It automates Kimball dimensional modeling by introspecting CDC source schemas and generating standardized dbt SQL models (staging, SCD Type 1/2 dimensions, and fact tables). A web dashboard lets developers visualize source tables, configure change tracking, map foreign keys, and generate ready-to-run dbt models with one click.',
    problem:
      'Building Kimball-style data warehouses requires writing repetitive boilerplate SQL for staging views (data cleansing), SCD Type 2 dimension tables (valid_from, valid_to, and is_current flags), and fact tables with surrogate key lookups. Writing this manually across numerous CDC tables during data pipeline projects is tedious, error-prone, and slows down sprint delivery.',
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
      { layer: 'Generator Engine', tech: 'Python 3.11 + Jinja2', detail: 'dwgen CLI and model generation core' },
      { layer: 'Web Backend', tech: 'Flask', detail: 'REST API for metadata browsing and model generation' },
      { layer: 'Web Frontend', tech: 'React + Vite', detail: 'Visual mapping and configuration dashboard' },
      { layer: 'Transformation', tech: 'dbt (dbt-postgres / dbt-mysql)', detail: 'SQL model compilation and data testing' },
      { layer: 'Target Warehouses', tech: 'PostgreSQL, MySQL', detail: 'Relational data warehouse targets' },
      { layer: 'Source Connectors', tech: 'information_schema introspection', detail: 'Metadata extraction for MySQL, Postgres, SQL Server, Snowflake, BigQuery' },
      { layer: 'Deployment', tech: 'Linux systemd / shell scripts', detail: 'Background service via package_deploy.sh' },
    ],
    contribution: [
      'Developed the Jinja2 code generator (dwgen CLI) to render staging views, dimension models (SCD1/SCD2), and fact models',
      'Built database schema introspection querying information_schema across PostgreSQL, MySQL, SQL Server, Snowflake, and BigQuery',
      'Authored reusable dbt macros: safe_surrogate_key (deterministic cross-DB hash), insert_unknown_member (prevents orphan facts), and full_refresh_scd2_guard (preserves SCD2 history during full refresh)',
      'Built the Flask REST API and React UI allowing developers to visually inspect schemas and trigger model generation',
      'Implemented a sequential pipeline orchestrator shell script with file-based locking (/tmp/pipeline.lock) to manage execution order',
      'Tested and validated generated dbt models against an internship dataset of ~3 million CDC records across 11 source tables',
    ],
    implementation: [
      'Schema introspection: connects to source DBMS, reads column definitions from information_schema, detects data types, and infers PK/FK relationships',
      'Model templating: Jinja2 templates generate clean SQL — staging (casting & renaming), dimension (SCD1 merge or SCD2 with temporal ranges), and fact (FK lookups to surrogate keys)',
      'Pipeline execution: shell orchestrator runs dbt models in strict dependency order (staging → dim → fact) and logs step outcomes',
      'Edge-case handling: custom macros ensure deterministic surrogate key hashing and protect historical dimension versions against accidental wipeout',
    ],
    security: [
      'Database credentials configured via .env and profiles.yml — excluded from version control',
      'No production connection strings or credentials committed to the repository; db_config.example.yml provided as template only',
      'Dashboard intended for local development use on localhost without public internet exposure',
    ],
    challenges: [
      'Preserving SCD Type 2 historical records during dbt full-refresh runs required authoring a custom protection guard macro',
      'Handling late-arriving dimension records referenced by previously loaded fact rows required an asynchronous reprocess queue macro',
      'Column type naming differences across DBMS vendors required building a normalized type-mapping layer in the introspection engine',
    ],
    lessonsLearned: [
      'Automating boilerplate code generation saves significant time during data engineering projects while enforcing consistent modeling patterns',
      'dbt macros provide great abstraction power, but require rigorous unit testing since bugs propagate to every generated model',
      'Clear boundaries between generated boilerplate and manual model customization are essential for long-term project maintainability',
    ],
    limitations: [
      'Model execution tested primarily with dbt-postgres and dbt-mysql; other adapters require profile configuration',
      'Web dashboard UI designed for developer local use; no multi-user role-based authentication built-in',
      'Evaluated on single-node datasets up to 3 million records per table',
    ],
    futureWork: [
      'Add dedicated adapter support for Snowflake and Google BigQuery in the generator CLI',
      'Automate generation of dbt data quality test suites alongside SQL models',
      'Build direct integration with dbt Cloud API for hosted execution',
    ],
    github: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean',
  },
  {
    slug: 'pki-systems',
    title: 'PKI & Digital Signature Platform',
    tagline: 'X.509 certificate lifecycle management and PAdES PDF signing backed by HashiCorp Vault & immudb',
    period: 'Sep 2025 – Dec 2025',
    category: 'Graduation Thesis',
    status: 'ready',
    tags: ['Python', 'FastAPI', 'HashiCorp Vault', 'immudb', 'PostgreSQL', 'Docker'],
    overview:
      'Graduation thesis for the Bachelor of Information Security degree at Can Tho University. The project designs and implements an internal PKI management and digital signature web platform for organizations: issuing, managing, and revoking X.509 digital certificates and digitally signing PDF documents (PAdES standard). HashiCorp Vault is used for secure CA key management and cryptographic signing (private keys never leave Vault), and immudb (Merkle-tree ledger) provides tamper-evident audit logging for non-repudiation.',
    problem:
      'Manual certificate management in organizations is prone to forgotten renewals and service outages. Private keys are frequently stored insecurely on application servers, and standard databases lack cryptographic proof that audit records have not been altered or deleted. This system provides a unified, secure internal PKI and document signing platform with verifiable audit trails.',
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
      { layer: 'Frontend', tech: 'React 18 + TypeScript + Vite', detail: 'TailwindCSS, Zustand state management' },
      { layer: 'Backend', tech: 'Python 3.11 + FastAPI 0.109', detail: 'SQLAlchemy 2.0, Pydantic v2, Alembic migrations' },
      { layer: 'PKI & Key Management', tech: 'HashiCorp Vault 1.15', detail: 'PKI secrets engine + Transit signing engine' },
      { layer: 'Immutable Audit', tech: 'immudb 1.4.1', detail: 'Cryptographic Merkle-tree ledger, append-only' },
      { layer: 'Database', tech: 'PostgreSQL 15', detail: 'Certificate metadata, accounts, and application state' },
      { layer: 'Cache & Rate Limiting', tech: 'Redis 7', detail: 'Session tokens, IP-based request throttling' },
      { layer: 'Object Storage', tech: 'MinIO', detail: 'S3-compatible storage for signed PDF documents' },
      { layer: 'Authentication', tech: 'JWT + WebAuthn/FIDO2 + Email OTP', detail: 'python-jose, fido2, pyotp' },
      { layer: 'PDF Signing Engine', tech: 'pyHanko 0.21.0', detail: 'PAdES-compliant digital signatures' },
      { layer: 'Monitoring', tech: 'Prometheus + Grafana', detail: 'API latency percentiles (p50/p95/p99) and request counters' },
      { layer: 'Orchestration', tech: 'Docker Compose', detail: 'Multi-container deployment across 7 services' },
    ],
    contribution: [
      'Designed and built the full FastAPI backend API surface (auth, certificate requests, verification, document signing, admin)',
      'Integrated HashiCorp Vault PKI engine for X.509 issuance and Transit engine for cryptographic signing — private keys never leave Vault RAM',
      'Integrated immudb Merkle-tree ledger to log all certificate issuance, revocation, and document signing events with tamper evidence',
      'Implemented multi-factor authentication: JWT session tokens with Email OTP and WebAuthn/FIDO2 hardware security key support',
      'Constructed a custom pyHanko signing adapter interfacing directly with Vault Transit for PAdES document signatures',
      'Orchestrated all 7 services via Docker Compose with automated initialization scripts for Vault, MinIO, PostgreSQL, and immudb',
      'Instrumented Prometheus metrics collection and designed Grafana monitoring dashboards for operational visibility',
    ],
    implementation: [
      'Certificate lifecycle: user submits CSR → administrator reviews & approves → Vault PKI engine issues X.509 certificate → metadata stored in PostgreSQL and audit record written to immudb',
      'PDF signing flow: user uploads document → backend computes SHA-256 digest → sends digest to Vault Transit engine → Vault returns signature → pyHanko embeds PAdES signature → document stored in MinIO and event logged in immudb',
      'Signature verification: user uploads signed PDF → pyHanko parses signature dictionary and validates certificate chain against internal CA → cross-references immudb ledger record',
      'Security controls: Redis rate limiting on sensitive endpoints, Pydantic strict schema validation, and complete runtime secret injection via .env',
    ],
    security: [
      'Private key protection: CA private key and signing keys reside exclusively inside Vault; no key material is written to application disk or memory',
      'Tamper-evident audit trail: immudb Merkle-tree ledger ensures audit logs cannot be modified or truncated without immediate detection',
      'MFA & session security: short-lived JWTs (30-min expiration) paired with TOTP/Email OTP or hardware FIDO2 keys',
      'Defense in depth: ORM parameterized queries prevent SQL injection, Pydantic eliminates parameter tampering, and Redis throttles brute-force attempts',
      'Secrets isolation: all tokens, database credentials, and Vault master keys are configured via environment variables and excluded from Git',
    ],
    challenges: [
      'Configuring Vault PKI policies and token permissions required fine-grained access control so application workers could sign without full admin rights',
      'Interfacing pyHanko with Vault Transit required writing a custom signer implementation because pyHanko expects local private key access by default',
      'Handling container startup dependencies across 7 services required writing robust health checks and retry loops to prevent race conditions during bootstrap',
    ],
    lessonsLearned: [
      'Hardware and secret-store based signing (like Vault Transit) provides a clean security boundary, keeping application vulnerabilities from compromising root keys',
      'Immutable ledgers (immudb) are practical for compliance and non-repudiation, but developers must understand that ledgers prove integrity, not initial data correctness',
      'Docker Compose orchestration for multi-service architectures requires structured initialization scripts and deterministic service dependency chains',
    ],
    limitations: [
      'Optimized for single-document signing workflows; batch signing pipeline is in roadmap phase',
      'Online Certificate Status Protocol (OCSP) responder and CRL distribution points are planned for future releases',
      'Tested in a simulated container environment; enterprise Active Directory integration not yet implemented',
    ],
    futureWork: [
      'Implement OCSP responder and automated CRL publishing for real-time revocation checking',
      'Add Kubernetes Helm charts for cloud-native deployment',
      'Implement multi-party signature approval workflows for enterprise document signing',
    ],
    github: 'https://github.com/pthanhbinh1654/pki_systems',
  },
  {
    slug: 'zeroknowledge-encryption',
    title: 'Zero-Knowledge File Encryption System',
    tagline: 'Browser-side AES-256-GCM + Kyber1024 zero-knowledge file encryption — keys never leave client RAM',
    period: 'May 2025 – Aug 2025',
    category: 'Course Project',
    status: 'ready',
    tags: ['TypeScript', 'React', 'FastAPI', 'Argon2id', 'Kyber1024', 'MongoDB', 'MinIO'],
    overview:
      'A university course project on applied cryptography and secure web systems. It explores client-side Zero-Knowledge encryption combined with post-quantum cryptography standards. All key derivation (Argon2id WASM) and file encryption (AES-256-GCM via Web Crypto API) occur entirely in the user browser. The system investigates a hybrid key exchange scheme pairing Kyber1024 (NIST PQC standard) with classical X25519, alongside Dilithium3 + Ed25519 digital signatures. The backend acts as blind storage, storing only opaque ciphertext blobs on MinIO and public metadata in MongoDB.',
    problem:
      'Traditional cloud storage providers encrypt files with server-managed keys, leaving user data vulnerable to server breaches, rogue administrators, or regulatory subpoenas. Furthermore, classical public-key cryptography (RSA, ECC) is vulnerable to future quantum decryption ("Harvest Now, Decrypt Later"). This project implements client-side encryption where the server is genuinely blind to plaintext and keys.',
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
      { layer: 'Frontend UI', tech: 'React 18 + TypeScript + Vite', detail: 'Client-side SPA with streaming encryption pipeline' },
      { layer: 'Symmetric Crypto', tech: 'Web Crypto API (SubtleCrypto)', detail: 'Hardware-accelerated AES-256-GCM' },
      { layer: 'Key Derivation', tech: 'argon2-browser (WASM)', detail: 'Memory-hard Argon2id password-to-KEK derivation' },
      { layer: 'Post-Quantum KEM', tech: '@noble/post-quantum', detail: 'Kyber1024 (NIST ML-KEM standard)' },
      { layer: 'Post-Quantum Signatures', tech: '@noble/post-quantum', detail: 'Dilithium3 (NIST ML-DSA standard)' },
      { layer: 'Classical Crypto', tech: 'libsodium-wrappers', detail: 'X25519 ECDH + ChaCha20-Poly1305 fallback' },
      { layer: 'Backend Gateway', tech: 'Python 3.11 + FastAPI', detail: 'Async blind storage gateway with JWT auth' },
      { layer: 'Object Storage', tech: 'MinIO', detail: 'S3-compatible storage for encrypted ciphertext blobs' },
      { layer: 'Metadata Database', tech: 'MongoDB 6.0', detail: 'Stores salt, IV, encrypted DEK, signatures, file metadata' },
      { layer: 'Containerization', tech: 'Docker Compose', detail: 'Orchestrates frontend, backend, MinIO, and MongoDB' },
    ],
    contribution: [
      'Designed the client-side cryptographic pipeline: Argon2id KDF → AES-256-GCM encryption → Kyber1024 key encapsulation → Dilithium3 signature generation',
      'Implemented chunked encrypted streaming using the Web Streams API to encrypt files in 1 MB slices, avoiding browser memory exhaustion',
      'Constructed a hybrid post-quantum key encapsulation scheme combining Kyber1024 with X25519 for dual-layer security',
      'Built the FastAPI blind storage backend with async MinIO object uploads and MongoDB metadata persistence',
      'Added 2FA account protection via TOTP and email OTP, alongside hCaptcha bot protection on registration',
      'Wrote cryptographic test cases verifying key derivation determinism, signature verification, and decryption integrity',
    ],
    implementation: [
      'Encryption flow: user enters password → Argon2id derives Key Encrypting Key (KEK) in WASM memory → browser generates random Data Encryption Key (DEK) → encrypts file with AES-256-GCM → wraps DEK using KEK & Kyber1024 → signs ciphertext with Dilithium3 → uploads ciphertext and metadata package',
      'Decryption flow: client downloads ciphertext and encrypted DEK → re-derives KEK from user password → un緻wraps DEK → verifies Dilithium3 signature → decrypts ciphertext with AES-256-GCM → triggers browser download',
      'Zero-knowledge boundary: the server stores only ciphertext, salt, IV, wrapped DEK, and signature — never the master password, KEK, DEK, or plaintext',
    ],
    security: [
      'Zero-Knowledge architecture: cryptographic keys are derived and held exclusively in browser volatile memory; the server is mathematically blind',
      'Hybrid post-quantum defense: pairing Kyber1024 with X25519 protects data confidentiality against current eavesdroppers and future quantum computers',
      'GPU-resistant KDF: tuned Argon2id memory parameters raise the computational cost of brute-forcing user passwords from leaked salts',
      'Integrity verification: Dilithium3/Ed25519 digital signatures ensure any ciphertext tampering is detected before decryption is attempted',
    ],
    challenges: [
      'Coordinating WebAssembly Argon2id computation with Web Crypto API asynchronous streams without freezing the UI thread required careful web worker chunking',
      'Composing Kyber1024 shared secrets with classical X25519 secrets into a single key derivation pipeline required strict alignment with NIST PQC specifications',
      'Managing authentication tags across multiple encrypted chunks to prevent chunk reordering or truncation attacks',
    ],
    lessonsLearned: [
      'WebAssembly cryptography in modern browsers is viable for real-world file encryption but requires memory-conscious chunk streaming',
      'Hybrid cryptography (combining classical and post-quantum algorithms) is the recommended path to guard against both existing and emerging cryptanalytic threats',
      'Zero-Knowledge architectures shift security responsibility entirely to client endpoint integrity and secure password habits',
    ],
    limitations: [
      'Academic prototype created for cryptography coursework; not evaluated by a commercial security audit firm',
      'No password recovery mechanism: losing the user password results in permanent, irrecoverable loss of file data',
      'Requires active network connectivity to negotiate metadata with the blind storage server',
    ],
    futureWork: [
      'Implement secure key recovery using Shamir Secret Sharing across trusted peer devices',
      'Add end-to-end encrypted folder sharing between users via authenticated public key exchange',
      'Optimize Web Worker multi-threading for large file throughput',
    ],
    github: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption',
  },
  {
    slug: 'winlogcollector',
    title: 'Windows Log Collector',
    tagline: 'Lightweight PowerShell agent for incremental Windows Event Log collection to ELK via SFTP',
    period: 'Jan 2025 – Apr 2025',
    category: 'Course Project',
    status: 'ready',
    tags: ['PowerShell', 'ELK Stack', 'WinForms', 'SFTP', 'Docker'],
    overview:
      'A university course project in network security and operating system monitoring. WinLogCollector is a lightweight, pure PowerShell agent (~50 KB footprint, zero third-party dependencies) that runs on Windows endpoints, incrementally collects Windows Event Logs (Security, System, Application, PowerShell Operational), compresses them into ZIP archives, and securely transfers them to an ELK stack on Docker (WSL2) via SFTP. It includes an offline retry queue with exponential backoff and a 6-tab WinForms GUI management console.',
    problem:
      'Monitoring security events across Windows workstations (logons, privilege use, process creation, PowerShell execution) using standard Event Viewer is slow and isolated. Forwarding event logs to a centralized ELK stack in lab or test environments requires a lightweight collection mechanism that avoids heavy third-party software agents, handles intermittent network disconnects reliably, and prevents duplicate log ingestion.',
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
      { layer: 'Collection Agent', tech: 'PowerShell 5.1+', detail: 'Pure built-in PowerShell, ~50 KB script footprint' },
      { layer: 'Management Console', tech: 'WinForms (.NET)', detail: '6-tab GUI for channels, queue monitoring, and preflight checks' },
      { layer: 'Transport', tech: 'OpenSSH SFTP', detail: 'Key-based auth with strict SSH host key fingerprint pinning' },
      { layer: 'Archiving', tech: 'System.IO.Compression (ZIP)', detail: 'JSONL events compressed per collection cycle' },
      { layer: 'Log Storage & Search', tech: 'Elasticsearch', detail: 'winlogs-* time-series index pattern' },
      { layer: 'Ingestion Pipeline', tech: 'Logstash + Extractor sidecar', detail: 'Extracts archives, parses JSONL, enriches event fields' },
      { layer: 'Visualization', tech: 'Kibana', detail: 'Search interface and security event monitoring dashboards' },
      { layer: 'Environment', tech: 'Docker Compose (WSL2)', detail: 'Unified deployment of SFTP, sidecar, and ELK stack' },
      { layer: 'Automated Testing', tech: 'Pester 5.x', detail: '8 unit tests verifying state, privilege check, and retry logic' },
    ],
    contribution: [
      'Implemented the incremental collection engine using RecordID checkpointing to ensure zero duplicated or skipped events',
      'Built a reliable offline queue with exponential backoff (1→2→5→15→30→60 min) and quarantine isolation after 20 consecutive failures',
      'Integrated atomic file write operations (.tmp staging → atomic rename) preventing partial or corrupted archives during network transfers',
      'Configured OpenSSH SFTP key-based authentication with strict host key pinning (StrictHostKeyChecking=yes) against MITM risks',
      'Developed a 6-tab WinForms management GUI for event channel selection, queue state inspection, and preflight environment validation',
      'Authored 8 automated Pester unit tests covering state serialization, channel validation, archive integrity, and UTC backoff calculations',
    ],
    implementation: [
      'Collection loop: queries Windows Event Log channels via Get-WinEvent using RecordID filters for incremental harvesting',
      'Cycle workflow: query events → serialize to JSONL → compress into timestamped ZIP → attempt SFTP upload → on failure: stage into local offline queue with metadata',
      'Queue processor: reads disk-persisted state, checks retry schedules against exponential backoff rules, and re-attempts upload on subsequent cycles',
      'ELK orchestration: one-click setup-elk.ps1 initializes Docker Compose running SFTP server, sidecar extractor, Logstash, Elasticsearch, and Kibana',
      'Logstash processing: parses structured JSONL, maps Windows event IDs (e.g., 4624 logon, 4688 process creation), and indexes into winlogs-*',
    ],
    security: [
      'Host key pinning: agent validates the SFTP server host fingerprint before every upload session to prevent MITM interception',
      'Single-instance mutex: ensures only one instance of the collection agent runs at any time, preventing checkpoint corruption',
      'No plaintext credentials: authentication relies solely on SSH private keys with appropriate file system permissions',
      'Quarantine isolation: problematic archives exceeding 20 retries or 14 days are isolated for analyst review rather than dropped silently',
      'Atomic staging: writes occur via temporary files (.tmp) to ensure partial archives are never transmitted or parsed',
    ],
    challenges: [
      'Implementing reliable exponential backoff and queue serialization in pure PowerShell without external packages required careful state handling',
      'Ensuring accurate RecordID checkpoint recovery across unexpected machine shutdown scenarios required writing simulated crash test cases',
      'Updating the WinForms GUI from background collection threads required proper Invoke() thread marshaling',
    ],
    lessonsLearned: [
      'RecordID-based incremental harvesting is efficient on Windows but requires handling event log wrapping on high-volume endpoints',
      'Exponential backoff with quarantine limits provides far greater operational reliability than unbounded infinite retries',
      'Pester unit tests for PowerShell modules significantly increase reliability when handling file I/O and state transitions',
    ],
    limitations: [
      'Designed for Windows endpoints running PowerShell 5.1 or later',
      'Requires Administrator privileges on the host to read the Security event channel',
      'ELK stack setup runs via Docker in WSL2; designed for lab, educational, and testing environments rather than enterprise scale',
      'Internal container-to-container pipeline does not enforce mTLS (external SFTP transport is fully encrypted)',
    ],
    futureWork: [
      'Package agent as a native Windows Service for headless background operation without GUI dependency',
      'Add TLS encryption to the internal Logstash ingestion channel',
      'Develop pre-built Kibana dashboard templates for common MITRE ATT&CK Windows detection rules',
    ],
    github: 'https://github.com/pthanhbinh1654/winlogcollector',
  },
]

const projectsVi: Project[] = [
  {
    slug: 'kimball-dimfact',
    title: 'Kimball DimFact Builder — Công cụ sinh mã dbt Kho Dữ liệu',
    tagline: 'Công cụ tự động hóa sinh mô hình dbt SQL (Staging, SCD1/SCD2 Dim, Fact) từ cấu trúc bảng nguồn CDC',
    period: '01/2026 – 04/2026',
    category: 'Công cụ sau thực tập',
    status: 'ready',
    tags: ['Python', 'dbt', 'Flask', 'React', 'PostgreSQL', 'MySQL', 'Jinja2'],
    overview:
      'Công cụ hỗ trợ tự động hóa việc sinh mã mô hình dữ liệu đa chiều theo chuẩn Kimball cho dbt, được đúc kết và phát triển từ nhu cầu thực tế trong quá trình thực tập Kỹ thuật dữ liệu tại Mekosoft Software Solutions. Hệ thống gồm một engine CLI (Python 3.11 + Jinja2) và giao diện web dashboard gọn nhẹ (Flask + React) cho phép phân tích metadata bảng nguồn CDC, ánh xạ khóa/thuộc tính, cấu hình theo dõi lịch sử SCD Loại 1 / Loại 2 và sinh toàn bộ mã dbt SQL (staging, dim, fact) chuẩn chỉnh chỉ với một cú nhấp chuột.',
    problem:
      'Trong quá trình xây dựng kho dữ liệu đa chiều theo chuẩn Kimball, kỹ sư dữ liệu thường phải viết hàng loạt mã SQL lặp lại (boilerplate) cho các tầng staging (làm sạch dữ liệu), bảng dimension SCD Loại 2 (quản lý valid_from, valid_to, is_current) và bảng fact tra cứu surrogate key. Việc viết tay thủ công trên nhiều bảng nguồn CDC rất tốn thời gian và dễ phát sinh sai sót logic.',
    architecture: `flowchart TD
    A["Bảng nguồn thô CDC (Airbyte / Fivetran / DBMS)"] -->|Phân tích Schema Introspection| B["Engine Sinh mã Dimfact (Web UI / dwgen)"]
    B -->|Tự động sinh mã| C["Mô hình dbt (Staging, Dimensions, Facts)"]
    subgraph Pipeline ["Đường ống Thực thi Tuần tự"]
        D["Tầng Staging stg_*.sql"] -->|staging_schema| E["Tầng Dimension dim_*.sql / SCD2"]
        E -->|dim_schema| F["Tầng Fact fact_*.sql"]
        F -->|fact_schema| G["Dọn dẹp Tùy chọn --cleanup"]
    end
    C --> D
    E -.->|insert_unknown_member| F
    F -.->|fact_reprocess_queue| E`,
    techStack: [
      { layer: 'Engine Sinh mã', tech: 'Python 3.11 + Jinja2', detail: 'CLI dwgen và bộ sinh mã model theo template Jinja2' },
      { layer: 'Backend Web', tech: 'Flask', detail: 'REST API duyệt metadata cấu trúc bảng và kích hoạt sinh mã' },
      { layer: 'Frontend Web', tech: 'React + Vite', detail: 'Giao diện trực quan cấu hình ánh xạ bảng và thuộc tính SCD' },
      { layer: 'Biến đổi dữ liệu', tech: 'dbt (dbt-postgres / dbt-mysql)', detail: 'Biên dịch mô hình SQL và kiểm thử chất lượng dữ liệu' },
      { layer: 'Kho dữ liệu Đích', tech: 'PostgreSQL, MySQL', detail: 'Cơ sở dữ liệu kho dữ liệu quan hệ' },
      { layer: 'Bộ đọc Schema Nguồn', tech: 'information_schema introspection', detail: 'Đọc metadata từ MySQL, PostgreSQL, SQL Server, Snowflake, BigQuery' },
      { layer: 'Triển khai Dịch vụ', tech: 'Linux systemd / Shell script', detail: 'Chạy nền service qua kịch bản package_deploy.sh' },
    ],
    contribution: [
      'Phát triển engine sinh mã nguồn dựa trên Jinja2 (dwgen CLI) để tự động hóa việc tạo model staging, dimension (SCD1/SCD2) và fact',
      'Xây dựng bộ phân tích schema (introspection) đọc thông tin metadata từ information_schema trên PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery',
      'Viết các dbt macro tùy biến giải quyết bài toán thực tế: safe_surrogate_key (tạo hash key đồng nhất), insert_unknown_member (bản ghi mặc định chống lỗi fact mồ côi), full_refresh_scd2_guard (bảo vệ lịch sử SCD2 khi chạy --full-refresh)',
      'Xây dựng giao diện web dashboard gọn nhẹ trên nền Flask REST API và React giúp trực quan hóa cấu trúc bảng và sinh code dbt nhanh chóng',
      'Thiết kế script shell điều phối thực thi pipeline theo thứ tự phụ thuộc (staging → dim → fact) có cơ chế file lock chống chạy đè tiến trình',
      'Áp dụng thử nghiệm và kiểm thử trên tập dữ liệu CDC thực tế (~3 triệu bản ghi từ 11 bảng nguồn) trong kỳ thực tập',
    ],
    implementation: [
      'Phân tích cấu trúc schema: Kết nối tới DBMS nguồn, đọc information_schema, trích xuất kiểu dữ liệu cột, tự động suy luận khóa chính và khóa ngoại',
      'Sinh mô hình dữ liệu: Template Jinja2 render mã staging SQL (làm sạch dữ liệu thô), dimension SQL (hợp nhất SCD1 hoặc lưu lịch sử SCD2), fact SQL (tra cứu khóa thay thế surrogate keys của bảng chiều)',
      'Điều phối pipeline: Shell script tích hợp khóa tệp (/tmp/pipeline.lock) bảo đảm chỉ có một pipeline chạy tại một thời điểm, kiểm soát thứ tự thực thi và ghi log từng bước',
      'Xử lý trường hợp biên: Các custom macro bảo đảm tính xác định khi hash surrogate key và bảo vệ lịch sử dimension không bị xóa trắng ngoài ý muốn',
    ],
    security: [
      'Thông tin kết nối cơ sở dữ liệu được quản lý trong file .env hoặc profiles.yml — loại trừ hoàn toàn khỏi Git',
      'Không lưu mật khẩu vào mã nguồn; tệp db_config.example.yml là mẫu cấu hình duy nhất được commit',
      'Web dashboard được thiết kế chạy nội bộ trên localhost phục vụ việc phát triển — không mở công khai ra Internet',
    ],
    challenges: [
      'Bảo toàn lịch sử thay đổi SCD Loại 2 khi chạy lệnh full-refresh trên dbt đòi hỏi viết macro tùy biến bảo vệ chuyên dụng',
      'Xử lý các bản ghi bảng chiều đến muộn (late-arriving dimensions) mà bảng fact đã nạp đòi hỏi cơ chế fact_reprocess_queue để cập nhật lại khóa thay thế',
      'Quy ước đặt tên kiểu dữ liệu cột không đồng nhất giữa các hệ quản trị DBMS đòi hỏi tầng chuẩn hóa kiểu dữ liệu chặt chẽ trong bộ phân tích schema',
    ],
    lessonsLearned: [
      'Tự động hóa sinh mã boilerplate giúp tiết kiệm đáng kể thời gian trong các dự án dữ liệu và bảo đảm sự nhất quán trong toàn bộ kho dữ liệu',
      'dbt macros mang lại khả năng trừu tượng hóa cao cho SQL, nhưng cần kiểm thử kỹ vì lỗi trong macro sẽ ảnh hưởng đến toàn bộ model sử dụng nó',
      'Phân định rõ ràng giữa mã được sinh tự động và phần tùy biến thủ công là yếu tố sống còn để duy trì dự án lâu dài',
    ],
    limitations: [
      'Mô hình thực thi được kiểm thử chính trên PostgreSQL và MySQL; các kho dữ liệu khác cần cấu hình profile dbt tương ứng',
      'Giao diện dashboard phục vụ môi trường phát triển cục bộ của developer; chưa có hệ thống phân quyền đa người dùng',
      'Được đánh giá và kiểm thử trên tập dữ liệu đơn node quy mô khoảng 3 triệu bản ghi mỗi bảng',
    ],
    futureWork: [
      'Bổ sung adapter dbt cho Snowflake và Google BigQuery trong bộ công cụ CLI',
      'Tự động hóa sinh các bộ kiểm thử chất lượng dữ liệu (dbt test) đồng thời khi sinh model',
      'Tích hợp trực tiếp với API của dbt Cloud phục vụ môi trường thực thi trên cloud',
    ],
    github: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean',
  },
  {
    slug: 'pki-systems',
    title: 'Nền tảng Quản lý PKI & Ký số Điện tử',
    tagline: 'Quản lý vòng đời chứng chỉ số X.509 và ký số văn bản PDF chuẩn PAdES bảo mật với HashiCorp Vault & immudb',
    period: '09/2025 – 12/2025',
    category: 'Khóa luận tốt nghiệp',
    status: 'ready',
    tags: ['Python', 'FastAPI', 'HashiCorp Vault', 'immudb', 'PostgreSQL', 'Docker'],
    overview:
      'Khóa luận tốt nghiệp Cử nhân chuyên ngành An toàn thông tin tại Đại học Cần Thơ. Đề tài nghiên cứu và xây dựng nền tảng web quản lý hạ tầng khóa công khai (PKI) nội bộ cho tổ chức: phát hành, quản lý và thu hồi chứng chỉ số X.509, đồng thời hỗ trợ người dùng ký số văn bản PDF chuẩn PAdES. Hệ thống sử dụng HashiCorp Vault làm trung tâm quản lý chứng chỉ CA và thực hiện ký mật mã (khóa riêng không bao giờ bị xuất ra ngoài) và immudb (cơ sở dữ liệu sổ cái Merkle-tree) để lưu trữ nhật ký kiểm toán bất biến chống chối bỏ.',
    problem:
      'Nhiều tổ chức vừa và nhỏ gặp khó khăn trong việc quản lý chứng chỉ số nội bộ: quy trình thủ công dễ dẫn đến quên gia hạn làm gián đoạn dịch vụ, khóa riêng của người dùng hoặc CA thường bị lưu trữ không an toàn trên máy chủ ứng dụng, và các cơ sở dữ liệu thông thường thiếu bằng chứng mật mã chứng minh nhật ký kiểm toán không bị xóa sửa. Hệ thống cung cấp giải pháp toàn diện, an toàn cho hạ tầng PKI nội bộ và ký số văn bản.',
    architecture: `graph TD
    Browser["Người dùng / Trình duyệt"]
    subgraph Application["Tầng Ứng dụng (Application Layer)"]
        FE["React 18 Frontend :5173"]
        BE["FastAPI Backend :8000"]
    end
    subgraph Storage["Tầng Dữ liệu & Quản lý Bí mật"]
        PG[("PostgreSQL 15 :5432")]
        RD[("Redis 7 :6379")]
        MN["MinIO S3-compatible :9000"]
        VT["HashiCorp Vault 1.15 PKI + Secrets :8200"]
        IM["immudb 1.4.1 Immutable Audit Log :3322"]
    end
    subgraph Observability["Tầng Giám sát & Đo lường"]
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
      { layer: 'Giao diện Web', tech: 'React 18 + TypeScript + Vite', detail: 'TailwindCSS, Zustand quản lý trạng thái' },
      { layer: 'Cổng Backend API', tech: 'Python 3.11 + FastAPI 0.109', detail: 'SQLAlchemy 2.0, Pydantic v2, migration Alembic' },
      { layer: 'PKI & Quản lý Khóa', tech: 'HashiCorp Vault 1.15', detail: 'PKI secrets engine + Transit signing engine' },
      { layer: 'Kiểm toán Bất biến', tech: 'immudb 1.4.1', detail: 'Sổ cái Merkle-tree ledger mật mã, append-only' },
      { layer: 'Cơ sở dữ liệu', tech: 'PostgreSQL 15', detail: 'Lưu trữ metadata chứng chỉ, tài khoản và trạng thái' },
      { layer: 'Cache & Rate Limiting', tech: 'Redis 7', detail: 'Quản lý phiên, giới hạn tần suất request theo IP' },
      { layer: 'Lưu trữ tệp', tech: 'MinIO', detail: 'Lưu trữ đối tượng tương thích S3 cho tài liệu PDF đã ký' },
      { layer: 'Xác thực Đa yếu tố', tech: 'JWT + WebAuthn/FIDO2 + Email OTP', detail: 'python-jose, fido2, pyotp' },
      { layer: 'Engine Ký số PDF', tech: 'pyHanko 0.21.0', detail: 'Ký số PDF chuẩn PAdES tương thích quốc tế' },
      { layer: 'Giám sát Hệ thống', tech: 'Prometheus + Grafana', detail: 'Đo độ trễ API (p50/p95/p99) và lưu lượng yêu cầu' },
      { layer: 'Hạ tầng Triển khai', tech: 'Docker Compose', detail: 'Điều phối hoàn chỉnh 7 dịch vụ microservices' },
    ],
    contribution: [
      'Thiết kế và triển khai toàn bộ bề mặt API backend trên FastAPI (xác thực, yêu cầu chứng chỉ CSR, ký số, xác minh, quản trị)',
      'Tích hợp HashiCorp Vault PKI engine cho việc cấp phát chứng chỉ X.509 và Transit engine cho tác vụ ký số — khóa riêng không bao giờ rời khỏi Vault',
      'Tích hợp immudb xây dựng nhật ký kiểm toán Merkle-tree ghi lại mọi sự kiện cấp phát, thu hồi và ký số chống sửa đổi',
      'Triển khai cơ chế xác thực đa yếu tố (MFA): JWT phiên ngắn kết hợp Email OTP và khóa bảo mật phần cứng WebAuthn/FIDO2',
      'Xây dựng adapter tùy biến cho pyHanko kết nối trực tiếp với Vault Transit để nhúng chữ ký PAdES vào tài liệu PDF',
      'Thiết lập môi trường Docker Compose cho toàn bộ 7 dịch vụ kèm script tự động hóa khởi tạo Vault, MinIO, PostgreSQL và immudb',
      'Thu thập chỉ số hiệu năng với Prometheus và xây dựng dashboard trực quan hóa trên Grafana',
    ],
    implementation: [
      'Luồng cấp phát chứng chỉ: Người dùng gửi yêu cầu CSR → Quản trị viên duyệt → Vault PKI engine sinh chứng chỉ X.509 → Lưu trữ metadata vào PostgreSQL và ghi bản ghi kiểm toán vào immudb',
      'Luồng ký số PDF: Người dùng tải lên PDF → Backend tính toán mã băm SHA-256 gửi đến Vault Transit → Vault trả về chữ ký mật mã → pyHanko nhúng chữ ký PAdES vào PDF → Lưu trữ file vào MinIO và ghi log immudb',
      'Luồng xác minh chữ ký: Người dùng tải PDF đã ký lên → pyHanko phân tích chữ ký và đối soát chuỗi chứng chỉ với CA nội bộ → đối chiếu bản ghi sổ cái immudb',
      'Biện pháp an toàn: Giới hạn tần suất Redis trên các endpoint xác thực, kiểm tra nghiêm ngặt kiểu dữ liệu qua Pydantic v2 và tiêm runtime secrets hoàn toàn qua .env',
    ],
    security: [
      'Bảo vệ khóa riêng: Khóa gốc CA và khóa ký của người dùng nằm trọn vẹn trong Vault; không có dữ liệu khóa nào bị ghi ra đĩa hay bộ nhớ ứng dụng backend',
      'Nhật ký kiểm toán chống can thiệp: Sổ cái Merkle-tree của immudb bảo đảm mọi hành vi sửa đổi hoặc xóa bản ghi đều bị phát hiện ngay lập tức',
      'Xác thực đa yếu tố: Phiên làm việc JWT (thời hạn 30 phút) kết hợp xác thực Email OTP hoặc khóa bảo mật phần cứng FIDO2',
      'Bảo vệ đa lớp: SQLAlchemy ORM loại bỏ nguy cơ SQL Injection, Pydantic ngăn chặn giả mạo tham số, Redis ngăn chặn brute-force',
      'Cô lập bí mật: Toàn bộ mật khẩu, token và khóa cấu hình được quản lý qua biến môi trường .env, không đưa lên mã nguồn',
    ],
    challenges: [
      'Cấu hình phân quyền chính sách (ACL policy) trên Vault PKI engine đòi hỏi thiết kế chặt chẽ để worker có thể ký mà không cần quyền admin toàn cục',
      'Tích hợp pyHanko với Vault Transit đòi hỏi viết adapter tùy biến vì pyHanko mặc định yêu cầu quyền truy cập trực tiếp vào file khóa riêng',
      'Điều phối thứ tự khởi động và kiểm tra sức khỏe (health checks) cho 7 dịch vụ Docker Compose để tránh tình trạng race condition lúc bootstrap',
    ],
    lessonsLearned: [
      'Sử dụng dịch vụ quản lý khóa chuyên dụng (như Vault Transit) tạo ra ranh giới an ninh vững chắc, ngăn chặn lỗ hổng ứng dụng làm lộ khóa mật mã gốc',
      'Cơ sở dữ liệu sổ cái bất biến (immudb) rất hữu ích cho yêu cầu chống chối bỏ, nhưng lập trình viên cần hiểu rằng sổ cái chứng minh tính toàn vẹn sau khi ghi, chứ không bảo đảm tính đúng đắn của dữ liệu đầu vào ban đầu',
      'Điều phối nhiều microservices bằng Docker Compose đòi hỏi kịch bản khởi tạo tự động có cấu trúc rõ ràng và các dependency chain xác định',
    ],
    limitations: [
      'Được tối ưu cho quy trình ký từng tài liệu đơn lẻ; luồng ký hàng loạt (batch signing) đang trong lộ trình phát triển',
      'Chưa triển khai điểm phân phối danh sách thu hồi CRL và máy chủ kiểm tra trạng thái trực tuyến OCSP responder (nằm trong lộ trình)',
      'Được thử nghiệm trong môi trường container giả lập; chưa tích hợp Active Directory / LDAP doanh nghiệp',
    ],
    futureWork: [
      'Triển khai OCSP responder và cơ chế tự động xuất bản danh sách thu hồi CRL',
      'Xây dựng Helm charts cho việc triển khai ứng dụng lên cụm Kubernetes',
      'Phát triển quy trình phê duyệt ký văn bản nhiều bước (multi-party signature workflow)',
    ],
    github: 'https://github.com/pthanhbinh1654/pki_systems',
  },
  {
    slug: 'zeroknowledge-encryption',
    title: 'Hệ thống Lưu trữ Tệp tin Mã hóa Zero-Knowledge',
    tagline: 'Mã hóa tệp tin phía trình duyệt bằng AES-256-GCM kết hợp mật mã kháng lượng tử Kyber1024 — khóa không rời khỏi RAM',
    period: '05/2025 – 08/2025',
    category: 'Đồ án môn học',
    status: 'ready',
    tags: ['TypeScript', 'React', 'FastAPI', 'Argon2id', 'Kyber1024', 'MongoDB', 'MinIO'],
    overview:
      'Đồ án môn học chuyên ngành An toàn thông tin về Mật mã học ứng dụng và An toàn ứng dụng Web. Đề tài nghiên cứu và hiện thực mô hình lưu trữ tệp tin Không-Tiết-Lộ-Tri-Thức (Zero-Knowledge) trên nền web kết hợp thử nghiệm các thuật toán mật mã kháng lượng tử theo chuẩn NIST. Toàn bộ thao tác dẫn xuất khóa (Argon2id WASM) và mã hóa dữ liệu (AES-256-GCM qua Web Crypto API) đều diễn ra trực tiếp trong trình duyệt người dùng. Đồ án thử nghiệm cơ chế đóng gói khóa lai (Hybrid KEM) kết hợp Kyber1024 với X25519, cùng chữ ký số Dilithium3 + Ed25519 để xác thực tính toàn vẹn bản mã. Máy chủ Backend đóng vai trò như một kho lưu trữ mù (Blind Storage), chỉ lưu trữ các khối bản mã trên MinIO và metadata công khai trên MongoDB.',
    problem:
      'Các dịch vụ lưu trữ đám mây truyền thống thường mã hóa dữ liệu bằng khóa do máy chủ quản lý, khiến dữ liệu người dùng có nguy cơ bị lộ khi máy chủ bị tấn công hoặc bị xâm nhập nội bộ. Hơn nữa, các thuật toán mật mã khóa công khai kinh điển (RSA, ECC) có nguy cơ bị bẻ gãy bởi máy tính lượng tử trong tương lai ("Harvest Now, Decrypt Later"). Đồ án hiện thực cơ chế mã hóa phía máy khách nơi máy chủ hoàn toàn mù với nội dung bản rõ và khóa giải mã.',
    architecture: `graph TB
    subgraph Client["Trình duyệt Client (Vùng An toàn)"]
        PW[/"Mật khẩu người dùng"/] --> KDF["Argon2id KDF (WebAssembly)"]
        KDF --> KEK["Khóa KEK (Chỉ tồn tại trong RAM)"]
        FILE[/"Tệp tin bản rõ"/] --> ENC["Mã hóa AES-256-GCM + Đóng gói khóa Kyber1024"]
        KEK --> ENC
        ENC --> SIG["Chữ ký số Dilithium3 / Ed25519"]
        SIG --> OUT["Bản mã + DEK đã mã hóa + Chữ ký + Salt/IV"]
    end
    subgraph Transport["Kênh truyền an toàn HTTPS"]
        OUT -->|"Chỉ truyền tải dữ liệu đã mã hóa"| API
    end
    subgraph Server["Máy chủ Docker (Lưu trữ Mù - Blind Storage)"]
        API["FastAPI Gateway (JWT + hCaptcha)"]
        API --> MINIO["MinIO S3 Lưu trữ khối Ciphertext"]
        API --> MONGO["MongoDB 6.0 Salt · IV · Encrypted DEK · Chữ ký · Metadata"]
    end`,
    techStack: [
      { layer: 'Giao diện Web', tech: 'React 18 + TypeScript + Vite', detail: 'Ứng dụng SPA với đường ống mã hóa luồng dữ liệu phía client' },
      { layer: 'Mật mã Đối xứng', tech: 'Web Crypto API (SubtleCrypto)', detail: 'Chuẩn AES-256-GCM tăng tốc phần cứng' },
      { layer: 'Dẫn xuất Khóa', tech: 'argon2-browser (WASM)', detail: 'Hàm Argon2id kháng GPU dẫn xuất KEK từ mật khẩu' },
      { layer: 'KEM Kháng lượng tử', tech: '@noble/post-quantum', detail: 'Kyber1024 (Chuẩn NIST ML-KEM)' },
      { layer: 'Chữ ký Kháng lượng tử', tech: '@noble/post-quantum', detail: 'Dilithium3 (Chuẩn NIST ML-DSA)' },
      { layer: 'Mật mã Cổ điển', tech: 'libsodium-wrappers', detail: 'X25519 ECDH + ChaCha20-Poly1305' },
      { layer: 'Cổng Backend API', tech: 'Python 3.11 + FastAPI', detail: 'Gateway lưu trữ mù bất đồng bộ với xác thực JWT' },
      { layer: 'Lưu trữ Bản mã', tech: 'MinIO', detail: 'Tương thích S3, lưu trữ ciphertext dạng phân đoạn' },
      { layer: 'Cơ sở dữ liệu Metadata', tech: 'MongoDB 6.0', detail: 'Lưu trữ Salt, IV, DEK đã mã hóa, siêu dữ liệu chữ ký' },
      { layer: 'Container hóa', tech: 'Docker Compose', detail: 'Điều phối Frontend, Backend, MinIO và MongoDB' },
    ],
    contribution: [
      'Thiết kế kiến trúc mật mã phía máy khách: Dẫn xuất khóa Argon2id → Mã hóa AES-256-GCM → Đóng gói khóa Kyber1024 → Sinh chữ ký số Dilithium3',
      'Triển khai luồng tải lên mã hóa theo từng khối (chunked streaming qua Web Streams API 1 MB) giảm thiểu tối đa bộ nhớ RAM trình duyệt khi xử lý file lớn',
      'Xây dựng cơ chế đóng gói khóa lai (Hybrid KEM) kết hợp Kyber1024 với X25519 cho lớp bảo vệ hai tầng',
      'Xây dựng backend FastAPI lưu trữ mù với MinIO bất đồng bộ và lưu trữ metadata trên MongoDB',
      'Triển khai xác thực tài khoản 2 yếu tố (2FA) bằng TOTP và Email OTP, kết hợp bảo vệ chống bot bằng hCaptcha',
      'Viết các ca kiểm thử mật mã tự động xác minh tính xác định của dẫn xuất khóa, kiểm tra chữ ký và tính toàn vẹn giải mã',
    ],
    implementation: [
      'Luồng mã hóa tải lên: Người dùng nhập mật khẩu → Argon2id dẫn xuất khóa KEK trong bộ nhớ WASM → Trình duyệt sinh khóa DEK ngẫu nhiên → Mã hóa file bằng AES-256-GCM → Đóng gói khóa DEK bằng KEK & Kyber1024 → Ký bản mã bằng Dilithium3 → Đẩy ciphertext và metadata lên server',
      'Luồng giải mã tải xuống: Client tải ciphertext và DEK đã bọc → Dẫn xuất lại KEK từ mật khẩu → Mở bọc DEK → Xác minh chữ ký Dilithium3 → Giải mã bản mã bằng AES-256-GCM → Kích hoạt tải file trên trình duyệt',
      'Ranh giới Zero-Knowledge: Máy chủ chỉ lưu trữ ciphertext, salt, IV, DEK đã mã hóa và chữ ký — tuyệt đối không nắm giữ mật khẩu gốc, KEK, DEK hay bản rõ',
    ],
    security: [
      'Kiến trúc Zero-Knowledge: Khóa mật mã chỉ được sinh và giữ trong bộ nhớ RAM trình duyệt; máy chủ hoàn toàn mù về mặt toán học với dữ liệu',
      'Bảo vệ lai kháng lượng tử: Kết hợp Kyber1024 với X25519 bảo vệ tính bí mật trước cả kẻ tấn công hiện tại lẫn máy tính lượng tử tương lai',
      'KDF kháng dò tìm GPU: Cấu hình tham số bộ nhớ Argon2id nâng cao chi phí tính toán khi kẻ tấn công cố dò mật khẩu từ salt bị lộ',
      'Xác thực tính toàn vẹn: Chữ ký số Dilithium3/Ed25519 bảo đảm mọi hành vi chỉnh sửa bản mã đều bị phát hiện trước khi tiến hành giải mã',
    ],
    challenges: [
      'Xử lý tính toán Argon2id nền WebAssembly kết hợp với luồng bất đồng bộ Web Crypto API mà không gây đơ giao diện đòi hỏi chia nhỏ chunk và xử lý web worker cẩn thận',
      'Kết hợp bí mật chung của Kyber1024 với X25519 vào một quy trình dẫn xuất khóa duy nhất đòi hỏi tuân thủ nghiêm ngặt đặc tả NIST PQC',
      'Quản lý các authentication tag trên nhiều chunk mã hóa nhằm ngăn chặn các cuộc tấn công tráo đổi hoặc cắt xén chunk',
    ],
    lessonsLearned: [
      'Mật mã WebAssembly trên trình duyệt hiện đại hoàn toàn khả thi cho ứng dụng mã hóa tệp tin thực tế nhưng đòi hỏi kiến trúc streaming phân đoạn tiết kiệm bộ nhớ',
      'Mật mã lai (kết hợp cổ điển và kháng lượng tử) là lộ trình khuyến nghị để phòng ngừa cả mối đe dọa mật mã hiện hữu lẫn tương lai',
      'Kiến trúc Zero-Knowledge chuyển toàn bộ trách nhiệm an ninh về thiết bị máy khách và thói quen đặt mật khẩu an toàn của người dùng',
    ],
    limitations: [
      'Là sản phẩm nghiên cứu thử nghiệm cho đồ án môn học; chưa qua kiểm toán an ninh bởi tổ chức bảo mật độc lập thương mại',
      'Không có cơ chế khôi phục mật khẩu: việc quên mật khẩu sẽ dẫn đến mất vĩnh viễn quyền truy cập vào dữ liệu đã mã hóa',
      'Đòi hỏi kết nối mạng với máy chủ lưu trữ mù để đồng bộ metadata',
    ],
    futureWork: [
      'Hiện thực cơ chế khôi phục khóa an toàn thông qua chia sẻ bí mật Shamir Secret Sharing giữa các thiết bị tin cậy',
      'Phát triển tính năng chia sẻ thư mục mã hóa đầu-cuối giữa người dùng thông qua trao đổi khóa công khai',
      'Tối ưu hóa đa luồng Web Worker để nâng cao tốc độ mã hóa cho các file kích thước lớn',
    ],
    github: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption',
  },
  {
    slug: 'winlogcollector',
    title: 'Hệ thống Thu thập & Chuyển tiếp Log Windows (WinLogCollector)',
    tagline: 'Agent PowerShell thu thập định kỳ Windows Event Log và chuyển tiếp an toàn vào ELK qua SFTP',
    period: '01/2025 – 04/2025',
    category: 'Đồ án môn học',
    status: 'ready',
    tags: ['PowerShell', 'ELK Stack', 'WinForms', 'SFTP', 'Docker'],
    overview:
      'Đồ án môn học về An toàn mạng và Giám sát hệ điều hành. WinLogCollector là agent thu thập nhật ký sự kiện Windows (Windows Event Log) gọn nhẹ viết bằng PowerShell 5.1+ thuần (~50 KB, không phụ thuộc thư viện ngoài), chạy trên máy trạm Windows, định kỳ thu thập tăng tiến các kênh Security, System, Application và PowerShell Operational, nén thành tệp ZIP và chuyển tiếp an toàn qua SFTP (OpenSSH) vào hệ thống ELK Stack chạy trên Docker (WSL2). Hệ thống tích hợp hàng đợi ngoại tuyến tự động thử lại theo cơ chế lùi số mũ và bảng điều khiển quản trị WinForms trực quan 6 tab.',
    problem:
      'Giám sát sự kiện an ninh trên các máy trạm Windows (đăng nhập, leo thang đặc quyền, tạo tiến trình, thực thi lệnh PowerShell) bằng Event Viewer mặc định rất phân tán và khó tìm kiếm tập trung. Việc chuyển tiếp log về hệ thống ELK trong môi trường thực hành / phòng lab đòi hỏi agent gọn nhẹ, không cần cài đặt phần mềm bên thứ ba cồng kềnh, có khả năng xử lý mất mạng đáng tin cậy và không đọc trùng lặp sự kiện.',
    architecture: `flowchart TD
    subgraph Agent ["Windows Agent (Host OS)"]
        A["Windows Event Log (Security, System, PowerShell)"] -->|Truy vấn lũy tiến| B["Engine Thu thập Log (RecordID Checkpoint)"]
        B -->|Ghi JSONL & Nén| C["Tệp nén ZIP Archive"]
        C -->|SFTP Cổng 2222| D["OpenSSH SFTP Client"]
        C -.->|Upload thất bại| Q["Hàng đợi Offline & Retry (Lùi số mũ)"]
        Q -.->|Vượt quá 20 lần / 14 ngày| X["Thư mục Cách ly (Quarantine)"]
        Q -->|Thử lại truyền tải| D
    end
    subgraph Server ["Đường ống ELK (WSL2 Docker)"]
        D -->|Truyền tệp an toàn| E["Container SFTP"]
        E -->|Shared Volume| F["Sidecar Extractor"]
        F -->|Tự động giải nén JSONL| G["Đường ống Logstash"]
        G -->|Parse cú pháp & Index| H["Elasticsearch"]
        H -->|Trực quan hóa| I["Dashboard Kibana"]
    end`,
    techStack: [
      { layer: 'Agent Thu thập', tech: 'PowerShell 5.1+', detail: 'PowerShell tích hợp sẵn trên Windows, dung lượng script ~50 KB' },
      { layer: 'Giao diện Quản trị', tech: 'WinForms (.NET)', detail: 'Bảng điều khiển 6 tab chọn kênh log, xem hàng đợi và kiểm tra môi trường' },
      { layer: 'Giao thức Truyền tải', tech: 'OpenSSH SFTP', detail: 'Xác thực qua SSH key, bắt buộc chốt fingerprint máy chủ SSH host key pinning' },
      { layer: 'Định dạng Nén', tech: 'System.IO.Compression (ZIP)', detail: 'Nén các dòng JSONL theo từng chu kỳ thu thập' },
      { layer: 'Lưu trữ & Index', tech: 'Elasticsearch', detail: 'Index pattern winlogs-* đánh chỉ mục theo chuỗi thời gian' },
      { layer: 'Đường ống Xử lý', tech: 'Logstash + Extractor sidecar', detail: 'Giải nén tự động, phân tích cú pháp JSONL, làm giàu trường sự kiện' },
      { layer: 'Trực quan hóa', tech: 'Kibana', detail: 'Giao diện tìm kiếm tập trung và thiết kế dashboard theo dõi an ninh' },
      { layer: 'Môi trường Máy chủ', tech: 'Docker Compose (WSL2)', detail: 'Triển khai đồng bộ SFTP server, sidecar extractor và ELK stack' },
      { layer: 'Kiểm thử Tự động', tech: 'Pester 5.x', detail: '8 unit tests kiểm tra quản lý trạng thái, quyền admin và logic retry' },
    ],
    contribution: [
      'Xây dựng engine thu thập log lũy tiến bằng cơ chế lưu checkpoint RecordID, bảo đảm không thu thập trùng lặp hoặc bỏ sót sự kiện',
      'Thiết kế hàng đợi ngoại tuyến với thuật toán lùi số mũ (1→2→5→15→30→60 phút) và tự động cách ly sau 20 lần thử thất bại',
      'Triển khai cơ chế ghi tệp nguyên tử (.tmp staging → đổi tên) nhằm ngăn chặn việc truyền các tệp nén bị lỗi hoặc dở dang',
      'Tích hợp chốt khóa máy chủ SSH (StrictHostKeyChecking=yes) nhằm loại bỏ rủi ro tấn công giả mạo Man-in-the-Middle',
      'Xây dựng bảng điều khiển quản trị WinForms 6 tab cho phép cấu hình kênh log, theo dõi hàng đợi và kiểm tra điều kiện tiên quyết hệ thống',
      'Viết bộ 8 bài kiểm thử tự động với Pester bao quát lưu trữ trạng thái, kiểm tra kênh log, đóng gói archive và logic backoff UTC',
    ],
    implementation: [
      'Vòng lặp thu thập: Truy vấn các kênh Windows Event Log qua Get-WinEvent bằng bộ lọc RecordID phục vụ thu thập lũy tiến',
      'Quy trình chu kỳ: Truy vấn sự kiện → Tuần tự hóa JSONL → Nén ZIP kèm timestamp → Thử upload SFTP → Nếu thất bại: Lưu vào hàng đợi cục bộ kèm metadata',
      'Bộ xử lý hàng đợi: Đọc trạng thái từ đĩa, kiểm tra lịch thử lại theo quy tắc lùi số mũ và tự động gửi lại ở các chu kỳ kế tiếp',
      'Khởi tạo ELK một chạm: Script setup-elk.ps1 tự động khởi tạo môi trường Docker Compose gồm SFTP container, sidecar extractor, Logstash, Elasticsearch và Kibana',
      'Xử lý Logstash: Phân tích cú pháp JSONL có cấu trúc, map các mã Event ID Windows (ví dụ 4624 đăng nhập, 4688 tạo tiến trình) và đánh index vào winlogs-*',
    ],
    security: [
      'Chốt khóa máy chủ SSH: Agent xác thực fingerprint của SFTP server trước mỗi phiên truyền tệp để ngăn chặn giả mạo máy chủ',
      'Mutex đơn phiên (Single-instance mutex): Bảo đảm chỉ một tiến trình agent chạy tại một thời điểm, chống xung đột ghi checkpoint',
      'Không lưu mật khẩu dạng văn bản rõ: Xác thực hoàn toàn dựa trên cặp khóa SSH Key được phân quyền an toàn trên hệ thống tệp',
      'Cách ly dữ liệu (Quarantine): Các tệp lỗi vượt quá 20 lần thử lại hoặc quá 14 ngày được cô lập vào thư mục riêng để phân tích, không bị xóa âm thầm',
      'Ghi tệp nguyên tử: Thao tác staging qua tệp tạm .tmp bảo đảm không có file lưu trữ dở dang nào bị gửi đi hoặc phân tích lỗi',
    ],
    challenges: [
      'Xây dựng hàng đợi lùi số mũ và tuần tự hóa trạng thái thuần PowerShell không dùng thư viện ngoài đòi hỏi xử lý tệp tin rất cẩn thận',
      'Đảm bảo khôi phục checkpoint RecordID chính xác trong các tình huống máy bị tắt đột ngột đòi hỏi viết các ca kiểm thử giả lập sự cố',
      'Cập nhật giao diện WinForms từ các tiến trình thu thập chạy nền đòi hỏi cơ chế chuyển tiếp luồng qua Invoke() chuẩn xác',
    ],
    lessonsLearned: [
      'Thu thập lũy tiến theo RecordID rất hiệu quả trên Windows nhưng cần chú ý xử lý trường hợp Event Log bị quay vòng (wrap-around) khi lưu lượng lớn',
      'Cơ chế lùi số mũ kết hợp giới hạn số lần thử và cách ly dữ liệu mang lại độ tin cậy vận hành vượt trội so với việc thử lại vô hạn',
      'Kiểm thử tự động với Pester giúp nâng cao đáng kể độ ổn định cho các module PowerShell khi thao tác với file I/O và chuyển đổi trạng thái',
    ],
    limitations: [
      'Được thiết kế cho các máy trạm/máy chủ Windows chạy PowerShell 5.1 trở lên',
      'Yêu cầu quyền Administrator trên máy chủ để đọc kênh Security Event Log',
      'Hạ tầng ELK chạy qua Docker trên WSL2; phù hợp cho môi trường lab, học tập và kiểm thử hơn là quy trình enterprise quy mô lớn',
      'Kênh truyền nội bộ giữa các container trong Docker network chưa cấu hình mTLS (truyền ngoài từ agent lên SFTP thì được mã hóa hoàn toàn)',
    ],
    futureWork: [
      'Đóng gói agent thành Windows Service độc lập chạy nền hoàn toàn không phụ thuộc giao diện GUI',
      'Kích hoạt mã hóa TLS cho đường ống Logstash nội bộ',
      'Xây dựng thêm các mẫu dashboard Kibana tương ứng với các kỹ thuật tấn công phổ biến theo khung MITRE ATT&CK',
    ],
    github: 'https://github.com/pthanhbinh1654/winlogcollector',
  },
]

export function getProjects(locale: Locale = 'vi'): Project[] {
  return locale === 'vi' ? projectsVi : projectsEn
}

export function getProjectBySlug(slug: string, locale: Locale = 'vi'): Project | undefined {
  const list = getProjects(locale)
  return list.find((p) => p.slug === slug)
}

export const projects = projectsEn

