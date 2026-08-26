import type { Locale } from '@/i18n/translations'

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

const projectsEn: Project[] = [
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

const projectsVi: Project[] = [
  {
    slug: 'pki-systems',
    title: 'Nền tảng Quản lý PKI & Ký số Điện tử',
    tagline: 'Quản lý vòng đời chứng chỉ số X.509 với cơ chế lưu trữ và ký bảo mật qua HashiCorp Vault',
    period: '09/2025 – 12/2025',
    status: 'ready',
    tags: ['Python', 'FastAPI', 'HashiCorp Vault', 'immudb', 'PostgreSQL', 'Docker'],
    overview:
      'Nền tảng web cho phép tổ chức phát hành, quản lý và thu hồi chứng chỉ số X.509 nội bộ, đồng thời hỗ trợ người dùng ký số văn bản PDF chuẩn PAdES — toàn bộ quy trình được bảo vệ bởi HashiCorp Vault (quản lý và lưu trữ khóa an toàn) và immudb (nhật ký kiểm toán Merkle-tree chống giả mạo). Dự án được thực hiện làm Khóa luận tốt nghiệp tại Đại học Cần Thơ.',
    problem:
      'Quy trình quản lý chứng chỉ thủ công trong tổ chức thường tiềm ẩn nhiều rủi ro: chứng chỉ hết hạn bất ngờ gây gián đoạn dịch vụ, việc thu hồi không được cập nhật kịp thời, và thiếu nhật ký kiểm toán bất biến chứng minh ai đã ký tài liệu nào tại thời điểm nào. Hệ thống này giải quyết toàn diện các vấn đề trên cho các tổ chức vừa và nhỏ.',
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
      { layer: 'Frontend', tech: 'React 18 + TypeScript + Vite', detail: 'TailwindCSS, Zustand' },
      { layer: 'Backend', tech: 'Python 3.11 + FastAPI 0.109', detail: 'SQLAlchemy 2.0, Pydantic v2, Alembic' },
      { layer: 'PKI & Quản lý Khóa', tech: 'HashiCorp Vault 1.15', detail: 'PKI engine + Transit engine' },
      { layer: 'Kiểm toán (Audit)', tech: 'immudb 1.4.1', detail: 'Sổ cái Merkle-tree, append-only bất biến' },
      { layer: 'Cơ sở dữ liệu', tech: 'PostgreSQL 15', detail: 'Metadata chứng chỉ, tài khoản người dùng' },
      { layer: 'Bộ nhớ đệm (Cache)', tech: 'Redis 7', detail: 'Quản lý phiên, giới hạn tần suất rate limiting' },
      { layer: 'Lưu trữ tệp', tech: 'MinIO', detail: 'Lưu trữ đối tượng tương thích S3 cho PDF đã ký' },
      { layer: 'Xác thực', tech: 'JWT + WebAuthn/FIDO2', detail: 'python-jose 3.3, fido2 1.1.2' },
      { layer: 'Ký số PDF', tech: 'pyHanko 0.21.0', detail: 'Chữ ký PDF chuẩn tương thích PAdES' },
      { layer: 'Giám sát hệ thống', tech: 'Prometheus + Grafana', detail: 'Đo độ trễ p50/p95/p99, tỷ lệ lỗi' },
      { layer: 'Hạ tầng triển khai', tech: 'Docker Compose', detail: '7 microservices trên một compose file duy nhất' },
    ],
    contribution: [
      'Thiết kế và triển khai toàn bộ bề mặt API backend (xác thực, quản lý chứng chỉ, tài liệu, ký số, quản trị)',
      'Tích hợp Vault PKI engine cho việc cấp phát chứng chỉ và Transit engine cho tác vụ ký số — khóa riêng không bao giờ bị trích xuất ra ngoài Vault',
      'Tích hợp immudb xây dựng nhật ký kiểm toán chống can thiệp dựa trên cấu trúc Merkle-tree ledger',
      'Triển khai cơ chế xác thực đa yếu tố (MFA): JWT + Email OTP kết hợp khóa bảo mật phần cứng WebAuthn/FIDO2',
      'Thiết lập thu thập chỉ số hiệu năng với Prometheus và xây dựng dashboard trực quan hóa trên Grafana',
      'Xây dựng kịch bản điều phối Docker Compose hoàn chỉnh cho toàn bộ 7 dịch vụ',
      'Viết kịch bản di chuyển dữ liệu Alembic và script khởi tạo tự động cho Vault, MinIO và PostgreSQL',
    ],
    implementation: [
      'Luồng cấp phát chứng chỉ: Người dùng gửi yêu cầu CSR → Quản trị viên duyệt → Vault PKI engine sinh chứng chỉ X.509 → Lưu trữ metadata và gửi thông báo qua email',
      'Luồng ký số: Người dùng tải lên file PDF → Backend tính toán mã băm (digest) gửi đến Vault Transit → Vault trả về chữ ký mật mã → pyHanko nhúng chữ ký vào PDF → Bản ghi kiểm toán được ghi nối vào immudb',
      'Luồng xác minh: Người dùng tải file PDF đã ký lên → Backend tính lại mã băm → Đối soát chéo giữa Vault và bản ghi kiểm toán immudb → Trả về kết quả tính toàn vẹn',
      'Giới hạn tần suất (Rate limiting): Áp dụng rate limiter theo IP trên nền Redis cho tất cả các endpoint nhạy cảm (đăng nhập, đăng ký, xác thực OTP)',
      'Tất cả bí mật (secrets) được tiêm qua biến môi trường .env tại thời điểm runtime; tệp .env tuyệt đối không đưa lên Git',
    ],
    security: [
      'Khóa riêng mật mã không bao giờ rời khỏi Vault — mọi phép tính mã hóa/ký số đều thực thi bên trong Vault PKI/Transit engines',
      'immudb sử dụng sổ cái Merkle-tree — các bản ghi kiểm toán không thể bị xóa hay sửa đổi mà không bị phát hiện',
      'Xác thực đa yếu tố: JWT (thời hạn 30 phút) + Email OTP hoặc khóa bảo mật phần cứng WebAuthn/FIDO2',
      'SQLAlchemy ORM ngăn chặn triệt để lỗ hổng SQL Injection; Pydantic v2 chuẩn hóa và xác thực toàn bộ dữ liệu đầu vào API',
      'Giới hạn tần suất dựa trên Redis ngăn chặn các cuộc tấn công brute-force vào luồng xác thực',
      'Toàn bộ thông tin nhạy cảm và secret được cấu hình qua biến môi trường, không lưu trữ trong mã nguồn',
    ],
    challenges: [
      'Cấu hình chính sách (policy) trên Vault PKI engine đòi hỏi thiết kế chặt chẽ để phân quyền chính xác vai trò nào được phép yêu cầu và cấp phát chứng chỉ',
      'Tích hợp pyHanko với Vault Transit đòi hỏi viết adapter tùy biến vì pyHanko mặc định yêu cầu quyền truy cập trực tiếp vào khóa riêng',
      'Thư viện immudb client cho Python đòi hỏi nghiên cứu sâu về API xác thực Merkle-tree để triển khai kiểm tra bằng chứng mật mã (proof validation)',
    ],
    lessonsLearned: [
      'HashiCorp Vault Transit engine là giải pháp thực tế và hiệu quả cao để triển khai ký số mà không bao giờ để lộ vật liệu khóa ra mã nguồn ứng dụng',
      'Thiết kế nhật ký kiểm toán chống can thiệp cần hiểu rõ mô hình tin cậy: immudb chứng minh dữ liệu không bị sửa đổi sau khi ghi, chứ không bảo đảm tính đúng đắn của dữ liệu gốc ban đầu',
      'Điều phối nhiều dịch vụ với Docker Compose đòi hỏi cấu hình thứ tự phụ thuộc (depends_on) và kiểm tra sức khỏe (health checks) kỹ lưỡng để tránh tình trạng race condition lúc khởi động',
    ],
    limitations: [
      'Tính năng ký hàng loạt (batch signing) mới hoàn thiện một phần — tính năng ký từng tài liệu đơn lẻ đã hoàn chỉnh',
      'Chưa triển khai điểm phân phối danh sách thu hồi CRL và giao thức kiểm tra trạng thái trực tuyến OCSP (nằm trong lộ trình)',
      'Chưa được kiểm thử trong môi trường Windows Active Directory doanh nghiệp',
      'Chưa có manifest triển khai lên cụm Kubernetes (nằm trong lộ trình)',
    ],
    futureWork: [
      'Bổ sung OCSP responder và CRL distribution point để kiểm tra trạng thái thu hồi chứng chỉ theo thời gian thực',
      'Kiểm định và chứng nhận mức độ tuân thủ tiêu chuẩn chữ ký điện tử eIDAS / PAdES',
      'Xây dựng Kubernetes manifests và Helm charts phục vụ môi trường Production',
      'Mở rộng quy trình phê duyệt cấp chứng chỉ nhiều bước (multi-step approval workflow)',
    ],
    github: 'https://github.com/pthanhbinh1654/pki_systems',
  },
  {
    slug: 'winlogcollector',
    title: 'Hệ thống Thu thập & Chuyển tiếp Log Windows',
    tagline: 'Agent PowerShell thu thập định kỳ Windows Event Log và chuyển tiếp an toàn vào ELK stack qua SFTP',
    period: '01/2025 – 04/2025',
    status: 'ready',
    tags: ['PowerShell', 'ELK Stack', 'WinForms', 'SFTP', 'Docker'],
    overview:
      'WinLogCollector chạy trên máy chủ Windows, thu thập lũy tiến các sự kiện Security, System, Application và PowerShell Operational, nén thành tệp lưu trữ ZIP và truyền an toàn đến đường ống ELK qua giao thức SFTP. Giao diện bảng điều khiển WinForms cung cấp 6 tab giúp cấu hình kênh log, giám sát hàng đợi và kiểm tra điều kiện tiên quyết (preflight checks).',
    problem:
      'Hệ thống Windows ghi nhận hàng nghìn sự kiện an ninh mỗi ngày — sự kiện đăng nhập, cài đặt dịch vụ, thực thi lệnh PowerShell — tuy nhiên việc đọc trực tiếp qua Event Viewer không khả thi cho công tác phân tích. Chuyển tiếp log về một dashboard tìm kiếm trực quan đòi hỏi agent thu thập tin cậy, có khả năng xử lý mất kết nối mạng mà không bị thất thoát sự kiện.',
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
      { layer: 'Agent Thu thập', tech: 'PowerShell 5.1+', detail: 'Không phụ thuộc thư viện ngoài, dung lượng ~50 KB' },
      { layer: 'Giao diện Quản trị', tech: 'WinForms (.NET)', detail: 'Bảng điều khiển 6 tab trực quan' },
      { layer: 'Giao thức truyền', tech: 'OpenSSH SFTP', detail: 'Bắt buộc chốt khóa máy chủ SSH host key pinning' },
      { layer: 'Định dạng nén', tech: 'ZIP (System.IO.Compression)', detail: 'Nén các dòng JSONL theo từng chu kỳ' },
      { layer: 'Lưu trữ & Index', tech: 'Elasticsearch', detail: 'Index pattern winlogs-*' },
      { layer: 'Đường ống xử lý', tech: 'Logstash', detail: 'Phân tích cú pháp JSONL từ container sidecar' },
      { layer: 'Trực quan hóa', tech: 'Kibana', detail: 'Tìm kiếm tập trung và thiết kế dashboard an ninh' },
      { layer: 'Hạ tầng máy chủ', tech: 'Docker Compose', detail: 'SFTP + Extractor Sidecar + ELK Stack' },
      { layer: 'Kiểm thử tự động', tech: 'Pester', detail: '8 unit tests tự động, tỷ lệ vượt qua 100%' },
    ],
    contribution: [
      'Xây dựng engine thu thập log lũy tiến bằng cơ chế lưu checkpoint RecordID, ngăn chặn việc thu thập trùng lặp sự kiện',
      'Thiết kế hàng đợi ngoại tuyến (offline queue) với thuật toán lùi số mũ (1→2→5→15→30→60 phút) và tự động cách ly (quarantine) sau 20 lần thử thất bại',
      'Triển khai cơ chế ghi tệp nguyên tử (.tmp → đổi tên) nhằm ngăn chặn truyền các tệp nén bị lỗi hoặc chưa hoàn thiện',
      'Tích hợp chốt khóa máy chủ SSH (StrictHostKeyChecking=yes) nhằm loại bỏ rủi ro tấn công giả mạo Man-in-the-Middle',
      'Xây dựng bảng điều khiển quản trị WinForms 6 tab cho phép cấu hình, theo dõi hàng đợi và kiểm tra môi trường hệ thống',
      'Viết bộ 8 bài kiểm thử Pester bao quát quản lý trạng thái, phát hiện quyền Admin, kiểm tra kênh log, đóng gói archive và logic backoff UTC',
    ],
    implementation: [
      'Engine thu thập truy vấn Windows Event Log qua Get-WinEvent với bộ lọc RecordID phục vụ thu thập lũy tiến',
      'Chu kỳ thu thập: Truy vấn → Tuần tự hóa JSONL → Nén ZIP → Thử truyền tải SFTP → Nếu thất bại: Đưa vào hàng đợi cùng metadata',
      'Trình quản lý hàng đợi đọc trạng thái từ đĩa, áp dụng lịch lùi số mũ và tự động thử lại ở chu kỳ kế tiếp',
      'Cài đặt ELK một chạm: Script setup-elk.ps1 tự động khởi tạo môi trường Docker Compose gồm SFTP container, sidecar extractor, Logstash, Elasticsearch và Kibana',
      'Đường ống Logstash phân tích cú pháp sự kiện JSONL, làm giàu dữ liệu máy chủ và đánh chỉ mục vào pattern winlogs-*',
    ],
    security: [
      'Chốt khóa máy chủ SSH: Agent xác thực fingerprint của SFTP server trước mỗi phiên truyền tệp',
      'Mutex đơn phiên (Single-instance mutex): Ngăn chặn 2 bản sao agent chạy đồng thời gây xung đột hoặc hỏng checkpoint',
      'Không lưu trữ thông tin xác thực dưới dạng văn bản thuần: Chỉ sử dụng xác thực qua cặp khóa SSH Key',
      'Cách ly dữ liệu (Quarantine): Các tệp vượt quá 20 lần thử lại hoặc tồn tại quá 14 ngày được cô lập riêng, không âm thầm bị hủy bỏ',
      'Ghi tệp nguyên tử: Cơ chế staging qua tệp .tmp đảm bảo không có file lưu trữ dở dang nào bị gửi đi',
    ],
    challenges: [
      'Xây dựng hàng đợi lùi số mũ thuần PowerShell không dùng thư viện ngoài đòi hỏi xử lý tuần tự hóa tệp trạng thái cực kỳ chặt chẽ',
      'Đảm bảo khôi phục checkpoint chính xác trong các kịch bản gặp sự cố đột ngột đòi hỏi kiểm thử kỹ lưỡng với lỗi giả lập',
      'Mô hình luồng của WinForms đòi hỏi sử dụng Invoke() chuẩn xác để cập nhật giao diện từ các tiến trình thu thập chạy nền',
    ],
    lessonsLearned: [
      'Thu thập lũy tiến theo Checkpoint rất hiệu quả nhưng cần xử lý kỹ các trường hợp biên như Event Log bị quay vòng (wrap-around) trên các máy chủ tải cao',
      'Cơ chế lùi số mũ kết hợp giới hạn lần thử và cách ly dữ liệu là mẫu thiết kế đáng tin cậy hơn nhiều so với việc thử lại vô hạn khi mất kết nối mạng',
      'Kiểm thử tự động với Pester rất hữu ích cho PowerShell, nhưng việc kiểm thử I/O tệp và mạng đòi hỏi kỹ thuật giả lập (mocking) cẩn thận',
    ],
    limitations: [
      'Agent hiện chỉ hoạt động trên môi trường Windows (yêu cầu PowerShell 5.1 trở lên)',
      'Hạ tầng ELK yêu cầu môi trường WSL2 có cài đặt Docker; chưa có hướng dẫn triển khai trực tiếp trên Windows Server',
      'Đường ống Logstash nội bộ chưa kích hoạt mã hóa TLS (SFTP mã hóa khi truyền qua mạng, nhưng pipeline nội bộ giữa các container thì chưa)',
      'Mới được kiểm thử trên môi trường máy trạm thông thường; chưa đo lường tải ở mức lưu lượng sự kiện doanh nghiệp quy mô lớn',
    ],
    futureWork: [
      'Đóng gói Agent thành Windows Service chạy nền hoàn toàn độc lập không cần giao diện GUI',
      'Kích hoạt mã hóa TLS toàn diện cho đường ống Logstash ingest',
      'Bổ sung các mẫu dashboard Kibana chuyên biệt cho các tình huống an ninh phổ biến (đăng nhập thất bại, leo thang đặc quyền)',
      'Mở rộng agent đa nền tảng (thu thập log Linux auditd)',
    ],
    github: 'https://github.com/pthanhbinh1654/winlogcollector',
  },
  {
    slug: 'zeroknowledge-encryption',
    title: 'Hệ thống Mã hóa Tệp tin Zero-Knowledge',
    tagline: 'Mã hóa tệp tin phía trình duyệt bằng AES-256-GCM kết hợp mật mã kháng lượng tử Kyber1024 — khóa không bao giờ rời khỏi thiết bị',
    period: '05/2025 – 08/2025',
    status: 'ready',
    tags: ['TypeScript', 'React', 'FastAPI', 'Argon2id', 'Kyber1024', 'MongoDB', 'MinIO'],
    overview:
      'Hệ thống lưu trữ tệp tin mã hóa trên nền web, trong đó toàn bộ quá trình mã hóa dữ liệu và dẫn xuất khóa đều diễn ra trực tiếp trên trình duyệt của người dùng. Máy chủ chỉ lưu trữ các khối bản mã (ciphertext) hoàn toàn mờ đục và không thể giải mã nội dung ngay cả khi bị kiểm soát hoàn toàn. Quy trình trao đổi khóa ứng dụng mô hình lai Kyber1024 + X25519, và chữ ký số Dilithium3 + Ed25519 — cả hai đều là chuẩn mật mã kháng lượng tử (NIST Post-Quantum Cryptography).',
    problem:
      'Các dịch vụ lưu trữ đám mây phổ biến thường mã hóa dữ liệu bằng khóa do nhà cung cấp nắm giữ. Khi xảy ra rò rỉ dữ liệu hoặc yêu cầu pháp lý, toàn bộ tệp tin đều có thể bị giải mã. Ngoài ra, các thuật toán trao đổi khóa RSA/ECC kinh điển có nguy cơ bị bẻ gãy bởi máy tính lượng tử thông qua thuật toán Shor — kẻ tấn công có thể thu thập bản mã hôm nay và giải mã trong tương lai ("Harvest Now, Decrypt Later").',
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
      { layer: 'Giao diện Web', tech: 'React 18 + TypeScript + Vite', detail: 'Triển khai tĩnh qua Nginx' },
      { layer: 'Mật mã phía Client', tech: 'Web Crypto API', detail: 'Chuẩn AES-256-GCM tăng tốc phần cứng' },
      { layer: 'Dẫn xuất khóa (KDF)', tech: 'argon2-browser (WASM)', detail: 'Hàm Argon2id dẫn xuất khóa từ mật khẩu' },
      { layer: 'KEM Kháng lượng tử', tech: '@noble/post-quantum', detail: 'Kyber1024 (Chuẩn NIST PQC)' },
      { layer: 'Chữ ký Kháng lượng tử', tech: '@noble/post-quantum', detail: 'Dilithium3 (Chuẩn NIST PQC)' },
      { layer: 'KEM Cổ điển', tech: 'libsodium-wrappers', detail: 'X25519 ECDH + ChaCha20-Poly1305' },
      { layer: 'Cổng API Backend', tech: 'Python 3.11 + FastAPI', detail: 'Xác thực JWT + hCaptcha, I/O bất đồng bộ' },
      { layer: 'Lưu trữ Bản mã', tech: 'MinIO', detail: 'Tương thích S3, lưu trữ ciphertext dạng phân đoạn' },
      { layer: 'Cơ sở dữ liệu', tech: 'MongoDB 6.0', detail: 'Lưu trữ Salt, IV, DEK đã mã hóa, siêu dữ liệu chữ ký' },
      { layer: 'Mật mã phía Server', tech: 'liboqs-python 0.14.0', detail: 'Thư viện Open Quantum Safe' },
      { layer: 'Hạ tầng Container', tech: 'Docker Compose', detail: '4 dịch vụ (Frontend, Backend, MinIO, MongoDB)' },
    ],
    contribution: [
      'Thiết kế kiến trúc mật mã phía máy khách: Dẫn xuất khóa Argon2id → Mã hóa AES-256-GCM → Đóng gói khóa Kyber1024 → Ký số Dilithium3',
      'Triển khai luồng tải lên mã hóa theo từng khối (chunked streaming) giảm thiểu tối đa dung lượng RAM trình duyệt khi xử lý file dung lượng lớn',
      'Tích hợp các thuật toán chuẩn NIST PQC (Kyber1024, Dilithium3) song song với X25519 và Ed25519 tạo thành cơ chế mật mã lai (Hybrid scheme)',
      'Xây dựng backend FastAPI với xác thực JWT, tích hợp hCaptcha chống lạm dụng và kết nối cơ sở dữ liệu MinIO/MongoDB bất đồng bộ',
      'Triển khai xác thực 2 yếu tố (2FA) bằng TOTP và Email OTP qua pyotp và aiosmtplib',
      'Viết bộ bài kiểm thử mật mã tự động phía frontend và kiểm thử tích hợp API phía backend',
    ],
    implementation: [
      'Luồng tải lên: Mật khẩu người dùng → Argon2id(mật khẩu, salt) → KEK → Đóng gói khóa Kyber1024 → Mã hóa file bằng AES-256-GCM → Ký bản mã bằng Dilithium3 → Đẩy lên máy chủ',
      'Luồng tải xuống: Lấy DEK đã mã hóa + ciphertext → Argon2id tái tạo KEK → Giải mã DEK → Giải mã file → Xác minh chữ ký số trước khi hiển thị cho người dùng',
      'Dữ liệu trên máy chủ: Chỉ lưu trữ khối ciphertext, salt, IV, DEK đã mã hóa, chữ ký số và metadata — tuyệt đối không lưu khóa giải mã hay bản rõ',
      'Truyền phát phân đoạn (Chunked streaming): File lớn được mã hóa theo từng khối 1 MB qua Web Streams API, tránh nạp toàn bộ file vào bộ nhớ',
    ],
    security: [
      'Zero-Knowledge: Khóa KEK được sinh trực tiếp trên máy khách từ mật khẩu; máy chủ không có cách nào tái tạo KEK nếu không có mật khẩu',
      'Mô hình lai kháng lượng tử: Kết hợp Kyber1024 + X25519 đảm bảo an toàn trước cả kẻ tấn công dùng máy tính cổ điển lẫn máy tính lượng tử tương lai',
      'Tham số Argon2id được tinh chỉnh tối ưu nhằm kháng lại các cuộc tấn công dò mật khẩu bằng GPU',
      'Chữ ký số (Dilithium3 + Ed25519) xác thực tính toàn vẹn khi tải xuống — mọi bản mã bị chỉnh sửa đều bị từ chối trước khi giải mã',
      'hCaptcha khi đăng ký ngăn chặn bot tự động tạo tài khoản gây cạn kiệt tài nguyên hệ thống',
      'Yêu cầu xác thực 2 lớp (TOTP + Email OTP) khi truy cập tài khoản',
    ],
    challenges: [
      'Tích hợp Argon2id nền WebAssembly vào đường ống streaming trong React đòi hỏi xử lý đồng bộ bất đồng bộ phức tạp với Web Crypto API',
      'Kyber1024 tạo ra bí mật chung cần kết hợp an toàn với X25519 trong mô hình lai — việc thiết kế logic này đòi hỏi đọc kỹ đặc tả kỹ thuật của NIST PQC',
      'Đảm bảo thứ tự các chunk và tính toàn vẹn khi mã hóa phân đoạn mà không để lộ nội dung cho server đòi hỏi thiết kế giao thức thẻ xác thực (auth tags) tùy biến',
    ],
    lessonsLearned: [
      'Các thư viện mật mã WebAssembly (argon2-browser, @noble/post-quantum) hoàn toàn có thể dùng trong thực tế nhưng cần quản lý kích thước bundle và API bất đồng bộ cẩn thận',
      'Mật mã lai (kết hợp cổ điển + kháng lượng tử) là phương pháp khuyến nghị trong giai đoạn chuyển đổi công nghệ vì đảm bảo an toàn cả hiện tại lẫn tương lai',
      'Mã hóa hoàn toàn phía client thay đổi ranh giới bảo mật — máy chủ thực sự mù với dữ liệu, nhưng trình duyệt của người dùng trở thành vùng biên an ninh quan trọng nhất',
    ],
    limitations: [
      'Chưa có chế độ ngoại tuyến (Offline mode) — bắt buộc phải có kết nối mạng với máy chủ để điều phối tải lên/tải xuống',
      'Chưa có cơ chế khôi phục khóa — nếu người dùng quên mật khẩu, dữ liệu mã hóa sẽ vĩnh viễn không thể phục hồi',
      'Chưa được kiểm toán mã nguồn bảo mật bởi tổ chức mật mã độc lập thứ ba',
      'Tính năng chia sẻ thư mục bảo mật với người dùng khác đòi hỏi giao thức trao đổi khóa chuyên sâu (nằm trong lộ trình)',
    ],
    futureWork: [
      'Cơ chế khôi phục khóa an toàn thông qua chia sẻ bí mật xã hội (Shamir\'s Secret Sharing)',
      'Tính năng chia sẻ thư mục mã hóa giữa người dùng qua giao thức trao đổi khóa xác thực',
      'Ứng dụng PWA tương thích thiết bị di động có hỗ trợ bộ nhớ đệm ngoại tuyến',
      'Kiểm toán mật mã chuyên sâu từ bên thứ ba',
    ],
    github: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption',
  },
  {
    slug: 'kimball-dimfact',
    title: 'Công cụ Sinh Model Kho Dữ liệu Kimball DimFact',
    tagline: 'Tự động hóa sinh mã mô hình dbt cho kho dữ liệu đa chiều từ schema bảng nguồn CDC',
    period: '01/2026 – 04/2026',
    status: 'ready',
    tags: ['Python', 'dbt', 'Flask', 'React', 'PostgreSQL', 'MySQL', 'Jinja2'],
    overview:
      'Dimfact là công cụ tự động hóa mô hình hóa kho dữ liệu đa chiều theo phương pháp Kimball, có khả năng sinh mã dbt SQL (bảng staging, dimension, fact) trực tiếp từ cấu trúc schema bảng nguồn CDC. Giao diện web trực quan cho phép người dùng duyệt bảng nguồn, ánh xạ khóa và thuộc tính, cấu hình theo dõi lịch sử SCD Loại 1 / Loại 2 và sinh toàn bộ mô hình chỉ với một cú nhấp chuột. Dự án phát triển trong kỳ thực tập tại Mekosoft Software Solutions.',
    problem:
      'Xây dựng kho dữ liệu chuẩn Kimball đòi hỏi phải viết hàng loạt mã SQL lặp đi lặp lại cho các tầng staging, bảng chiều SCD Loại 2 (quản lý valid_from/valid_to/is_current) và bảng fact với các truy vấn tra cứu khóa ngoại (FK lookups). Việc viết SQL thủ công cho khoảng 3 triệu bản ghi trên 11 bảng nguồn rất tốn thời gian và dễ phát sinh sai sót.',
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
      { layer: 'Engine Sinh mã', tech: 'Python 3.11 + Jinja2', detail: 'CLI dwgen và service engine' },
      { layer: 'Backend Web', tech: 'Flask', detail: 'REST API cho bảng điều khiển quản trị' },
      { layer: 'Frontend Web', tech: 'React + Vite', detail: 'Giao diện trực quan cấu hình mô hình DW' },
      { layer: 'Nền tảng dbt', tech: 'dbt-postgres / dbt-mysql', detail: 'Thực thi mô hình SQL và kiểm thử dữ liệu' },
      { layer: 'Kho dữ liệu Đích', tech: 'PostgreSQL, MySQL', detail: 'Cơ sở dữ liệu kho dữ liệu' },
      { layer: 'Nguồn CDC', tech: 'PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery', detail: 'Đầu nối phân tích metadata schema' },
      { layer: 'Triển khai Dịch vụ', tech: 'Linux systemd', detail: 'Chạy nền service qua script package_deploy.sh' },
    ],
    contribution: [
      'Phát triển engine sinh mã nguồn dựa trên Jinja2 (dwgen) cho các mô hình staging, dimension (SCD1/SCD2) và fact',
      'Triển khai cơ chế phân tích cấu trúc schema tự động trên PostgreSQL, MySQL, SQL Server, Snowflake và BigQuery',
      'Xây dựng bộ điều phối pipeline tuần tự quản lý quy trình thực thi staging → dimension → fact có khóa tiến trình chống xung đột',
      'Phát triển và kiểm thử thành công các mô hình dbt cho khoảng 3 triệu bản ghi trên 11 bảng nguồn MySQL CDC',
      'Xây dựng hệ thống REST API trên nền Flask cho giao diện web dashboard',
      'Đối soát kết quả thực thi ETL bằng cách kiểm tra tính nhất quán dữ liệu từ nguồn sang đích',
    ],
    implementation: [
      'Phân tích cấu trúc schema: Kết nối tới DBMS nguồn, đọc information_schema, trích xuất kiểu dữ liệu cột, tự động suy luận khóa chính và khóa ngoại',
      'Sinh mô hình dữ liệu: Template Jinja2 render mã staging SQL (làm sạch dữ liệu thô), dimension SQL (hợp nhất SCD1 hoặc lưu lịch sử SCD2), fact SQL (tra cứu khóa thay thế surrogate keys của bảng chiều)',
      'Điều phối pipeline: Shell script tích hợp khóa tệp (/tmp/pipeline.lock) bảo đảm chỉ có một pipeline chạy tại một thời điểm, kiểm soát thứ tự thực thi và ghi log từng bước',
      'Custom dbt macros: safe_surrogate_key (tính mã băm xác định đa nền tảng DB), insert_unknown_member (ngăn chặn lỗi mồ côi bản ghi fact), full_refresh_scd2_guard (bảo vệ toàn vẹn lịch sử SCD2 khi chạy full refresh)',
    ],
    security: [
      'Thông tin kết nối cơ sở dữ liệu được quản lý trong file .env hoặc profiles.yml — loại trừ hoàn toàn khỏi Git',
      'Không lưu mật khẩu vào mã nguồn; tệp db_config.example.yml là mẫu cấu hình duy nhất được commit',
      'Web dashboard được thiết kế chạy nội bộ trên localhost — không công khai ra Internet nếu không có lớp xác thực bổ sung',
    ],
    challenges: [
      'Bảo toàn lịch sử thay đổi SCD Loại 2 khi chạy lệnh full-refresh trên dbt đòi hỏi viết macro tùy biến bảo vệ chuyên dụng',
      'Xử lý các bản ghi bảng chiều đến muộn (late-arriving dimensions) mà bảng fact đã nạp đòi hỏi cơ chế fact_reprocess_queue để cập nhật lại khóa thay thế',
      'Quy ước đặt tên kiểu dữ liệu cột không đồng nhất giữa các hệ quản trị DBMS đòi hỏi tầng chuẩn hóa kiểu dữ liệu chặt chẽ trong bộ phân tích schema',
    ],
    lessonsLearned: [
      'Các mẫu thiết kế kho dữ liệu Kimball (SCD1, SCD2, surrogate keys, unknown members) là chuẩn mực vững chắc nhưng đòi hỏi xử lý rất cẩn thận các trường hợp biên khi chạy ở quy mô lớn',
      'dbt macros mang lại khả năng trừu tượng hóa cực mạnh cho các đoạn SQL lặp lại, nhưng đòi hỏi kiểm thử nghiêm ngặt vì lỗi trong macro sẽ ảnh hưởng đến toàn bộ model sử dụng nó',
      'Tự động sinh mã nguồn mang lại hiệu suất vượt trội cho các tác vụ lặp lại, nhưng cần phân định rõ ràng giữa mã được sinh tự động và các tùy biến viết tay',
    ],
    limitations: [
      'Hỗ trợ thực thi trực tiếp trên PostgreSQL và MySQL; các kho dữ liệu khác cần cài đặt thêm adapter dbt tương ứng',
      'Giao diện dashboard được thiết kế cho nhu cầu sử dụng cục bộ (local/internal); chưa tích hợp lớp phân quyền người dùng trên web server',
      'Chưa đo lường kiểm thử hiệu năng trên quy mô vượt quá 3 triệu bản ghi trên mỗi bảng',
    ],
    futureWork: [
      'Tích hợp dbt Cloud phục vụ môi trường thực thi lưu trữ đám mây tập trung',
      'Bổ sung adapter dbt cho Snowflake và Google BigQuery',
      'Tích hợp hệ thống phân quyền và xác thực người dùng cho web dashboard',
      'Tự động sinh các bài kiểm thử chất lượng dữ liệu (data quality tests) đồng thời khi sinh model',
    ],
    github: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean',
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
