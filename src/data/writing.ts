import type { Locale } from '@/i18n/translations'

export interface WritingItem {
  title: string
  description: string
  url: string
  type: 'readme' | 'runbook' | 'guide'
  project: string
}

const writingItemsEn: WritingItem[] = [
  {
    title: 'Kimball DimFact Builder — System Guide & Architecture',
    description:
      'Post-Internship Tool: Runbook and system reference for the Dimfact dbt model generator. Covers database introspection, pipeline execution order, SCD Type 2 macro design, and web API contracts.',
    url: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean/blob/main/docs/SYSTEM_GUIDE.md',
    type: 'runbook',
    project: 'kimball-dimfact',
  },
  {
    title: 'PKI Systems — Architecture & Security Design',
    description:
      'Graduation Thesis: Documents the full system architecture, security design principles, and API specification for the internal PKI platform. Covers the Vault Transit signing model, immudb audit guarantees, and WebAuthn MFA design.',
    url: 'https://github.com/pthanhbinh1654/pki_systems/blob/master/README.md',
    type: 'readme',
    project: 'pki-systems',
  },
  {
    title: 'Zero-Knowledge Encryption — Cryptographic Architecture',
    description:
      'Course Project: Explains the cryptographic architecture: Argon2id key derivation, AES-256-GCM encryption, Kyber1024 key encapsulation, and Dilithium3 signatures. Analyzes the hybrid classical + post-quantum scheme rationale.',
    url: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption/blob/main/README.md',
    type: 'readme',
    project: 'zeroknowledge-encryption',
  },
  {
    title: 'WinLogCollector — ELK Setup & Configuration Guide',
    description:
      'Course Project: Step-by-step deployment guide for running the ELK stack on WSL2 Docker, configuring Logstash ingestion pipelines, and operating the PowerShell collection agent. Includes configuration reference for all supported event channels.',
    url: 'https://github.com/pthanhbinh1654/winlogcollector/blob/main/docs/ELK_SETUP.md',
    type: 'guide',
    project: 'winlogcollector',
  },
]

const writingItemsVi: WritingItem[] = [
  {
    title: 'Kimball DimFact Builder — Sổ tay Vận hành & Kiến trúc Hệ thống',
    description:
      'Công cụ sau thực tập: Sổ tay vận hành và tài liệu kỹ thuật cho công cụ sinh model dbt Dimfact. Hướng dẫn phân tích schema bảng nguồn, thứ tự thực thi pipeline, cách dùng macro SCD Loại 2 và đặc tả API giao tiếp dashboard.',
    url: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean/blob/main/docs/SYSTEM_GUIDE.md',
    type: 'runbook',
    project: 'kimball-dimfact',
  },
  {
    title: 'PKI Systems — Kiến trúc & Thiết kế Bảo mật',
    description:
      'Khóa luận tốt nghiệp: Tài liệu kiến trúc hệ thống, nguyên lý thiết kế an toàn thông tin và tổng quan API cho nền tảng PKI. Trình bày chi tiết mô hình ký số Vault Transit, cơ chế bảo đảm kiểm toán bất biến immudb và xác thực đa yếu tố WebAuthn.',
    url: 'https://github.com/pthanhbinh1654/pki_systems/blob/master/README.md',
    type: 'readme',
    project: 'pki-systems',
  },
  {
    title: 'Zero-Knowledge Encryption — Kiến trúc Mật mã học',
    description:
      'Đồ án môn học: Giải thích chi tiết kiến trúc mật mã học: dẫn xuất khóa Argon2id, mã hóa AES-256-GCM, đóng gói khóa Kyber1024 và chữ ký Dilithium3. Phân tích cơ chế hoạt động của mô hình mật mã lai (cổ điển kết hợp kháng lượng tử).',
    url: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption/blob/main/README.md',
    type: 'readme',
    project: 'zeroknowledge-encryption',
  },
  {
    title: 'WinLogCollector — Hướng dẫn Triển khai & Cấu hình ELK',
    description:
      'Đồ án môn học: Hướng dẫn từng bước triển khai hạ tầng ELK stack trên Docker WSL2, cấu hình đường ống Logstash và vận hành agent PowerShell WinLogCollector. Kèm tài liệu tham chiếu chi tiết các kênh sự kiện Windows Event Log.',
    url: 'https://github.com/pthanhbinh1654/winlogcollector/blob/main/docs/ELK_SETUP.md',
    type: 'guide',
    project: 'winlogcollector',
  },
]

export function getWritingItems(locale: Locale = 'vi'): WritingItem[] {
  return locale === 'vi' ? writingItemsVi : writingItemsEn
}

export const writingItems = writingItemsEn
