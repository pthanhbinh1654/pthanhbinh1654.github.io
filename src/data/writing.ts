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
    title: 'PKI Systems — Architecture & Security Design',
    description:
      'Documents the full system architecture, security design principles, and API overview for the PKI platform. Covers the Vault Transit signing model, immudb audit guarantees, and MFA design.',
    url: 'https://github.com/pthanhbinh1654/pki_systems/blob/master/README.md',
    type: 'readme',
    project: 'pki-systems',
  },
  {
    title: 'WinLogCollector — ELK Setup & Configuration Guide',
    description:
      'Step-by-step guide for deploying the ELK stack on WSL2 Docker, configuring Logstash pipelines, and operating the WinLogCollector agent. Includes configuration reference for all supported event channels.',
    url: 'https://github.com/pthanhbinh1654/winlogcollector/blob/main/docs/ELK_SETUP.md',
    type: 'guide',
    project: 'winlogcollector',
  },
  {
    title: 'Zero-Knowledge Encryption — Cryptographic Architecture',
    description:
      'Explains the cryptographic design: Argon2id key derivation, AES-256-GCM encryption, Kyber1024 key encapsulation, and Dilithium3 signatures. Covers the hybrid classical + post-quantum scheme rationale.',
    url: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption/blob/main/README.md',
    type: 'readme',
    project: 'zeroknowledge-encryption',
  },
  {
    title: 'Kimball DimFact Builder — System Guide & API Contract',
    description:
      'Runbook and API reference for the Dimfact pipeline. Covers dbt profile configuration, pipeline execution order, SCD Type 2 macro usage, and the web dashboard API contract.',
    url: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean/blob/main/docs/SYSTEM_GUIDE.md',
    type: 'runbook',
    project: 'kimball-dimfact',
  },
]

const writingItemsVi: WritingItem[] = [
  {
    title: 'PKI Systems — Kiến trúc & Thiết kế Bảo mật',
    description:
      'Tài liệu kiến trúc hệ thống, nguyên lý thiết kế an toàn thông tin và tổng quan API cho nền tảng PKI. Trình bày chi tiết mô hình ký số Vault Transit, cơ chế bảo đảm kiểm toán bất biến immudb và kiến trúc xác thực đa yếu tố MFA.',
    url: 'https://github.com/pthanhbinh1654/pki_systems/blob/master/README.md',
    type: 'readme',
    project: 'pki-systems',
  },
  {
    title: 'WinLogCollector — Hướng dẫn Triển khai & Cấu hình ELK',
    description:
      'Hướng dẫn từng bước triển khai hạ tầng ELK stack trên Docker WSL2, cấu hình đường ống xử lý Logstash và vận hành agent WinLogCollector. Kèm tài liệu tham chiếu chi tiết các kênh sự kiện Windows Event Log được hỗ trợ.',
    url: 'https://github.com/pthanhbinh1654/winlogcollector/blob/main/docs/ELK_SETUP.md',
    type: 'guide',
    project: 'winlogcollector',
  },
  {
    title: 'Zero-Knowledge Encryption — Kiến trúc Mật mã học',
    description:
      'Giải thích chi tiết kiến trúc mật mã học: dẫn xuất khóa Argon2id, mã hóa AES-256-GCM, đóng gói khóa Kyber1024 và chữ ký Dilithium3. Phân tích lý do và cơ chế hoạt động của mô hình mật mã lai (cổ điển kết hợp kháng lượng tử).',
    url: 'https://github.com/pthanhbinh1654/zeroknowledge_encryption/blob/main/README.md',
    type: 'readme',
    project: 'zeroknowledge-encryption',
  },
  {
    title: 'Kimball DimFact Builder — Sổ tay Vận hành & Hợp đồng API',
    description:
      'Sổ tay vận hành và tài liệu API tham chiếu cho pipeline Dimfact. Hướng dẫn cấu hình profile dbt, thứ tự thực thi pipeline, cách dùng macro SCD Loại 2 và đặc tả giao tiếp API cho dashboard điều khiển.',
    url: 'https://github.com/pthanhbinh1654/kimball_dimfact_builder_clean/blob/main/docs/SYSTEM_GUIDE.md',
    type: 'runbook',
    project: 'kimball-dimfact',
  },
]

export function getWritingItems(locale: Locale = 'vi'): WritingItem[] {
  return locale === 'vi' ? writingItemsVi : writingItemsEn
}

export const writingItems = writingItemsEn
