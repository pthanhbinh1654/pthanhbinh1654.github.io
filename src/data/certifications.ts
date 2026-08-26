import type { Locale } from '@/i18n/translations'

export interface Certification {
  name: string
  issuer: string
  year?: string
  url?: string
}

const certificationsEn: Certification[] = [
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
  },
  {
    name: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
  },
  {
    name: 'Network Addressing and Basic Troubleshooting',
    issuer: 'Cisco Networking Academy',
  },
]

const certificationsVi: Certification[] = [
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
  },
  {
    name: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
  },
  {
    name: 'Network Addressing and Basic Troubleshooting',
    issuer: 'Cisco Networking Academy',
  },
]

export function getCertifications(locale: Locale = 'vi'): Certification[] {
  return locale === 'vi' ? certificationsVi : certificationsEn
}

export const certifications = certificationsEn
