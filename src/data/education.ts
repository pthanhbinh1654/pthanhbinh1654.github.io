import type { Locale } from '@/i18n/translations'

export interface Education {
  institution: string
  degree: string
  field: string
  gpa: string
  period: string
  graduated: string
  location: string
  honors: string[]
  coursework: string[]
}

const educationEn: Education[] = [
  {
    institution: 'Can Tho University',
    degree: 'Bachelor',
    field: 'Information Security',
    gpa: '3.85 / 4.00',
    period: '2022 – 2026',
    graduated: '2026',
    location: 'College of Information and Communication Technology, Can Tho, Vietnam',
    honors: ['Academic Encouragement Scholarship — 6 consecutive semesters'],
    coursework: [
      'Operating Systems',
      'Computer Networks',
      'Network Security',
      'Computer Forensics',
      'Cryptography',
    ],
  },
]

const educationVi: Education[] = [
  {
    institution: 'Đại học Cần Thơ',
    degree: 'Cử nhân',
    field: 'An toàn thông tin',
    gpa: '3.85 / 4.00',
    period: '2022 – 2026',
    graduated: '2026',
    location: 'Trường Công nghệ Thông tin & Truyền thông, Cần Thơ, Việt Nam',
    honors: ['Học bổng Khuyến khích học tập — 6 học kỳ liên tiếp'],
    coursework: [
      'Hệ điều hành',
      'Mạng máy tính',
      'An toàn mạng',
      'Điều tra số (Computer Forensics)',
      'Mật mã học',
    ],
  },
]

export function getEducation(locale: Locale = 'vi'): Education[] {
  return locale === 'vi' ? educationVi : educationEn
}

export const education = educationEn
