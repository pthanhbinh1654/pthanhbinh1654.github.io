import type { Locale } from '@/i18n/translations'

export interface SkillGroup {
  category: string
  skills: { name: string; note?: string }[]
}

const skillGroupsEn: SkillGroup[] = [
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

const skillGroupsVi: SkillGroup[] = [
  {
    category: 'Giám sát & Phân tích Log',
    skills: [
      { name: 'Windows Event Log', note: 'Security, System, PowerShell Operational' },
      { name: 'ELK Stack', note: 'Logstash, Elasticsearch, Kibana' },
      { name: 'Thu thập & Chuyển tiếp Log' },
      { name: 'Thiết kế Kibana Dashboard' },
    ],
  },
  {
    category: 'Mật mã học & Hạ tầng PKI',
    skills: [
      { name: 'Chứng chỉ số X.509' },
      { name: 'Quản lý vòng đời PKI', note: 'Yêu cầu, phát hành, gia hạn, thu hồi' },
      { name: 'Chữ ký số PDF', note: 'PAdES / pyHanko' },
      { name: 'HashiCorp Vault', note: 'PKI engine + Transit engine' },
      { name: 'Argon2id KDF' },
      { name: 'AES-256-GCM' },
      { name: 'Mật mã kháng lượng tử', note: 'Kyber1024, Dilithium3 (NIST PQC)' },
    ],
  },
  {
    category: 'Lập trình & Tự động hóa',
    skills: [
      { name: 'Python', note: 'FastAPI, Pydantic, SQLAlchemy, Jinja2' },
      { name: 'PowerShell', note: 'Tự động hóa, WinForms, kiểm thử Pester' },
      { name: 'TypeScript / JavaScript', note: 'React, Vite, Web Crypto API' },
      { name: 'SQL', note: 'PostgreSQL, MySQL' },
      { name: 'Bash Script' },
    ],
  },
  {
    category: 'Hạ tầng & Công cụ',
    skills: [
      { name: 'Docker & Docker Compose' },
      { name: 'Linux (Ubuntu / systemd)' },
      { name: 'SSH / SFTP an toàn' },
      { name: 'Git' },
      { name: 'Phát triển REST API' },
      { name: 'dbt', note: 'dbt-postgres, dbt-mysql, custom macros' },
      { name: 'MinIO (Lưu trữ đối tượng S3)' },
      { name: 'immudb', note: 'Sổ cái Merkle-tree bất biến' },
    ],
  },
  {
    category: 'Mạng máy tính & Hệ thống',
    skills: [
      { name: 'Nguyên lý mạng TCP/IP' },
      { name: 'Khái niệm Firewall & IDS/IPS' },
      { name: 'Quản trị hệ thống Windows' },
      { name: 'Môi trường Linux WSL2' },
    ],
  },
]

export function getSkillGroups(locale: Locale = 'vi'): SkillGroup[] {
  return locale === 'vi' ? skillGroupsVi : skillGroupsEn
}

export const skillGroups = skillGroupsEn
