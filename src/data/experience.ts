import type { Locale } from '@/i18n/translations'

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  type: 'internship' | 'full-time' | 'part-time'
  responsibilities: string[]
  technologies: string[]
}

const experiencesEn: Experience[] = [
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

const experiencesVi: Experience[] = [
  {
    company: 'Công ty TNHH Giải pháp Phần mềm Mekosoft',
    role: 'Thực tập sinh Phân tích dữ liệu (Trọng tâm Kỹ thuật dữ liệu)',
    period: '01/2026 – 04/2026',
    location: 'Cần Thơ, Việt Nam',
    type: 'internship',
    responsibilities: [
      'Giám sát các đường ống ETL trên Airbyte truyền dữ liệu từ MySQL sang PostgreSQL trong môi trường Kubernetes',
      'Xây dựng các mô hình dbt staging, mô hình chiều SCD Loại 2 (lưu vết lịch sử) và mô hình fact cho khoảng 3 triệu bản ghi trên 11 bảng nguồn',
      'Kiểm thử kết quả thực thi ETL và đối soát tính nhất quán của dữ liệu từ nguồn sang đích',
      'Phát triển tiện ích Python/Jinja2 nhằm tự động hóa việc sinh cấu hình dbt, sau này trở thành nền tảng cho dự án Kimball DimFact Builder',
    ],
    technologies: ['dbt', 'PostgreSQL', 'MySQL', 'Python', 'Jinja2', 'Airbyte', 'Kubernetes'],
  },
]

export function getExperiences(locale: Locale = 'vi'): Experience[] {
  return locale === 'vi' ? experiencesVi : experiencesEn
}

export const experiences = experiencesEn
